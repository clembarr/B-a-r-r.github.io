/**
 * @fileoverview Translation core constants and types
 * Independent from assets to prevent circular dependencies.
 */

/**
 * Language code for universal/language-agnostic content.
 * Used when content is the same across all languages (e.g., "React", "CV", "Blog")
 */
export const UNIVERSAL_LANG = "0";

/**
 * Supported language codes for the application
 */
export const SUPPORTED_LANGUAGES = ["fr", "en"] as const;

/**
 * Type for supported language codes
 */
export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];

/**
 * Type for multilingual content objects
 * Maps language codes to their content strings
 */
export type MultilingualContent = { [key: string]: string };
export type MultilingualContentArray = { [key: string]: string[] };

/**
 * Safely retrieve content in the specified language with fallback logic.
 */
export const getContent = (
  content: MultilingualContent | undefined,
  lang: string,
  fallback?: string
): string => {
  if (!content) return fallback || "";

  return (
    content[lang] ||
    content[UNIVERSAL_LANG] ||
    fallback ||
    Object.values(content)[0] ||
    ""
  );
};

/**
 * Simple translation function - alias for getContent.
 */
export const translate = getContent;

/**
 * Create a translation function bound to a specific language.
 */
export const tCustom = (lang: string) => {
  return (content: MultilingualContent | undefined, fallback?: string) =>
    getContent(content, lang, fallback);
};
