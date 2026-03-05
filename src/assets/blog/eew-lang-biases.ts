/**
 * @fileoverview EEW language biases case study blog post definition
 * Case study exploring the language biases in the Evolutionary Ecology of Words model
 */

import { BlogPost, BlogCategory } from '../dataTypes';
import { UNIVERSAL_LANG } from '../i18n';
import { projectsImages } from '../projects_images';

export const eewLangBiases: BlogPost = {
    slug: "eew-language-biases",
    title: {
        [UNIVERSAL_LANG]: "Using Language Biases as Novelty Engines",
        fr: "Utilisation des biais linguistiques comme moteurs de nouveautes",
    },
    description: {
        [UNIVERSAL_LANG]: 
        `As LLMs are imbued with representations from the languages they use, my case study focuses on the impact of
        language biases on the dynamics of semantic derivation and the emergence of novel words.`,
        fr: 
        `Les LLMs sont infusés des représentations de la langue qu'ils utilisent, mon étude de cas se concentre sur l'impact 
        des biais linguistiques sur les dynamiques de derivation semantique et l'émergence de nouveaux mots.`,
    },
    tags: {
        [UNIVERSAL_LANG]: ["Data", "LLM", "ALife", "AI", "Semantic", "Game theory", "Artificial life", "Artificial intelligence", "Research", "Simulation", "Modeling", "Math", "Internship"],
        fr: ["Data", "LLM", "ALife", "AI", "Semantique", "Théorie des jeux", "Vie artificielle", "Intelligence artificielle", "Données", "Recherche", "Simulation", "Modélisation", "Math", "Stage"],
    },
    img: [projectsImages.eew_algo, projectsImages.eew_basic_visuals, projectsImages.eew_lang_bias],
    coverImage: projectsImages.eew_basic_visuals,
    date: new Date(2025, 6, 12),
    category: BlogCategory.RESEARCH,
    readingTime: 7,
    paragraphs: [
        {
            title: {
                [UNIVERSAL_LANG]: "Introduction",
            },
            content: {
                [UNIVERSAL_LANG]:
                "Evolutionary Ecology of Words (EEW) is an artificial life experiment model, which involves ecosystems of words and their semantic\
                derivation using the rich linguistic expression and inference ability of LLMs. In March 2025, Pr. Reiji SUZUKI and his colleague \
                Pr. Takaya ARITA from the ALIFE-CORE laboratory (Nagoya University, Japan), published a paper upon the early stages of this new \
                experiment model, which is rooted in game theory. It aims to be a creativity benchmark for LLMs, as part of the research regarding \
                the open-endedness of artificial models.<br> \
                From April to Jun 2025, I had the chance to participate in the assessment of this model as \
                a research intern. My work manly focused on the discovery of language biases, and their impact on the dynamics observed in the experiment.",
                fr:
                "Evolutionary Ecology of Words (EEW) est un modèle d'expérience de vie artificielle, qui implique des écosystèmes de mots et leur derivation\
                semantique, utilisant les capabilités linguistiques et d'inference des LLMs. En mars 2025, Pr. Reiji SUZUKI et son collégue Pr. Takaya ARITA\
                du laboratoire ALIFE-CORE (Université de Nagoya, Japon), publient un papier sur les premiers résultats de ce nouveau modèle, qui prend racine \
                dans la théorie des jeux. Visant à servir de benchmark de créativité pour les LLMs, il s'intègre dans la recherche sur le non-déterminisme \
                des modèles artificiels.<br>\
                De avril à juin 2025, j'ai eu la chance de participer à l'évaluation de ce modèle comme stagiaire. Mon travail a principalement porté \
                sur la décoouverte de biais linguistiques et sur l'étude de leur impact sur les dynamiques observées dans l'expérience.",
            },
        },
        {
            title: {
                [UNIVERSAL_LANG]: "Evolutionary Ecology of Words",
            },
            content: {
                [UNIVERSAL_LANG]:
                "This experiment model works with <strong>animal species names</strong>, generated and judged by the chosen LLM. The model \
                decides which lives and dies according to <strong>a given criteria</strong> (e.g \" which one is stronger ?\" ). At the end of each step, \
                words have a chance to mutate, and that allows the <strong>semantic derivation</strong> of the overall population. Following a EEW based experiment, \
                we can compute several metrics and create graphs from the results. The experiment is partly orchestrated thanks to <strong>a set of \
                four specific prompts, one for each phases</strong> : \
                <ul> \
                <li>a prefix context prompt to indicate the role that the model should bear,</li>\
                <li>the generation of <strong>initial populations</strong> of animal species names,</li>\
                <li>the judgment between two names to decide <strong>which one is stronger</strong>,</li>\
                <li>the generation of <strong>mutation possibilities</strong> related to a mutating word.</li>\
                </ul> \
                These three phases are the articulations that allow <strong>any state change within the population</strong> of words. [[image 0]]\
                The first available type of visual is a collection of graphs studying the B most present names over the steps. With this one, we can \
                observe <strong>the emergence of prey-predator dynamics, food chains, and even epidemic phenomena</strong>. In this case, it translates \
                <strong>the alignment of models</strong>, since without even meaning to, we can observe the development of nature like ecosystems.\
                The second type of visual is a semantic graph that uses the <strong>Sentence Transformers library</strong> to vectorize the names and the <strong>UMAP \
                library</strong> to draw trajectories. These last <strong>materialize the semantic derivation from the initial population of names to the final one</strong>, \
                regularly plotting the average vector of all the semantic word vectors within the current population. The more the distance between \
                two plots, <strong>the less the two populations have to do with each other</strong>. With such a graph, we can identify <strong>semantic areas or fields</strong> and\
                so observe <strong>dynamics of specialisation (e.g types of species), exploration or exploitation of words and even concepts that could emerge</strong>. [[image 1]]\
                Behind its simple traits, EEW aims to create an environment in which LLMs can <strong>maximize their creativity and so test their limits on that aspect</strong>. \
                It can notably be measured through the number of novelties that emerged along the experiment. It's not a question of whether the results are \
                realistic or not.",
                fr:
                "",
            },
        },
        {
            title: {
                [UNIVERSAL_LANG]: "Discovery of language biases",
            },
            content: {
                [UNIVERSAL_LANG]:
                "On the premise that a language is imbued with the culture it comes from, I really liked the idea that changing prompt language \
                could open up different, more or less specific, semantic fields. Experiments following this hypothesis turned out to be very \
                fruitful, highlighting a strong language bias, and exploiting it as an engine of creativity for LLMs; while discovering other unique \
                properties linked to the different languages tested.<br>",
                fr:
                "",
            },
        },
    ],
    tableOfContents: true,
    relatedProjects: ["EEW Analyzer"],
};
