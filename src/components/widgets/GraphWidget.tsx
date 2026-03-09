import { useRef, useMemo, useContext, ReactElement, useState, useEffect, useCallback } from 'react';
import { ThemeContext } from '../theme/ThemeEngine';
import styles from '../../style';
import DOMPurify from 'dompurify';
import AboutWidget from './AboutWidget';

/**
 * @interface PlacedTag
 * @description Stores the computed position and measured dimensions of a placed tag.
 */
interface PlacedTag {
  tag: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

/**
 * @constant GAP_PX minimum gap between any two tags (px)
 * @constant EDGE_PX minimum distance from container edges (px)
 * @constant FLOAT_AMP_PX maximum translation from the CSS float animation (px)
 */
const GAP_PX = 10;
const EDGE_PX = 6;
const FLOAT_AMP_PX = 4;

/**
 * @function computeLayout Place tags without overlap using measured widths/heights.
 * Uses greedy random placement with AABB collision detection. The available area
 * is shrunk by FLOAT_AMP_PX on each side so the floating animation never pushes
 * a tag outside the container.
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
  const placed: PlacedTag[] = [];
  const inset = EDGE_PX + FLOAT_AMP_PX;

  for (const { tag, w, h } of measured) {
    const minX = inset;
    const minY = inset;
    const maxX = cw - w - inset;
    const maxY = ch - h - inset;

    if (maxX <= minX || maxY <= minY) {
      placed.push({ tag, x: minX, y: minY, w, h });
      continue;
    }

    let bestX = minX;
    let bestY = minY;
    let found = false;

    for (let trial = 0; trial < 1200; trial++) {
      const cx = minX + Math.random() * (maxX - minX);
      const cy = minY + Math.random() * (maxY - minY);

      const collides = placed.some((p) =>
        cx < p.x + p.w + GAP_PX &&
        cx + w + GAP_PX > p.x &&
        cy < p.y + p.h + GAP_PX &&
        cy + h + GAP_PX > p.y,
      );

      if (!collides) {
        bestX = cx;
        bestY = cy;
        found = true;
        break;
      }
    }

    if (!found) {
      // Fallback: stack vertically with gap
      const lastY = placed.length > 0
        ? placed[placed.length - 1].y + placed[placed.length - 1].h + GAP_PX
        : minY;
      bestX = minX;
      bestY = lastY <= maxY ? lastY : minY;
    }

    placed.push({ tag, x: bestX, y: bestY, w, h });
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
