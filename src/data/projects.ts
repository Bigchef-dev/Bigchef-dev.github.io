import { SkillKey } from './skills';

/**
 * Interface pour les images
 */
export interface ProjectImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

/**
 * Interface pour les projets
 */
export interface Project {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  images: ProjectImage[];
  technologies: SkillKey[];
  github?: string;
  gitlab?: string;
  website?: string;
  demo?: string;
  category: 'associatif' | 'universitaire' | 'professionnel' | 'personnel';
}

/**
 * Liste des projets
 */
export const projects: Project[] = [
  {
    id: 1,
    title: 'AI Chat Assistant',
    description: 'Assistant IA conversationnel avec LangChain et OpenAI. Interface React avec streaming en temps réel.',
    fullDescription: `# AI Chat Assistant

Un assistant IA conversationnel complet et performant.

## 🎯 Fonctionnalités principales

- Streaming des réponses en temps réel
- Support du contexte conversationnel persistant
- Intégration avec OpenAI et autres LLMs
- Interface utilisateur moderne et réactive
- Historique complet de conversations
- Authentification sécurisée

## 🏗️ Architecture technique

- **Frontend**: React avec Tailwind CSS et animations
- **Backend**: Node.js/Express avec WebSocket
- **Base de données**: PostgreSQL pour l'historique
- **Déploiement**: Docker sur infrastructure cloud
- **Monitoring**: ELK Stack pour les logs

## 📊 Performances

- Temps de réponse < 200ms
- Support 1000+ utilisateurs concurrents
- Uptime 99.9%`,
    images: [
      {
        src: 'https://images.unsplash.com/photo-1677442d019cecf8d29b36b9cf5f9e6e3d5f6d9d?w=1000&q=80',
        alt: 'AI Chat Assistant - Interface conversationnelle',
        width: 1000,
        height: 600,
      },
      {
        src: 'https://images.unsplash.com/photo-1677442d019cecf8d29b36b9cf5f9e6e3d5f6d9d?w=800&q=80',
        alt: 'AI Chat Assistant - Dashboard',
        width: 800,
        height: 600,
      },
    ],
    technologies: ['react', 'nodejs', 'langchain', 'postgresql', 'websocket', 'typescript', 'docker'],
    github: 'https://github.com/mathieu/ai-chat',
    website: 'https://ai-chat-demo.vercel.app',
    category: 'personnel',
  },
  {
    id: 2,
    title: 'Aaron le Mercenaire',
    description: 'Un écosystème de Data Stream Processing, transformer et valoriser des flux de données pour trouver les meilleures opportunités pour les joueurs.',
    fullDescription: `# Portfolio Analytics

Plateforme d'analytics complète pour suivre et analyser les performances.

## 📈 Fonctionnalités

- Dashboards temps réel personnalisables
- Graphiques interactifs avec Chart.js
- Filtrage avancé par période et catégorie
- Export en PDF/CSV
- Système d'alertes et notifications
- Comparaison de périodes

## 🛠️ Stack technique

- **Frontend**: React + TypeScript + Tailwind
- **Backend**: Python FastAPI
- **Cache**: Redis pour les requêtes fréquentes
- **Database**: PostgreSQL avec optimisations
- **DevOps**: Docker + Kubernetes
- **Monitoring**: Prometheus + Grafana

## ⚡ Optimisations

- Caching agressif (Redis)
- Pagination côté serveur
- Compression des données
- CDN pour les assets statiques`,
    images: [
      {
        src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&q=80',
        alt: 'Portfolio Analytics - Dashboard interactif',
        width: 1000,
        height: 600,
      },
      {
        src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
        alt: 'Portfolio Analytics - Graphiques',
        width: 800,
        height: 600,
      },
    ],
    technologies: ['react', 'python', 'api', 'postgresql', 'docker', 'grafana', 'typescript'],
    github: 'https://github.com/mathieu/portfolio-analytics',
    gitlab: 'https://gitlab.com/mathieu/portfolio-analytics',
    category: 'professionnel',
  },
  {
    id: 3,
    title: 'Real-time Collaboration App',
    description: 'Plateforme de collaboration temps réel avec sync cloud. Stack fullstack moderne.',
    fullDescription: `# Real-time Collaboration App

Application collaborative permettant à plusieurs utilisateurs de travailler ensemble en temps réel.

## 🤝 Fonctionnalités collaboratives

- Synchronisation en temps réel via WebSocket
- Édition collaborative de documents
- Curseurs et présence des utilisateurs
- Versioning et historique complet
- Commentaires inline
- Partage de fichiers

## ☁️ Cloud & Storage

- **AWS S3** pour les fichiers
- **CloudFlare CDN** pour les assets
- **MongoDB** pour les données collaboratives
- Transactions ACID

## 🔒 Sécurité

- Authentification OAuth2
- Chiffrement end-to-end
- Permissions granulaires
- Audit trail complet`,
    images: [
      {
        src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1000&q=80',
        alt: 'Real-time Collaboration App - Collaboration en temps reel',
        width: 1000,
        height: 600,
      },
      {
        src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
        alt: 'Real-time Collaboration App - Edition collaborative',
        width: 800,
        height: 600,
      },
    ],
    technologies: ['vue', 'nodejs', 'websocket', 'mongodb', 'aws', 'typescript', 'docker'],
    website: 'https://aaronlem.ovh',
    category: 'personnel',
  },
];
