/**
 * @fileoverview Assets and Content utilities
 * Consolidates utilities for skills, projects, and blog.
 * This file imports assets, so it should NOT be imported by the configuration assets 
 * (like projects/*.ts or documents/index.ts) to prevent circular dependencies.
 */

import { skills } from '../assets/skills';
import { errorMessages, APP_URL } from "../assets/constants";
import { blogPosts } from "../assets/blog";
import { 
  Skill, 
  AvailableSkillCategories, 
  ProjectMedia,
  MediaType
} from '../assets/dataTypes';

export * from './translationUtils';

// --- Skills Utilities ---

/**
 * Lazy-loaded map for O(1) skill lookups.
 * We use a function instead of a top-level constant to avoid circular 
 * dependency issues when configuration assets import this file.
 */
let _skillsMap: Map<string, Skill> | null = null;

const getSkillsMap = (): Map<string, Skill> => {
  if (!_skillsMap) {
    // Defensive check: if skills is still undefined (module cycle), 
    // we return an empty map for now or throw a more helpful error
    if (!skills) return new Map();

    _skillsMap = new Map<string, Skill>(
      skills.map(skill => [skill.label, skill])
    );
  }
  return _skillsMap;
};

/**
 * Retrieve a skill by its label with O(1) complexity.
 */
export const getSkill = (label: string): Skill => {
  const map = getSkillsMap();
  const skill = map.get(label);

  if (!skill) {
    // Search in the list if map lookup fails (fallback)
    // We check skills existence again for safety in circular loops
    const safeSkills = skills || [];
    const foundSkill = safeSkills.find(s => s.label === label);
    if (!foundSkill) {
      const error = `Skill "${label}" not found.`;
      if (import.meta.env.DEV) {
        throw new Error(error);
      } else {
        console.error(error);
        return safeSkills[0];
      }
    }
    return foundSkill;
  }

  return skill;
};

/**
 * Check if a skill exists in the skills index.
 */
export const hasSkill = (label: string): boolean => {
  const safeSkills = skills || [];
  try {
    return getSkillsMap().has(label) || safeSkills.some(s => s.label === label);
  } catch {
    return safeSkills.some(s => s.label === label);
  }
};

/**
 * Get all skills filtered by category.
 */
export const getSkillsByCategory = (category: AvailableSkillCategories): Skill[] => {
  const safeSkills = skills || [];
  return safeSkills.filter(skill => skill.category.context === category);
};

// --- Projects Utilities ---

/**
 * Wrap a resource URL into a ProjectMedia object.
 */
export const wrapInMedia = (ressourceUrl: string, type: MediaType, alt: string): ProjectMedia => {
    if (type === MediaType.IMAGE) {
        return {
            url: ressourceUrl,
            type: MediaType.IMAGE,
            alt: alt
        }
    } else if (type === MediaType.VIDEO) {
        return {
            url: ressourceUrl,
            type: MediaType.VIDEO,
            alt: alt
        }
    } else {
        const errorMsg = errorMessages.find((m) => m.context === "mediaError")?.content.en || "Media type not supported";
        throw new Error(errorMsg);
    }
}

// --- Blog Utilities ---

/** URL of the blog page */
const BLOG_URL = APP_URL + "/blog";

/**
 * Returns an array of blog posts that are related to the given project 
 */
export const getRelatedPosts = (projectTitle: string) => {
    return blogPosts.filter((post) => post.relatedProjects && post.relatedProjects.includes(projectTitle));
}

/**
 * Returns the blog post with the given slug
 */
export const getPost = (postSlug: string) => {
    return blogPosts.find((post) => post.slug === postSlug);
}

/**
 * Returns the URL of the blog post with the given slug
 */
export const getPostUrl = (postSlug: string) => {
    return BLOG_URL + "/" + postSlug;
}

export { skills };
