/**
 * @fileoverview VeridisQuo project definition
 * State-of-the-art neural network for deepfake detection using hybrid information aggregation
 */

import { Retex } from '../dataTypes';
import { UNIVERSAL_LANG } from '../../utils/translationUtils';
import { getSkill, wrapInMedia } from '../../utils/assetsUtils';
import { projectsImages, documents } from '../index';
import { MediaType } from '../dataTypes';

export const veridisquo: Retex = {
  title: {
    [UNIVERSAL_LANG]: "VeridisQuo"
  },
  date: new Date(2024, 11), // Decembre 2024
  coverImage: projectsImages.veridisquo_front,
  tags: {
    en: ["AI", "Deep Learning", "Computer Vision", "Research", "Security", "Professional"],
    fr: ["IA", "Deep Learning", "Vision par ordinateur", "Recherche", "Sécurité", "Professionnel"],
    [UNIVERSAL_LANG]: ["PyTorch", "Python", "XAI"],
  },
  description: {
    fr: "Réseau de neurones de pointe pour la détection de deepfakes par agrégation d'informations hybrides.",
    en: "State-of-the-art neural network for deepfake detection using hybrid information aggregation."
  },
  content: {
    specs: {
      fr:
      "VeridisQuo est un projet de recherche et développement visant à concevoir un détecteur de <strong>deepfakes</strong> ultra-performant. \
      Le modèle repose sur une architecture hybride qui combine l'analyse de texture locale (via des filtres de Sobel et de fréquence) \
      et des caractéristiques sémantiques globales extraites par un backbone <strong>EfficientNet</strong>. \
      L'innovation majeure réside dans le module d'attention croisée qui permet de corréler les artefacts visuels subtils \
      avec la structure globale du visage. Le projet inclut également une dimension <strong>XAI (IA explicable)</strong> via Grad-CAM \
      pour visualiser les zones suspectes ayant conduit à la décision du modèle.",
      en:
      "VeridisQuo is an R&D project focused on designing a high-performance <strong>deepfake</strong> detector. \
      The model is based on a hybrid architecture that combines local texture analysis (via Sobel and frequency filters) \
      with global semantic features extracted by an <strong>EfficientNet</strong> backbone. \
      The key innovation lies in the cross-attention module that correlates subtle visual artifacts \
      with the overall face structure. The project also includes an <strong>XAI (Explainable AI)</strong> dimension using Grad-CAM \
      to visualize the suspicious areas that led to the model's decision.",
    },
    notions: {
      fr: [
        "Computer vision et caractérisation des deepfakes",
        "IA expliquable (XAI) avec Grad-CAM",
        "Aggregation d'informations hybrides",
        "Optimisation du transit des calculs sur hardware",
      ],
      en: [
        "Computer vision and deepfake characterization",
        "Explainable AI (XAI) with Grad-CAM",
        "Hybrid information aggregation",
        "Hardware compute transit optimization",
      ],
    },
    tools: [
      getSkill('Python'),
      getSkill('PyTorch'),
      getSkill('CUDA'),
      getSkill('OpenCV'),
    ],
    images: [
      projectsImages.veridisquo_front,
      wrapInMedia(projectsImages.veridisquo_output, MediaType.VIDEO, "Demo output"),
      projectsImages.veridisquo_pipeline,
    ] as any[],
    additionalRessources: [
      {
        content: {
          fr: "Rapport de recherche",
          en: "Research report",
        },
        link: documents.eewInternshipReport,
      },
    ]
  }
};
