/**
 * @fileoverview Scaleway Deployment project definition
 * Infrastructure as Code (IaC) deployment of a Rust application on Scaleway using Terraform and Docker.
 */

import { Retex } from '../dataTypes';
import { UNIVERSAL_LANG } from '../../utils/translationUtils';
import { getSkill } from '../../utils/assetsUtils';
import { projectsImages } from '../index';

export const scalewayDeployment: Retex = {
  title: {
    fr: "Déploiement Scaleway",
    en: "Scaleway Deployment",
  },
  date: new Date(2025, 1), // Février 2025
  coverImage: projectsImages.gpgtool_pgp_diagram, // Using the first image as cover
  favorite: false,
  tags: {
    en: ["Cloud", "IaC", "DevOps", "Infrastructure", "Automation", "Academic", "University"],
    fr: ["Cloud", "IaC", "DevOps", "Infrastructure", "Automatisation", "Académique", "Universitaire"],
    [UNIVERSAL_LANG]: ["Terraform", "Docker", "Scaleway", "Rust", "S3"],
  },
  description: {
    fr:
    "Déploiement automatisé d'une application Rust sur l'infrastructure Cloud Scaleway en utilisant Terraform (IaC) et Docker.",
    en:
    "Automated deployment of a Rust application on Scaleway Cloud infrastructure using Terraform (IaC) and Docker.",
  },
  content: {
    specs: {
      fr:
      "Ce projet d'introduction au <strong>Cloud Computing</strong> consistait à mettre en place une infrastructure complète sur <strong>Scaleway</strong>. \
      L'application, développée en <strong>Rust</strong>, est conteneurisée via un <strong>Dockerfile multi-stage</strong> pour optimiser la taille de l'image finale \
      (réduction d'environ 500 Mo). L'infrastructure est gérée comme du code (<strong>IaC</strong>) avec <strong>Terraform</strong>, incluant la configuration d'un \
      <strong>backend distant S3</strong> pour le stockage du state et l'activation du <strong>state locking</strong> pour permettre la collaboration. \
      Le déploiement cible un <strong>Container Namespace</strong> Scaleway avec une gestion précise des ressources (CPU et RAM) pour optimiser les coûts.",
      en:
      "This introductory <strong>Cloud Computing</strong> project involved setting up a complete infrastructure on <strong>Scaleway</strong>. \
      The application, developed in <strong>Rust</strong>, is containerized via a <strong>multi-stage Dockerfile</strong> to optimize the final image size \
      (reduction of approximately 500 MB). The infrastructure is managed as code (<strong>IaC</strong>) with <strong>Terraform</strong>, including the configuration \
      of an <strong>S3 remote backend</strong> for state storage and the activation of <strong>state locking</strong> to enable collaboration. \
      The deployment targets a Scaleway <strong>Container Namespace</strong> with precise resource management (CPU and RAM) to optimize costs.",
    },
    notions: {
      fr: [
        "Infrastructure as Code (IaC)",
        "Gestion de conteneurs (Docker)",
        "Optimisation d'images (Multi-stage builds)",
        "Backend distant et State Locking",
        "Cloud Provider (Scaleway Serverless)"
      ],
      en: [
        "Infrastructure as Code (IaC)",
        "Container management (Docker)",
        "Image optimization (Multi-stage builds)",
        "Remote backend and State Locking",
        "Cloud Provider (Scaleway Serverless)"
      ],
    },
    tools: [
      getSkill('Rust'),
      getSkill('Docker'),
      getSkill('Git'),
      getSkill('Debian'),
    ],
    images: [
      projectsImages.gpgtool_pgp_diagram, 
    ],
  }
};
