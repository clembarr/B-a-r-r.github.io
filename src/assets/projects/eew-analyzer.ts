/**
 * @fileoverview EEW Analyzer project definition
 * Application for the Evolutionary Ecology of Words model
 */

import { Retex } from '../dataTypes';
import { UNIVERSAL_LANG } from '../i18n';
import { getSkill } from '../skillsIndex';
import { projectsImages, documents } from '../index';

export const eewAnalyzer: Retex = {
  title: {
    [UNIVERSAL_LANG]: "EEW Analyzer"
  },
  date: new Date(2025, 5),
  tools: [
    getSkill('Python'),
    getSkill('PyTorch'),
    getSkill('Numpy'),
    getSkill('Transformers'),
    getSkill('CUDA'),
  ],
  description: {
    fr:
    "Une application dédiée au modèle de vie artificielle EEW, permettant de lancer des expérience et analyser les résultats à travers différentes métriques.",
    en:
    "A dedicated application for the EEW artificial life model, allowing to run experiments and analyze the results through different metrics.",
  },
  specs: {
    fr:
    `Développement d'une application CLI dédiée pour le modèle d'expérience de vie artificielle Evolutionary Ecology of Words (EEW), 
    dans le cadre de mon stage de recherche au laboratoire ALIFE-CORE. L'architecture reprends les principes SOLID et DRY, séparant 
    distinctement le <strong>moteur de simulation</strong> de <strong>l'outil d'analyse et de modélisation</strong>. Un wrapper indépendant 
    permet de <strong>charger dynamiquement n'importe quel LLM</strong> en local. La configuration est <strong>centralisée dans un fichier 
    JSON</strong>, permettant de piloter les règles de la simulation ainsi que les paramètres d'optimisation des ressources et de collecte 
    des données. Mes travaux de recherche en parrallèle ont nécessité de recueillir de <strong>nouvelles données</strong> pendant l'expérimentation,
    d'imaginer de <strong>nouvelles métriques</strong> et d'implémenter les visuels correspondants pour les valoriser. Certains paramètres abstraits,
    comme les types de prompts ou les critères de jugement, permettent d'explorer de <strong>nouvelles trajectoires de mutations</strong>.<br>
    Pour en savoir plus sur mon étude, je vous invite à consulter <strong>l'article dédié sur mon blog</strong>.`,
    en:
    `Development of a CLI dedicated for the Evolutionary Ecology of Words (EEW) experiment life model, in the context of my research internship 
    at the ALIFE-CORE laboratory. The architecture follows the SOLID and DRY principles, separating the <strong>simulation engine</strong>
    from the <strong>analysis and modeling tool</strong>. A standalone wrapper allows to <strong>load any LLM locally</strong>. The configuration is 
    <strong>centralized in a JSON file</strong>, allowing to pilot the simulation rules as well as the optimization parameters and data collection.
    My parallel research work required to gather <strong>new data</strong> during the experiment, to imagine <strong>new metrics</strong> and to implement
    the corresponding visuals to value them. Some abstract parameters, such as prompt types or judgment criteria, allow to explore <strong>new mutation 
    trajectories</strong>.<br> 
    For more information about my study, I invite you to read <strong>the article dedicated to my blog</strong>.`,
  },
  notions: {
    fr: ["Intégration de LLMs et prompt engineering", "Analyse et valorisation de données", "Métriques et modélisation speciales", "Outils spé. pour la recherche"],
    en: ["LLM integration and prompt engineering", "Data analysis and valorization", "Special metrics and modeling", "Special tools for research"],
  },
  tags: {
    fr: ["Data", "ALife", "IA", "Recherche", "Professionnel", "Stage", "POO", "Programmation orientée objet", "Logiciel", "Vie artificielle", "Intelligence artificielle"],
    en: ["Data", "ALife", "AI", "Intern", "Research", "Professional", "OOP", "Object-oriented programming", "Software", "Internship", "Artificial life", "Artificial intelligence"],
    [UNIVERSAL_LANG]: ["AI", "BigData", "Simulation", "Integration", "Data science", "Math", "LLM"]
  },
  img: [
    projectsImages.eew_basic_visuals,
    projectsImages.eew_algo,
    projectsImages.eew_uml_simulation,
    projectsImages.eew_uml_makegraph,
    projectsImages.eew_prompts,
    projectsImages.eew_logs_file,
  ],
  additionalRessources: [
    {
      content: {
        fr: "Rapport de stage",
        en: "Internship report",
      },
      link: documents.eew_internship_report,
    },
    {
      content: {
        fr: "Rapport d'activité",
        en: "Activity report",
      },
      link: documents.eew_activity_report,
    }
  ],
  favorite: true,
  relatedPosts: ["eew-language-biases"],
};
