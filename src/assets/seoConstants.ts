import { author, APP_URL } from "./config";
import { SEOConstants } from "./dataTypes";

export const BlogSEOConstants: SEOConstants = {
  title: `Blog - ${author.firstName} ${author.lastName}`,
  description: "Thoughts on software development, research, algorithms, and technology.",
  keywords: ['Blog', 'Software Development', 'AI', 'Algorithms', 'Research', 'Porfolio'],
  ogUrl: `${APP_URL}/blog`,
  canonical: `${APP_URL}/blog`,
}

export const ProjectSEOConstants: SEOConstants = {
  title: `Projets - ${author.firstName} ${author.lastName}`,
  description: "Découvrez les projets de Clément Barrière : développement web, intelligence artificielle, algorithmes et plus.",
  keywords: ['projets', 'projects', 'développement', 'software', 'AI', 'algorithms'],
  ogUrl: `${APP_URL}/projects`,
  canonical: `${APP_URL}/projects`,
}

export const HomeSEOConstants: SEOConstants = {
  title: `${author.firstName} ${author.lastName} - Portfolio`,
  description: "Portfolio de Clément Barrière - Développeur logiciel & chercheur. Projets, compétences et parcours.",
  keywords: ['portfolio', 'développeur', 'software developer', 'researcher', 'Clément Barrière'],
  ogUrl: `${APP_URL}`,
  canonical: `${APP_URL}`,
}

export const CareerSEOConstants: SEOConstants = {
  title: `Career - Clément Barrière`,
  description: "Parcours professionnel de Clément Barrière : expérience, formations et certifications.",
  keywords: ['career', 'resume', 'timeline', 'education', 'experience'],
  ogUrl: `${APP_URL}/career`,
  canonical: `${APP_URL}/career`,
}
