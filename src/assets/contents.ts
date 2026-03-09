import {
  Message,
  Biography,
  AvailableSkillCategories,
  AvailableSkillSubcategories,
  Hyperlink,
  CareerEntry,
  CareerEntryType,
  FooterColumn,
  AboutWidget,
} from "./dataTypes";
import { navLinks, creditsMentions } from "./constants";

// Re-export skills from its new dedicated file
export { skills } from './skills';

// Projects are now defined in separate files and re-exported
export { projects } from './projects';

/** The messages displayed under the main title in the Hero section
 * (with the writting machine effect). */
export const subtitleMessages: Array<Message> = [
    {
      content:
      {
        fr: "Développeur et créateur.",
        en: "Developer and creator.",
      }
    },
    {
      content:
      {
        fr: "De nouveaux projets arrivent !",
        en: "New projects are coming!",
      }
    },
    {
      content: 
      {
        fr: "Bienvenue sur mon portfolio.",
        en: "Welcome to my portfolio.",
      }
    },
];

/** Store the bigraphy templates, the first one having the property 'active' to 
 * true will be displayed. */
export const bioText: Array<Biography> = [
    {
      title: 
      {
        fr: "Développer un futur libre et équitable.",
        en: "Develop the future, free and fair.",
      },
      content:
      {
        fr: 
        "Principalement intéressé par le développement d'outils intelligents, je cherche avant tout à lier <strong>utilité</strong> et <strong>accessibilité</strong> dans mes projets. \
        Mon objectif est de permettre au plus grand nombre de profiter des technologies utilitaires avancées. \
        <br/><br/> \
        La programmation est un art, nous permettant de matérialiser nos idées. J'en suis passionné depuis plusieurs années, \
        et mes nombreuses inspirations ont forgées <strong>ma polyvalence</strong>, qui fait aujourd'hui ma force. \
        <br/><br/>   \
        Je prépare actuellement un Bachelor Universitaire de Technologie (<strong>BUT</strong>) \
        en informatique, à l'Institut Universitaire de Technologie (IUT) de Bordeaux, France.",
        en: 
        "Mainly interested in the development of <strong>intelligent</strong> tools, I seek to link <strong>utility</strong> and <strong>accessibility</strong> in my projects. \
        My goal is to allow as many people as possible to benefit from advanced utility technologies.\
        <br/><br/> \
        Programming is an art that brings abstractions of the mind to life. I have been passionate about it for several years, \
        and my inspirations have forged <strong>my versatility</strong>, one of my key assets today. \
        <br/><br/>   \
        I am currently preparing a University Bachelor of Technology (<strong>BUT</strong>) \
        en informatique, à l'Institut Universitaire de Technologie (IUT) de Bordeaux, France.",
      },
      active: true,
    }
];

/** Shared links, mainly displayed in the footer. */
export const sharedLinks: Array<Hyperlink> = [
  {
    content:
    {
      fr: "Elias, developpeur cybersécurité",
      en: "Elias, cybersecurity developer",
    },
    link: "https://eliasgauthier.fr",
  },
  {
    content: 
    {
      fr: "Théo, développeur d'IA génératives",
      en: "Théo, generative AI developer",
    },
    link: "https://tcastillo.me",
  },
  {
    content:
    {
      fr: "Zao, développeur de jeux vidéo",
      en: "Zao, video games developer",
    },
    link: "https://zaofromage.github.io/portfolio",
  },
  {
    content:
    {
      fr: "Antoine, développeur d'API",
      en: "Antoine, API developer",
    },
    link: "https://labian0.github.io",
  },
  {
    content:
    {
      fr: "Alexandre, développeur d'algorithmes",
      en: "Alexandre, algorithms developer",
    },
    link: "https://carcroks.github.io",
  },
  {
    content:
    {
      fr: "Mathieu, data engineer",
      en: "Mathieu, engénieur data",
    },
    link: "https://matjay.me",
  },
  {
    content:
    {
      fr: "Rodolphe, développeur de bots",
      en: "Rodolphe, bots developer",
    },
    link: "https://rodolphent.github.io/",
  }
];

/** Footer columns definition, mapping each column to its title, context and content. */
export const footerColumns: FooterColumn[] = [
  {
    title: { fr: "Navigation", en: "Navigation" },
    context: "navigation",
    content: navLinks,
  },
  {
    title: { fr: "Crédits", en: "Credits" },
    context: "credits",
    content: creditsMentions,
  },
  {
    title: { fr: "Voir aussi", en: "See also" },
    context: "see-also",
    content: sharedLinks,
  },
];

/** About section widgets titles and content. */
export const aboutWidgets: Array<AboutWidget> = [
  {
    id: "currently",
    title: 
    {
      fr: "Actuellement",
      en: "Currently working on",
    },
    content:
    {
      fr: "En dernière année <strong>BUT Informatique</strong> à <strong>l'IUT de Bordeaux.</strong>",
      en: "In my last year of <strong>Bachelor degree in Computer Science</strong> at the <strong>IUT of Bordeaux.</strong>",
    },
  },
  {
    id: "future",
    title: 
    {
      fr: "Pour l'avernir",
      en: "For the future",
    },
    content:
    {
      fr: "Entrer en école d'ingénieur et, à terme, travailler à la frontière entre l'ingénierie et la recherche.",
      en: "Enter engineering school and, eventually, work at the frontier between engineering and research.",
    },
  },
  {
    id: "hobbies",
    title: {
      fr: "Hobbies",
      en: "Hobbies",
    },
    content: {
      fr: ["Natation", "Philo", "Dev", "Musique"],
      en: ["Swimming", "Philo", "Dev", "Music"],
    }
  },
  {
    id: "interests",
    title: {
      fr: "Intérêts",
      en: "Interests",
    },
    content: {
      fr: ["ALife", "IA", "Biologie", "Logiciel"],
      en: ["ALife", "AI", "Biology", "Software"],
    }
  },
  {
    id: "lang",
    title: {
      fr: "Langues",
      en: "Languages",
    },
    content: [
      {
        label: { fr: "🇫🇷 Français", en: "🇫🇷 French" },
        level: { fr: "Natif", en: "Native" },
      },
      {
        label: { fr: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 Anglais", en: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 English" },
        level: { fr: "Courant (C1)", en: "Fluent (C1)" },
      },
      {
        label: { fr: "🇪🇸 Espagnol", en: "🇪🇸 Spanish" },
        level: { fr: "Notions (A2)", en: "Basic (A2)" },
      }
    ]
  }
];

