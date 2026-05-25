import { SkillKey } from './skills';
import { resolveAssetUrl } from './assets';

/**
 * Interface pour les images
 */
export interface ProjectImage {
  src: string;
  alt: { fr: string; en: string };
  width?: number;
  height?: number;
}

/**
 * Interface pour les fichiers personnalisés (PDF, documents, etc.)
 */
export interface ProjectFile {
  label: string;
  url: string;
  icon?: string; // emoji ou texte court pour l'icône
}

/**
 * Interface pour les projets
 */
export interface Project {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  fullDescriptionEn?: string;
  images: ProjectImage[];
  technologies: SkillKey[];
  github?: string;
  gitlab?: string;
  website?: string;
  demo?: string;
  files?: ProjectFile[];
  category: 'associatif' | 'universitaire' | 'professionnel' | 'personnel';
}

/**
 * Liste brute des projets
 */
const rawProjects = [
  {
    id: 1,
    title: 'Gepetto, Chatbot IA & RAG',
    description: 'Gepetto est un chatbot IA avancé pour fournir des réponses précises et contextuelles.',
    fullDescription: `### Contexte

  Ce projet a été développé dans le cadre de mon stage de M1.

  Gepetto est un chatbot IA avancé utilisant la génération augmentée par récupération (RAG) pour fournir des réponses précises et contextuelles, disponible dans le Slack interne.

  ### Contribution

  Le projet a été initialisé avec un premier prototype ; ma tâche a consisté à concevoir une architecture robuste et modulaire, intégrant des fonctionnalités avancées de RAG (Parent-Document-Retrieval, raisonnement). Ce projet m'a beaucoup appris sur les systèmes de dialogue basés sur des LLMs et m'a permis d'explorer en profondeur les techniques de RAG.

  Ma contribution, d'abord prévue pour le support client, a rapidement été étendue pour fournir des réponses aux développeurs à partir des documentations techniques des projets.`,
    fullDescriptionEn: `### Context

  This project was developed as part of my M1 internship.

  Gepetto is an advanced AI chatbot using Retrieval-Augmented Generation (RAG) to provide precise and contextual answers, available within the internal Slack.

  ### Contribution

  The project was initialized with a first prototype; my task was to design a robust and modular architecture, integrating advanced RAG features (Parent-Document-Retrieval, reasoning). This project taught me a lot about LLM-based dialogue systems and allowed me to deeply explore RAG techniques.

  My contribution, initially planned for customer support, was quickly extended to provide answers to developers based on project technical documentation.`,
    images: [{
      src: '/src/assets/projects/gepetto/conversation.png',
      alt: { fr: 'Interface de chat avec Gepetto', en: 'Chat interface with Gepetto' }
    }, {
      src: '/src/assets/projects/gepetto/ticket.png',
      alt: { fr: 'Réponse de résolution à un ticket nouvellement créé', en: 'Ticket resolution response' }
    }, {
      src: '/src/assets/projects/gepetto/parent-doc-retrieval.png',
      alt: { fr: 'Explication du Parent-Document-Retrieval (hiérarchique) améliorer les réponses', en: 'Parent-Document-Retrieval explanation' }
    }, {
      src: '/src/assets/projects/gepetto/grafana.png',
      alt: { fr: 'Suivi des traces sur un board grafana pour monitorer les interactions', en: 'Grafana trace monitoring board' }
    }, {
      src: '/src/assets/projects/gepetto/timeline.png',
      alt: { fr: 'Suivi de l\'éxécution d\'une requête à Gepetto', en: 'Request execution timeline' }
    }],
    technologies: ['typescript', 'api', 'docker', 'openai', 'rag', 'langchain', 'agentic', 'sql', 'nestjs'],
    category: 'professionnel',
    website: "https://blog.digitaleo.fr/marketing-ia-piloter-changement-accompagnement-client"
  },
  {
    id: 2,
    title: 'Aaron le Mercenaire',
    description: 'Un écosystème de Data Stream Processing, transformer et valoriser des flux de données pour trouver les meilleures opportunités pour les joueurs.',
    fullDescription: `# Aaron — Écosystème de services pour NationsGlory

> Un monorepo complet orchestrant un bot Discord, une API REST, un front-end web et une flotte de workers de scrapping, au service de la communauté **NationsGlory** (serveur Minecraft).

---

## 🧠 Vue d'ensemble

**Aaron** est un assistant multi-service intégré à l'écosystème du jeu Minecraft **NationsGlory**. Il permet aux joueurs de consulter en temps réel des données de jeu (joueurs, pays, factions, pillages, HDV), de configurer des alertes et notifications, et d'analyser l'activité des serveurs — le tout depuis **Discord** ou une **interface web**.

Le projet est structuré en **monorepo** (pnpm workspaces) et contient **7 applications** et **2 packages partagés**, déployés via **Docker** et **GitLab CI/CD**.

## 📦 Applications

### 🔹 API REST — [\`apps/api\`](aaron_monorepo/apps/api) — v3.0.0

Backend central en **Express.js / TypeScript** connecté à **MongoDB** (Mongoose) et **Redis** (ioredis).

- **Authentification OAuth2** via Discord et NationsGlory (Passport.js)
- **File d'attente de jobs** avec **BullMQ** (8 queues : pays, joueurs, événements Discord, scrapping…)
- **Monitoring** des queues via **Bull Board** (interface web \`/queues\`)
- **Documentation Swagger / OpenAPI**
- **Métriques Prometheus** (\`prom-client\`)
- **Workers intégrés** : scrapping-api-country, scrapping-api-player, connected-players
- **Endpoints** : couleurs, joueurs connectés, pays, empires, événements HDV, désertions, pillages, espionnage, guerres, stockage…

### 🔹 Discord Bot — [\`apps/discordv3\`](aaron_monorepo/apps/discordv3) — v3.0.0

Bot Discord nommé **"Aaron le Mercenaire"**, développé avec **discord.js v14** en architecture **shardée** (clusters).

- **20+ commandes slash** : \`/player\`, \`/country\`, \`/top-player\`, \`/top-country\`, \`/pillage\`, \`/hdv\`, \`/online\`, \`/network-connected\`, \`/colonie-rentable\`, \`/config\`, \`/alertes\`, \`/disbands\`, \`/coords\`, \`/canvas\`, \`/random-player\`, \`/random-country\`, \`/staffng-*\`…
- **Commandes utilisateur** et **commandes message** (context menu)
- **Système de notifications temps réel** : alertes de pillage, désertions, guerres, espionnage, fin de ciblage, arrivée/départ de joueurs, expirations HDV, notations, assignation de rôles
- **Workers BullMQ** : traitement des événements Discord (guild et user)
- **Système de langues** (français, anglais US/GB)
- **Gestion des permissions** et des rôles liés
- **API HTTP interne** pour communication avec le master process
- **Collectors** avec pagination interactive (boutons)

### 🔹 Front-end Web — [\`apps/web\`](aaron_monorepo/apps/web) — v4.0.0

Application web en **Vue 3** avec **Vue Router**, **Vuex**, et **Naive UI** (thème dark orange personnalisé).

- **Pages** : Accueil (statistiques live), Joueur, Pays (avec iframe Dynmap), Profil (compte, NationsGlory, guildes), Commandes, Pillages, Équipe, Login, Log Tool
- **SSO** : Connexion via Discord OAuth2 et NationsGlory
- **Configuration de guilde** : onglets Général, Pays ciblés, Espionnage, HDV (avec sélecteur de serveur, channel, rôle, fourchette de prix)
- **Outil d'analyse de logs** client Minecraft (parse les logs NG avec codes couleurs)
- **Palette de couleurs** pour 18+ serveurs (blue, orange, yellow, black, cyan, lime, coral, pink, alpha, sigma, omega, purple, green, red, delta, mocha, epsilon, jade)
- **Barre de recherche** globale avec tags et sélecteur de serveur

### 🔹 Workers de scrapping

| Application | Technologie | Rôle |
|---|---|---|
| [\`scrapdynmap\`](aaron_monorepo/apps/scrapdynmap) | Node.js / BullMQ | Scrape les tuiles Dynmap des serveurs NG (Terre, Lune, Mars, Edora) et extrait les données de factions (niveau, puissance, banque, membres…) |
| [\`scrappingapi\`](aaron_monorepo/apps/scrappingapi) | NestJS / BullMQ | Service de scrapping avec sélecteur de job (pays / joueurs) |
| [\`yoxo-scrappingapi\`](aaron_monorepo/apps/yoxo-scrappingapi) | TypeScript / BullMQ | Scrapping programmé quotidien via l'API Yoxo SDK |
| [\`getplayers\`](aaron_monorepo/apps/getplayers) | Node.js / BullMQ | Récupération des joueurs connectés en temps réel |
| [\`fetchScrapping\`](aaron_monorepo/apps/fetchScrapping) | TypeScript | Scrapping pays par fetch pour meilleure efficacité |

---

## 📚 Packages partagés

- **\`@monorepo/api-client\`** — Client HTTP SDK pour l'API NationsGlory avec authentification (email/mot de passe), reconnexion automatique sur expiration de token, modules dynmap et serverColors
- **\`@monorepo/types\`** — Types TypeScript partagés entre les apps

---

## 🛠️ Stack technique

| Catégorie | Technologies |
|---|---|
| **Backend** | Node.js, Express.js, TypeScript, NestJS |
| **Base de données** | MongoDB (Mongoose), Redis (ioredis) |
| **File d'attente** | BullMQ, Bull Board |
| **Bot Discord** | discord.js v14 (shardé/cluster), discord-api-types |
| **Front-end** | Vue 3, Vue Router, Vuex, Naive UI, Bulma, Sass |
| **OAuth** | Passport.js (Discord, NationsGlory) |
| **Monitoring** | Prometheus (prom-client), Pino (logging) |
| **Validation** | Zod (@t3-oss/env-core) |
| **Package Manager** | pnpm 11+ (workspaces) |
| **Conteneurisation** | Docker, Docker Compose (4 profils : deps, core, bot, workers) |
| **CI/CD** | GitLab CI (5 stages : packages → verify → build → image → deploy) |
| **Déploiement** | VPS, Caddy (reverse proxy), scripts shell automatisés |

---

## 🚀 Déploiement & DevOps

- **Docker Compose** multi-profil : \`deps\` (MongoDB, Redis), \`core\` (API, Web), \`bot\` (Discord bot), \`workers\` (getplayers, scrapdynmap, scrappingapi)
- **Healthchecks** sur tous les services
- **Volumes nommés** pour persistance des \`node_modules\`
- **Pipeline GitLab CI** automatisé : build des packages → vérification → build Docker → push registry → déploiement SSH sur VPS
- **Déploiement conditionnel** par détection de changements (\`changes\` blocks)
- **Scripts de déploiement** : \`deploy-aaron.sh\`, \`rollback.sh\`, \`setup-vps.sh\`
- **Reverse proxy** Caddy avec configuration multi-domaine

---

## 📊 Chiffres clés

- **3 001** serveurs Discord utilisateurs
- **+218 000** commandes exécutées
- **~2 030** pays suivis
- **92 974** utilisateurs potentiels
- **215 217** joueurs enregistrés
- **18+** serveurs de jeu supportés (couleurs)
- **8** files d'attente BullMQ
- **20+** commandes slash Discord
- **15+** types de notifications temps réel


*Projet développé pour la communauté NationsGlory — 2021-2026*`,
    fullDescriptionEn: `# Aaron — Service Ecosystem for NationsGlory

> A complete monorepo orchestrating a Discord bot, a REST API, a web front-end, and a fleet of scraping workers, serving the **NationsGlory** community (Minecraft server).

---

## 🧠 Overview

**Aaron** is a multi-service assistant integrated into the **NationsGlory** Minecraft game ecosystem. It allows players to consult real-time game data (players, countries, factions, raids, HDV), configure alerts and notifications, and analyze server activity — all from **Discord** or a **web interface**.

The project is structured as a **monorepo** (pnpm workspaces) containing **7 applications** and **2 shared packages**, deployed via **Docker** and **GitLab CI/CD**.

## 📦 Applications

### 🔹 REST API — [\`apps/api\`](aaron_monorepo/apps/api) — v3.0.0

Central backend in **Express.js / TypeScript** connected to **MongoDB** (Mongoose) and **Redis** (ioredis).

- **OAuth2 Authentication** via Discord and NationsGlory (Passport.js)
- **Job queue** with **BullMQ** (8 queues: countries, players, Discord events, scraping…)
- **Queue monitoring** via **Bull Board** (web interface \`/queues\`)
- **Swagger / OpenAPI Documentation**
- **Prometheus metrics** (\`prom-client\`)
- **Integrated workers**: scrapping-api-country, scrapping-api-player, connected-players
- **Endpoints**: colors, connected players, countries, empires, HDV events, desertions, raids, espionage, wars, storage…

### 🔹 Discord Bot — [\`apps/discordv3\`](aaron_monorepo/apps/discordv3) — v3.0.0

Discord bot named **"Aaron the Mercenary"**, developed with **discord.js v14** in **sharded** architecture (clusters).

- **20+ slash commands**: \`/player\`, \`/country\`, \`/top-player\`, \`/top-country\`, \`/pillage\`, \`/hdv\`, \`/online\`, \`/network-connected\`, \`/colonie-rentable\`, \`/config\`, \`/alertes\`, \`/disbands\`, \`/coords\`, \`/canvas\`, \`/random-player\`, \`/random-country\`, \`/staffng-*\`…
- **User commands** and **message commands** (context menu)
- **Real-time notification system**: raid alerts, desertions, wars, espionage, targeting end, player arrival/departure, HDV expirations, ratings, role assignments
- **BullMQ workers**: Discord event processing (guild and user)
- **Language system** (French, English US/GB)
- **Permission management** and related roles
- **Internal HTTP API** for communication with the master process
- **Collectors** with interactive pagination (buttons)

### 🔹 Web Front-end — [\`apps/web\`](aaron_monorepo/apps/web) — v4.0.0

Web application in **Vue 3** with **Vue Router**, **Vuex**, and **Naive UI** (custom dark orange theme).

- **Pages**: Home (live statistics), Player, Country (with Dynmap iframe), Profile (account, NationsGlory, guilds), Commands, Raids, Team, Login, Log Tool
- **SSO**: Login via Discord OAuth2 and NationsGlory
- **Guild configuration**: tabs for General, Targeted Countries, Espionage, HDV (with server, channel, role, price range selectors)
- **Minecraft client log analysis** tool (parses NG logs with color codes)
- **Color palette** for 18+ servers (blue, orange, yellow, black, cyan, lime, coral, pink, alpha, sigma, omega, purple, green, red, delta, mocha, epsilon, jade)
- **Global search bar** with tags and server selector

### 🔹 Scraping Workers

| Application | Technology | Role |
|---|---|---|
| [\`scrapdynmap\`](aaron_monorepo/apps/scrapdynmap) | Node.js / BullMQ | Scrapes Dynmap tiles from NG servers (Earth, Moon, Mars, Edora) and extracts faction data (level, power, bank, members…) |
| [\`scrappingapi\`](aaron_monorepo/apps/scrappingapi) | NestJS / BullMQ | Scraping service with job selector (country / player) |
| [\`yoxo-scrappingapi\`](aaron_monorepo/apps/yoxo-scrappingapi) | TypeScript / BullMQ | Daily scheduled scraping via Yoxo SDK API |
| [\`getplayers\`](aaron_monorepo/apps/getplayers) | Node.js / BullMQ | Real-time connected player retrieval |
| [\`fetchScrapping\`](aaron_monorepo/apps/fetchScrapping) | TypeScript | Country scraping via fetch for better efficiency |

---

## 📚 Shared Packages

- **\`@monorepo/api-client\`** — HTTP Client SDK for NationsGlory API with authentication (email/password), automatic token reconnection, dynmap and serverColors modules
- **\`@monorepo/types\`** — Shared TypeScript types between apps

---

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| **Backend** | Node.js, Express.js, TypeScript, NestJS |
| **Database** | MongoDB (Mongoose), Redis (ioredis) |
| **Queue** | BullMQ, Bull Board |
| **Discord Bot** | discord.js v14 (sharded/cluster), discord-api-types |
| **Front-end** | Vue 3, Vue Router, Vuex, Naive UI, Bulma, Sass |
| **OAuth** | Passport.js (Discord, NationsGlory) |
| **Monitoring** | Prometheus (prom-client), Pino (logging) |
| **Validation** | Zod (@t3-oss/env-core) |
| **Package Manager** | pnpm 11+ (workspaces) |
| **Containerization** | Docker, Docker Compose (4 profiles: deps, core, bot, workers) |
| **CI/CD** | GitLab CI (5 stages: packages → verify → build → image → deploy) |
| **Deployment** | VPS, Caddy (reverse proxy), automated shell scripts |

---

## 🚀 Deployment & DevOps

- **Multi-profile Docker Compose**: \`deps\` (MongoDB, Redis), \`core\` (API, Web), \`bot\` (Discord bot), \`workers\` (getplayers, scrapdynmap, scrappingapi)
- **Healthchecks** on all services
- **Named volumes** for \`node_modules\` persistence
- **Automated GitLab CI pipeline**: package build → verification → Docker build → registry push → SSH deployment on VPS
- **Conditional deployment** via change detection (\`changes\` blocks)
- **Deployment scripts**: \`deploy-aaron.sh\`, \`rollback.sh\`, \`setup-vps.sh\`
- **Caddy reverse proxy** with multi-domain configuration

---

## 📊 Key Figures

- **3,001** Discord user servers
- **+218,000** commands executed
- **~2,030** tracked countries
- **92,974** potential users
- **215,217** registered players
- **18+** supported game servers (colors)
- **8** BullMQ queues
- **20+** Discord slash commands
- **15+** real-time notification types


*Project developed for the NationsGlory community — 2021-2026*`,
    images: [
      {
        src: '/src/assets/projects/aaron/connections.png',
        alt: { fr: 'Portfolio Analytics - Dashboard interactif', en: 'Portfolio Analytics - Interactive dashboard' },
        width: 1000,
        height: 800,
      },
      {
        src: '/src/assets/projects/aaron/pillage.png',
        alt: { fr: 'Portfolio Analytics - Graphiques', en: 'Portfolio Analytics - Charts' },
        width: 800,
        height: 600,
      },
    ],
    technologies: ['vue', 'python', 'api', 'postgresql', 'docker', 'grafana', 'typescript'],
    gitlab: 'https://gitlab.com/aaronngbot/aaron_monorepo',
    website: 'https://aaronlem.ovh',
    category: 'personnel',
  },
  {
    id: 4,
    title: 'Hackaton M2 Info',
    description: 'Backend d\'une application de gestion de club sportif, avec une architecture multi-tenant et un moteur de planification avancé.',
    fullDescription: `

### 🏆 Project Overview: Multi-Sport Club Management API

I've developped an sport app during a 5-day hackathon, with a team of 4 people. My job was to develop the backend of the application, with a focus on the architecture.
The application is a management platform for a sports club, with a focus on training sessions and athlete performance monitoring.
This robust REST API serves as the backbone for a sports club management platform. Originally designed for an Ultimate Frisbee club, the architecture was engineered to be **agnostic and multi-tenant**, allowing multiple clubs and various sports to coexist on the same infrastructure.

---

### 🛠️ Technical Stack
*   **Framework:** NestJS (Node.js) with TypeScript
*   **Database:** MySQL with TypeORM
*   **Security:** JWT Authentication, Passport.js, Bcrypt
*   **Documentation:** Swagger / Scalar (OpenAPI)
*   **DevOps:** Docker & Docker Compose
*   **Tools:** PNPM, Class-validator/transformer, ESLint/Prettier

---

### 🚀 Key Features & Implementation
*   **Modular Multi-Tenant Architecture:** Implemented a system where clubs, groups, and athletes are isolated. Designed the database schema to support future scaling to multiple clubs and sports without structural changes.
*   **Advanced RBAC (Role-Based Access Control):** 
    *   Developed custom Guards (\`RolesGuard\`, \`InClubGuard\`) to enforce security policies.
    *   Ensured that Presidents can only manage their own club, and Athletes can only access data relevant to their specific groups.
*   **Session & Activity Engine:** 
    *   Created a flexible planning system for training sessions and competitions.
    *   Implemented a modular activity system where each exercise can track dynamic metrics (e.g., intensity, duration, specific sport-related measures).
*   **Athlete Performance Monitoring:** 
    *   Integrated training load analysis logic.
    *   Added support for individual training thresholds (\`seuilEntrainement\`) to help coaches identify overtraining or under-training risks.
*   **Clean Code & Maintainability:** 
    *   Strict adherence to the **Repository Pattern** and **Data Mapper Pattern** to decouple business logic from database concerns.
    *   Comprehensive DTO (Data Transfer Object) implementation for strict input validation and predictable API responses.

---

### 💡 Engineering Highlights
*   **Extensibility by Design:** Used abstract base classes for users and association tables for groups, making it easy to transition from a single-role to a multi-role user system in the future.
*   **Developer Experience:** Automated the environment setup with Docker and implemented a custom seeding system for rapid testing and demonstration.
*   **Scalability:** The backend is optimized for complex queries using TypeORM's QueryBuilder, ensuring performance even as the relationship graph between athletes, sessions, and clubs grows.

---

### 📂 Repository Structure
*   [\`src/modules/\`](src/modules/): Cleanly separated business domains (Auth, Users, Sceance, Activites, Sports).
*   [\`src/common/\`](src/common/): Shared infrastructure, including database configuration and global filters/guards.
*   [\`Dockerfile\`](Dockerfile) & [\`docker-compose.yaml\`](docker-compose.yaml): Standardized production-ready environment.
To view [Frontend code](https://github.com/Bigchef-dev/hackaton-back)`,
    images: [{
      src: '/src/assets/projects/hackaton/homepage.png',
      alt: { fr: 'Hackaton M2 Info - Homepage of sportive dashboard', en: 'Hackathon M2 Info - Sportive dashboard homepage' },
      width: 1000,
      height: 600,
    }, {
      src: '/src/assets/projects/hackaton/swagger.png',
      alt: { fr: 'Hackaton M2 Info - Swagger API Documentation', en: 'Hackathon M2 Info - Swagger API Documentation' },
      width: 800,
      height: 600,
    }],
    technologies: ['nestjs', 'sql', 'orm', 'api', 'auth', 'docker', 'typescript'],
    github: 'https://github.com/Bigchef-dev/hackaton-back',
    category: 'universitaire'
  },
  {
    id: 5,
    title: 'Telegram MCP Server & Client',
    description: 'Serveur et client de messagerie instantanée sécurisé, avec chiffrement end-to-end et fonctionnalités avancées de gestion de contacts.',
    fullDescription: `**Résumé du projet**

- **Titre**: Client Telegram MCP — bot NestJS pour opérations Model Context Protocol.  
- **Accroche**: Bot Telegram modulaire qui connecte des utilisateurs à des agents IA via MCP pour dialogues contextuels et persistance mémoire.  
- **Rôle**: Conception et implémentation backend (NestJS), intégration Mastra, gestion du bot Telegram et architecture de handlers modulaires.  
- **Technologies**: NestJS, TypeScript, Telegraf, Mastra (@mastra/core), Zod, LibSQL (pour mémoire), pnpm.  
- **Points clés techniques**: Architecture sans serveur HTTP (createApplicationContext), handlers de commandes et d'événements modulaires, service \`MastraService\` pour orchestrer agents/outils/workflows, système de mémoire conversationnelle persistant, registres dynamiques de handlers.  
- **Fonctionnalités notables**: commandes Telegram prêtes (\`/start\`, \`/help\`, \`/status\`, \`/ping\`, \`/mastra\`, \`/memory\`, \`/clear_memory\`), traitement de messages via Mastra, persistance automatique des conversations, gestion d'erreurs et médias (voix, images).  
- **Impact & valeur**: Permet d'exposer des capacités MCP via une interface familière (Telegram), facilite essais d'agents IA et prototypage rapide d'interactions conversationnelles avec mémoire utilisateur persistante.  
- **Comment démarrer**: installer dépendances puis lancer en dev:
  - \`pnpm install\`
  - \`pnpm start:dev\`
- **Fichiers clés**: main.ts, app.module.ts, telegram.service.ts, mastra.module.ts, user-memory.service.ts.`,
    fullDescriptionEn: `**Project Summary**

- **Title**: Telegram MCP Client — NestJS bot for Model Context Protocol operations.  
- **Tagline**: Modular Telegram bot connecting users to AI agents via MCP for contextual dialogues and memory persistence.  
- **Role**: Backend design and implementation (NestJS), Mastra integration, Telegram bot management, and modular handler architecture.  
- **Technologies**: NestJS, TypeScript, Telegraf, Mastra (@mastra/core), Zod, LibSQL (for memory), pnpm.  
- **Key technical points**: Serverless HTTP architecture (createApplicationContext), modular command and event handlers, \`MastraService\` for orchestrating agents/tools/workflows, persistent conversational memory system, dynamic handler registries.  
- **Notable features**: Ready Telegram commands (\`/start\`, \`/help\`, \`/status\`, \`/ping\`, \`/mastra\`, \`/memory\`, \`/clear_memory\`), message processing via Mastra, automatic conversation persistence, error handling and media (voice, images).  
- **Impact & value**: Exposes MCP capabilities through a familiar interface (Telegram), facilitates AI agent testing and rapid prototyping of conversational interactions with persistent user memory.  
- **Getting started**: install dependencies then run in dev:
  - \`pnpm install\`
  - \`pnpm start:dev\`
- **Key files**: main.ts, app.module.ts, telegram.service.ts, mastra.module.ts, user-memory.service.ts.`,
    images: [{
      src: '/src/assets/projects/telegram-mcp/1.png',
      alt: { fr: 'Telegram MCP Server & Client', en: 'Telegram MCP Server & Client' }
    }, {
      src: '/src/assets/projects/telegram-mcp/2.png',
      alt: { fr: 'Telegram MCP Server & Client', en: 'Telegram MCP Server & Client' }
    }, {
      src: '/src/assets/projects/telegram-mcp/3.png',
      alt: { fr: 'Telegram MCP Server & Client', en: 'Telegram MCP Server & Client' }
    }, {
      src: '/src/assets/projects/telegram-mcp/4.png',
      alt: { fr: 'Telegram MCP Server & Client', en: 'Telegram MCP Server & Client' }
    }],
    technologies: ['nestjs', 'typescript', 'api', 'docker', 'mcp', 'mistral-ai', 'agentic'],
    category: 'personnel',
    github: 'https://github.com/Bigchef-dev/telegram-mcp-client'
  },
  {
    id: 6,
    title: 'Bio4T - Embedding Search System',
    description: 'Système de recherche d\'embedding avec génération augmentée afin d\'annoter une tâche décrite afin de d\'améliorer les requêtes à un outil de veille scientifique.',
    fullDescription: `Réalisé durant mon Master 1, ce projet de recherche avait pour objectif de développer un système de recherche d'embeddings avec génération augmentée pour améliorer les requêtes à un outil de veille scientifique. Le projet a été conçu pour permettre aux chercheurs de trouver plus efficacement des techniques en bioinformatique.`,
    fullDescriptionEn: `Completed during my Master 1, this research project aimed to develop an embedding search system with augmented generation to improve queries to a scientific watch tool. The project was designed to help researchers find bioinformatics techniques more efficiently.`,
    images: [{
      src: '/src/assets/projects/bio4t/bio4t.png',
      alt: { fr: 'Bio4T - Interface de recherche d\'embeddings', en: 'Bio4T - Embedding search interface' }
    }],
    technologies: ['python', 'api', 'docker', 'mistral-ai', 'rag', 'neo4j'],
    category: 'universitaire'
  },
  {
    id: 8,
    title: 'Analyse d\'occupation des salles pour du marketing direct',
    description: 'Analyse d\'occupation des salles de cours pour optimiser les campagnes de marketing direct.',
    fullDescription: `
Je vais lire package.json, readme.md et index.ts pour extraire le stack et les fonctionnalités principales.

Read [](file:///c%3A/Users/mathe/Documents/repos/jamphi/package.json)

Read [](file:///c%3A/Users/mathe/Documents/repos/jamphi/readme.md)

Read [](file:///c%3A/Users/mathe/Documents/repos/jamphi/index.ts)
- **Projet :** Bot Telegram de planification et d'analyse d'occupation des salles universitaires (gestion de calendriers, exports ICS, rapports d'amphi et passages).  
- **Rôle / responsabilités typiques :** intégration de calendriers, parsing ICS, génération de rapports par promotion, commandes d'administration Telegram, mises à jour périodiques (cron), persistence MongoDB.  
- **Stack technique :** Node.js + TypeScript, \`telegraf\` (bot Telegram), \`mongoose\` / MongoDB, parsing ICS (\`ics\`), \`pino\` logging, \`jest\` pour les tests.  
- **Dev / CI / run :** scripts TypeScript (\`tsx\`, \`ts-node\`), \`Docker\` / \`docker-compose\` présents, gitlab-ci.yml, gestion des dépendances via npm/pnpm.  
- **Tests & qualité :** suite de tests Jest, configuration ESLint, usage de \`mongodb-memory-server\` pour tests d'intégration.  
- **Points notables / livrables :** architecture modulaire (répertoires controllers, commands, components, \`updater\`), exemples de données dans data, scénarios de test dans tests et fichiers ICS d'exemple dans files.  
- **How to run (extrait) :** installer deps puis \`npm start\` (entrée : index.ts) — voir readme.md pour détails.

Fichiers utiles à citer : package.json, readme.md, index.ts, telegram.ts, calendarUpdater.ts.

Souhaitez‑vous que je transforme ce résumé en une entrée prête pour LinkedIn / GitHub Pages (texte court + 2 phrases d'accroche) ?`,
    fullDescriptionEn: `
Read [](file:///c%3A/Users/mathe/Documents/repos/jamphi/package.json)

Read [](file:///c%3A/Users/mathe/Documents/repos/jamphi/readme.md)

Read [](file:///c%3A/Users/mathe/Documents/repos/jamphi/index.ts)`,
    images: [{
      src: '/src/assets/projects/jamphi/amphis.png',
      alt: { fr: 'Analyse d\'occupation des salles d\'amphi', en: 'Amphitheater occupancy analysis' }
    }, {
      src: '/src/assets/projects/jamphi/entrees.png',
      alt: { fr: 'Analyse des passages dans les salles de cours', en: 'Classroom traffic analysis' }
    }, {
      src: '/src/assets/projects/jamphi/exel.png',
      alt: { fr: 'Exel pour impression', en: 'Excel export for printing' }
    }],
    technologies: ['typescript'],
    gitlab: 'https://gitlab.com/BigChef_/jamphi',
    category: 'associatif'
  },
  {
    id: 9,
    title: 'Plateforme de Phoning',
    description: 'Développement d\'une plateforme de phoning avec gestion de concurrence',
    fullDescription: `Développement d'une plateforme de phoning pour une association, avec gestion de la concurrence et des campagnes de communication. Le projet a été réalisé en collaboration avec une équipe de bénévoles, et a permis d'améliorer significativement l'efficacité des campagnes de phoning grâce à une interface intuitive et des fonctionnalités avancées de gestion des contacts et des scripts d'appel.`,
    fullDescriptionEn: `Development of a phoning platform for an association, with concurrency management and communication campaigns. The project was carried out in collaboration with a team of volunteers, and significantly improved the efficiency of phoning campaigns through an intuitive interface and advanced contact management and call script features.`,
    images: [{
      src: '/src/assets/projects/phone/interface.png',
      alt: { fr: 'Interface utilisateur de la plateforme', en: 'Platform user interface' }
    }, {
      src: '/src/assets/projects/phone/queues.png',
      alt: { fr: 'Gestion des files d\'attente pour les appels', en: 'Call queue management' }
    }],
    technologies: ['typescript', 'docker', 'api', 'nestjs'],
    category: 'associatif',
    gitlab: 'https://gitlab.com/BigChef_/phone'
  }
] satisfies Project[];

/**
 * Liste des projets avec chemins d'assets résolus pour la production
 */
export const projects: Project[] = rawProjects.map((project) => ({
  ...project,
  images: project.images.map((image) => ({
    ...image,
    src: resolveAssetUrl(image.src),
  })),
}));