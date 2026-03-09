/**
 * @fileoverview Study of EEW project definition
 * Linguistic study of the Evolutionary Ecology of Words model
 */

import { Retex } from '../dataTypes';
import { UNIVERSAL_LANG } from '../../utils/translationUtils';
import { getSkill } from '../../utils/assetsUtils';
import { projectsImages, documents } from '../index';

export const studyOfEew: Retex = {
  title: {
    [UNIVERSAL_LANG]: "Study of EEW"
  },
  date: new Date(2025, 4), // Mai 2025
  coverImage: projectsImages.eew_lang_bias,
  tags: {
    en: ["Research", "Linguistics", "AI", "Academic"],
    fr: ["Recherche", "Linguistique", "IA", "Académique"],
    [UNIVERSAL_LANG]: ["Modeling", "Ethics"],
  },
  description: {
    fr: "Étude linguistique du modèle Evolutionary Ecology of Words.",
    en: "Linguistic study of the Evolutionary Ecology of Words model."
  },
  content: {
    specs: {
      fr:
      "Cette étude approfondit les mécanismes linguistiques du modèle <strong>EEW</strong>. \
      L'objectif était d'analyser comment les représentations culturelles et linguistiques \
      influencent l'évolution des mots dans une simulation de vie artificielle. \
      Les recherches ont mis en évidence l'existence de biais sémantiques forts \
      selon la langue de prompt utilisée, ouvrant de nouvelles perspectives sur \
      le multilinguisme comme moteur de diversité.",
      en:
      "This study delves into the linguistic mechanisms of the <strong>EEW</strong> model. \
      The goal was to analyze how cultural and linguistic representations \
      influence word evolution in an artificial life simulation. \
      The research highlighted the existence of strong semantic biases \
      based on the prompt language used, opening new perspectives on \
      multilingualism as a driver of diversity.",
    },
    notions: {
      fr: [
        "Linguistique computationnelle",
        "Analyse de biais dans les LLM",
        "Modélisation de systèmes complexes",
        "Rédaction scientifique",
      ],
      en: [
        "Computational linguistics",
        "Bias analysis in LLMs",
        "Complex system modeling",
        "Scientific writing",
      ],
    },
    tools: [
      getSkill('Python'),
      getSkill('Latex'),
      getSkill('Markdown'),
      getSkill('Git'),
    ],
    images: [
      projectsImages.eew_lang_bias,
      projectsImages.eew_lang_behaviors,
    ],
    additionalRessources: [
      {
        content: {
          fr: "Rapport de stage",
          en: "Internship report",
        },
        link: documents.eewInternshipReport,
      },
      {
        content: {
          fr: "Rapport d'activité",
          en: "Activity report",
        },
        link: documents.eewActivityReport,
      }
    ]
  }
};