/** About me text block for the About dashboard. */
export const aboutSection: { title: {[lang: string]: string}; content: {[lang: string]: string} } = {
  title: { fr: "À propos de moi", en: "About me" },
  content: {
    fr:
      "Passionné par le développement d'outils intelligents, je lie <strong>utilité</strong> et <strong>accessibilité</strong> dans mes projets. \
      La programmation est un art, et <strong>ma polyvalence</strong> fait aujourd'hui ma force.",
    en:
      "Passionate about building intelligent tools, I combine <strong>utility</strong> and <strong>accessibility</strong> in my projects. \
      Programming is an art, and <strong>my versatility</strong> is one of my key assets today.",
  },
};

/** Page title and subtitle for the Career page. */
export const careerPageContent: { title: {[lang: string]: string}; subtitle: {[lang: string]: string} } = {
  title: {
    fr: "Mon Parcours",
    en: "My Career Path",
  },
  subtitle: {
    fr: "Formation, expériences et projets marquants",
    en: "Education, experiences and notable projects",
  },
};

/** Career timeline entries, sorted from most recent to oldest. */
export const careerTimeline: Array<CareerEntry> = [
  {
    type: CareerEntryType.EXPERIENCE,
    title: {
      fr: "Stage développeur full-stack",
      en: "Full-stack developer internship",
    },
    organization: {
      fr: "Entreprise Tech",
      en: "Tech Company",
    },
    period: {
      fr: "Avr. 2025 — Juil. 2025",
      en: "Apr. 2025 — Jul. 2025",
    },
    description: {
      fr: "Développement d'une application web interne avec React, TypeScript et Node.js. Mise en place de tests unitaires et d'intégration continue.",
      en: "Development of an internal web application with React, TypeScript and Node.js. Implementation of unit tests and continuous integration.",
    },
    tags: ["React", "TypeScript", "Node.js", "Docker"],
  },
  {
    type: CareerEntryType.CERTIFICATION,
    title: {
      fr: "Certification Cloud Fundamentals",
      en: "Cloud Fundamentals Certification",
    },
    organization: {
      fr: "Fournisseur Cloud",
      en: "Cloud Provider",
    },
    period: {
      fr: "Fév. 2025",
      en: "Feb. 2025",
    },
    description: {
      fr: "Certification couvrant les fondamentaux du cloud computing : virtualisation, conteneurisation, services managés et bonnes pratiques de sécurité.",
      en: "Certification covering cloud computing fundamentals: virtualization, containerization, managed services and security best practices.",
    },
    tags: ["Cloud", "DevOps", "Docker"],
  },
  {
    type: CareerEntryType.EDUCATION,
    title: {
      fr: "BUT Informatique",
      en: "Bachelor of Technology in Computer Science",
    },
    organization: {
      fr: "IUT de Bordeaux",
      en: "IUT of Bordeaux",
    },
    period: {
      fr: "Sept. 2022 — Juin 2025",
      en: "Sep. 2022 — Jun. 2025",
    },
    description: {
      fr: "Formation couvrant le développement logiciel, le web, les bases de données, l'algorithmique, la gestion de projet et le travail en équipe.",
      en: "Program covering software development, web, databases, algorithms, project management and teamwork.",
    },
    tags: ["Java", "Python", "SQL", "Web", "Agile"],
  },
  {
    type: CareerEntryType.VOLUNTEERING,
    title: {
      fr: "Bénévole — Initiation au code",
      en: "Volunteer — Coding introduction",
    },
    organization: {
      fr: "Association locale",
      en: "Local association",
    },
    period: {
      fr: "Jan. 2023 — Juin 2023",
      en: "Jan. 2023 — Jun. 2023",
    },
    description: {
      fr: "Animation d'ateliers d'initiation à la programmation pour des lycéens. Création de supports pédagogiques adaptés et accompagnement individuel.",
      en: "Running introductory programming workshops for high school students. Creating adapted educational materials and individual mentoring.",
    },
    tags: ["Python", "Scratch"],
  },
  {
    type: CareerEntryType.EDUCATION,
    title: {
      fr: "Baccalauréat général",
      en: "High School Diploma",
    },
    organization: {
      fr: "Lycée",
      en: "High School",
    },
    period: {
      fr: "Sept. 2019 — Juin 2022",
      en: "Sep. 2019 — Jun. 2022",
    },
    description: {
      fr: "Baccalauréat général avec spécialités Mathématiques et Numérique & Sciences Informatiques (NSI).",
      en: "General diploma with Mathematics and Computer Science specialties.",
    },
    tags: ["Python", "C"],
  },
];
