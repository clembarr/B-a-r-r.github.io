import { useRef, useMemo, useContext, ReactElement, useState, useEffect, useCallback } from 'react';
import { ThemeContext } from '../theme/ThemeEngine';
import styles from '../../style';
import DOMPurify from 'dompurify';
import AboutWidget from './AboutWidget';
import { PlacedTag } from '../../assets/dataTypes';
import { GraphWidgetConstants } from '../../assets/motionConstants';

/**
 * @function computeLayout Place tags without overlap using iterative relaxation
 * (AABB separation). All tags are placed randomly first, then overlapping pairs
 * are pushed apart along their axis of least overlap until no collisions remain
 * or the iteration budget is exhausted. The available area is shrunk by
 * FLOAT_AMP_PX on each side so the floating animation never pushes a tag outside
 * the container.
 * @param measured - array of { tag, w, h } with real DOM measurements
 * @param cw - container width in px
 * @param ch - container height in px
 * @returns array of PlacedTag with final pixel positions
 */
const computeLayout = (
  measured: { tag: string; w: number; h: number }[],
  cw: number,
  ch: number,
): PlacedTag[] => {
  const inset = GraphWidgetConstants.EDGE_PX + GraphWidgetConstants.FLOAT_AMP_PX;
  const gap = GraphWidgetConstants.GAP_PX;

  /** Initial random placement within safe bounds. */
  const placed: PlacedTag[] = measured.map(({ tag, w, h }) => {
    const maxX = Math.max(inset, cw - w - inset);
    const maxY = Math.max(inset, ch - h - inset);
    return {
      tag,
      x: inset + Math.random() * (maxX - inset),
      y: inset + Math.random() * (maxY - inset),
      w,
      h,
    };
  });

  /**
   * Iterative separation in two distinct phases per pass:
   * 1. Push all overlapping pairs apart (half the overlap each, no clamping yet).
   * 2. Clamp every item to the safe zone.
   * Separating phases prevents a clamp on item i from immediately creating a new
   * collision that the current pass cannot see. Early-exits only when no pair
   * overlapped at all — not after a clamp-induced oscillation.
   */
  for (let iter = 0; iter < 400; iter++) {
    let moved = false;

    /** Phase 1 — separation only, no clamping. */
    for (let i = 0; i < placed.length; i++) {
      for (let j = i + 1; j < placed.length; j++) {
        const a = placed[i];
        const b = placed[j];
        const overlapX = Math.min(a.x + a.w + gap - b.x, b.x + b.w + gap - a.x);
        const overlapY = Math.min(a.y + a.h + gap - b.y, b.y + b.h + gap - a.y);
        if (overlapX > 0 && overlapY > 0) {
          /** Half-overlap push avoids overshooting and oscillation. */
          const push = (overlapX < overlapY ? overlapX : overlapY) / 2;
          if (overlapX < overlapY) {
            const dir = a.x + a.w / 2 <= b.x + b.w / 2 ? -1 : 1;
            a.x += dir * push;
            b.x -= dir * push;
          } else {
            const dir = a.y + a.h / 2 <= b.y + b.h / 2 ? -1 : 1;
            a.y += dir * push;
            b.y -= dir * push;
          }
          moved = true;
        }
      }
    }

    /** Phase 2 — clamp every item after all pairs have been resolved. */
    for (const p of placed) {
      p.x = Math.max(inset, Math.min(cw - p.w - inset, p.x));
      p.y = Math.max(inset, Math.min(ch - p.h - inset, p.y));
    }

    if (!moved) break;
  }

  return placed;
};

/** Shared tag classes used by both the hidden measurer and the visible tags. */
const tagClasses = (isDark: boolean) => `
  font-primary-semibold
  ${styles.tag}
  whitespace-nowrap
  px-3 py-1
  text-2xs
  select-none
  ${isDark
    ? 'bg-(--color-tertiary)/10 text-(--color-tertiary) border border-(--color-tertiary)/30 hover:bg-(--color-tertiary)/20'
    : 'bg-(--color-tertiary)/10 text-(--color-tertiary) border border-(--color-tertiary)/20 hover:bg-(--color-tertiary)/15'
  }
`;

