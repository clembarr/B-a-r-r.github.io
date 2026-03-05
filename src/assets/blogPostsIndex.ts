import { blogPosts } from "./blog"
import { APP_URL } from "./constants";

/** URL of the blog page */
const BLOG_URL = APP_URL + "/blog";

/**
 * Returns an array of blog posts that are related to the given project 
 * @param projectTitle - title of the project
 * @returns an array of blog posts
 */
export const getRelatedPosts = (projectTitle: string) => {
    return blogPosts.filter((post) => post.relatedProjects && post.relatedProjects.includes(projectTitle));
}

/**
 * Returns the blog post with the given slug
 * @param postSlug - slug of the blog post
 * @returns the blog post
 */
export const getPost = (postSlug: string) => {
    return blogPosts.find((post) => post.slug === postSlug);
}

/**
 * Returns the URL of the blog post with the given slug
 * @param postSlug - slug of the blog post
 * @returns the URL of the blog post
 */
export const getPostUrl = (postSlug: string) => {
    return BLOG_URL + "/" + postSlug;
}