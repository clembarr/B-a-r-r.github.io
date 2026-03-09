import { useContext, useMemo } from "react";
import { skills } from "../../assets/contents";
import styles from "../../style";
import { ThemeContext } from "../theme/ThemeEngine";
import SkillGalaxy from "../showcase/SkillGalaxy";
import { LangContext } from "../language";
import { translate } from "../../utils/assetsUtils";

const CLUSTER_CENTERS: Record<string, { x: number; y: number }> = {
  LANGUAGE: { x: 0.25, y: 0.25 },
  TOOL: { x: 0.75, y: 0.25 },
  LIBRARY: { x: 0.5, y: 0.75 },
};

const Skills = () => {
  const { currentTheme } = useContext(ThemeContext);
  const { currentLang } = useContext(LangContext);

  const { nodes, links } = useMemo(() => {
    const galaxyNodes: any[] = [];
    const galaxyLinks: any[] = [];

    // Group skills by category to organize them in the galaxy
    skills.forEach((skill) => {
      // Determine base position according to category
      const center = CLUSTER_CENTERS[skill.category.context] || { x: 0.5, y: 0.5 };
      
      // Add some random dispersion around the center
      const offsetX = (Math.random() - 0.5) * 0.4;
      const offsetY = (Math.random() - 0.5) * 0.4;

      galaxyNodes.push({
        id: skill.label,
        label: skill.label,
        x: Math.max(0.1, Math.min(0.9, center.x + offsetX)), // Keep within bounds
        y: Math.max(0.1, Math.min(0.9, center.y + offsetY)),
        size: (skill.weight ?? 5) * 1.5, // Scale weight for better visual size
        cluster: translate(skill.category.content, currentLang)?.toUpperCase() || skill.category.context,
        color: currentTheme === 'dark' ? '#71cbb3' : '#3D3E3C', // Fallback color, mostly overridden by icons
        icon: skill.icon.content[currentTheme]
      });

      // Create links for frameworks
      if (skill.framework) {
        // Ensure the framework exists in our skills list to avoid broken links
        const targetExists = skills.some(s => s.label === skill.framework);
        if (targetExists) {
          galaxyLinks.push({
            source: skill.label,
            target: skill.framework,
            type: 'framework'
          });
        }
      }
    });

    // Create additional links for related subcategories within the same category
    // This makes the constellation look more connected
    skills.forEach((skill, i) => {
      if (!skill.subcategory) return;
      
      // Find another skill with the same subcategory to connect to
      const relatedSkill = skills.find((s, j) => 
        j > i && // Avoid duplicate links and self-links
        s.subcategory?.context === skill.subcategory?.context &&
        !s.framework && !skill.framework // Don'translate over-connect framework items
      );

      if (relatedSkill) {
        galaxyLinks.push({
          source: skill.label,
          target: relatedSkill.label,
          type: 'career'
        });
      }
    });

    return { nodes: galaxyNodes, links: galaxyLinks };
  }, [currentTheme, currentLang]);

  return (
    <section id="skills"
      className=
      {`
        ${styles.sizeFull}
        ${styles.flexCol}
        ${styles.contentCenter}
      `}
    >
      <div id="galaxy-container"
        className=
        {`
          w-full
          min-h-[500px]
          md:min-h-[600px]
          relative
          ${styles.contentCenter}
          bg-(--color-tertiary)/5
          rounded-2xl
          border border-(--color-tertiary)/10
          overflow-hidden
        `}
      >
        <SkillGalaxy 
          nodes={nodes} 
          links={links} 
          className="w-full h-full"
        />
      </div>
    </section>
  );
};

export default Skills;