/**
 * @component FloatingTag
 * @description A single tag pill with a smooth CSS-based floating animation.
 * Each tag gets unique animation duration and delay for organic variety.
 */
const FloatingTag = ({
  tag,
  x,
  y,
  index,
  isDark,
}: {
  tag: string;
  x: number;
  y: number;
  index: number;
  isDark: boolean;
}) => {
  const animStyle = useMemo(() => {
    const duration = 4 + (index * 1.3) % 3;
    const delay = -(index * 0.7) % duration;
    return {
      animationDuration: `${duration}s`,
      animationDelay: `${delay}s`,
    };
  }, [index]);

  return (
    <span
      className={`
        absolute
        graph-widget-float
        pointer-events-auto
        transition-colors
        duration-300
        ${tagClasses(isDark)}
      `}
      style={{ left: x, top: y, ...animStyle }}
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(tag) }}
    />
  );
};

interface GraphWidgetProps {
  id: number | string;
  title: string | ReactElement;
  tags: string[];
  titleAdditionnalStyle?: string;
}

/**
 * @component GraphWidget
 * @description Displays tags scattered across a bounded area with a subtle,
 * smooth floating animation. Uses a two-phase approach: first render tags
 * invisibly to measure their real pixel dimensions, then compute a
 * collision-free layout and render the visible floating tags.
 */
const GraphWidget = ({ id, title, tags, titleAdditionnalStyle }: GraphWidgetProps) => {
  const { currentTheme } = useContext(ThemeContext);
  const isDark = currentTheme === 'dark';

  const containerRef = useRef<HTMLDivElement>(null);
  const measurerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [placed, setPlaced] = useState<PlacedTag[]>([]);

  /** Measure the container on mount and resize. */
  const measureContainer = useCallback(() => {
    if (containerRef.current) {
      setSize({
        w: containerRef.current.offsetWidth,
        h: containerRef.current.offsetHeight,
      });
    }
  }, []);

  useEffect(() => {
    measureContainer();
    const ro = new ResizeObserver(measureContainer);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [measureContainer]);

  /**
   * Phase 2: once the hidden measurer and container are sized, read actual
   * tag dimensions and compute the layout.
   */
  useEffect(() => {
    if (size.w === 0 || size.h === 0 || !measurerRef.current) return;

    const spans = measurerRef.current.querySelectorAll<HTMLSpanElement>('[data-tag]');
    const measured: { tag: string; w: number; h: number }[] = [];

    spans.forEach((span) => {
      measured.push({
        tag: span.dataset.tag!,
        w: span.offsetWidth,
        h: span.offsetHeight,
      });
    });

    if (measured.length > 0) {
      setPlaced(computeLayout(measured, size.w, size.h));
    }
  }, [tags, size.w, size.h]);

  const content = (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden"
    >
      <div id='measures-landmark-tag'
        ref={measurerRef}
        aria-hidden="true"
        className="absolute opacity-0 pointer-events-none"
        style={{ top: -9999, left: -9999 }}
      >
        {tags.map((tag, i) => (
          <span
            key={i}
            data-tag={tag}
            className={tagClasses(isDark)}
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(tag) }}
          />
        ))}
      </div>

      {/* Visible floating tags, only rendered after layout is computed */}
      {placed.map((p, i) => (
        <FloatingTag
          key={`${p.tag}-${i}`}
          tag={p.tag}
          x={p.x}
          y={p.y}
          index={i}
          isDark={isDark}
        />
      ))}
    </div>
  );

  return (
    <AboutWidget
      id={id}
      title={title}
      content={content}
      titleAdditionnalStyle={titleAdditionnalStyle}
      contentStyle="w-full h-32 md:h-36"
    />
  );
};

export default GraphWidget;
