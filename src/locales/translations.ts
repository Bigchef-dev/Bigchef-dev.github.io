export const translations = {
  en: {
  },
  fr: {
    nav: {
      home: 'Accueil',
      timeline: 'Parcours',
      projects: 'Projets',
      contact: 'Contact',
    },
    hero: {
      name: 'Mathéo',
      tagline: "Intégrer l'IA au cœur du logiciel pour un impact réel et immédiat",
      location: 'Rennes, Montpellier, France',
      affiliation: 'Université de Rennes',
      cta_projects: 'Voir mon travail ↓',
      cta_resume: 'CV',
      cta_contact: 'Contact',
    },
    timeline: {
      subtitle: 'Mon parcours académique et professionnel',
      entries: {
        '1': {
          title: 'Master Informatique (Ingénieurie Logicielle)',
          company: 'Université de Rennes',
          description: 'Architectures logicielles parallèles • Validation et vérification de logiciels • Génie logiciel • Gestion des données distribuées • Architecture microservices • Option Machine Learning',
        },
        '2': {
          title: 'Stagiaire Ingénieur IA',
          company: 'Orange Business',
          description: 'Analyse des besoins, conception et implémentation de **bout-en-bout** dans une infrastructure existante.\n**Réalisations :**\n- Serveur MCP\n- Automatisation de l\'audit de sécurité\n- Détection de vulnérabilités via **LLM**',
        },
        '3': {
          title: 'Stagiaire Développeur IA',
          company: 'Digitaleo',
          description: 'Développement de bout en bout d’un agent conversationnel à fort impact pour les différents services internes. Utilisation de modèles **d’embeddings (Pinecone)**. Interconnexion avec les outils existants. Intégration d’un serveur MCP. Amélioration continue en expérimentant de nouvelles techniques, fine-tuning des modèles, des stratégies de prompt engineering et l’évaluation continue via LLM-as-a-Judge.\n\n**Technologies :**\n- Modèles d\'embeddings (Pinecone)\n- Serveur MCP\n- Fine-tuning & Prompt engineering\n- Évaluation continue via LLM-as-a-Judge\n\n**Compétences :** RAG • Orchestration • Re-Ranking',
        },
        '4': {
          title: 'Licence Informatique',
          company: 'Université de Rennes',
          description: 'Programmation Objet • Programmation de confiance • Probabilités et statistiques • appliquées à l’intelligence artificielle • Réseaux et Systèmes',
        },
        '5': {
          title: 'Stagiaire Développeur Fullstack',
          company: 'SODIRA Connect',
          description: 'Stage de développement d\'une plateforme de supervision de passerelles IoT. **Backend Flask et frontend Vue3**. Implementation d\'un **auth server d\'authentification(SSO/OIDC)**. Réalisé l\’interface de l’outil de supervision : terminal de commande, édition de configuration pour machines distantes. Développement Agile',
        },
        '6': {
          title: 'Baccalauréat',
          company: 'Jeanne d\'arc Vitré',
          description: 'Mathématiques • Numérique Sciences informatiques • Sciences de l\'ingénieur.',
        },
      },
    },
    projects: {
      title: 'Mes Projets',
      description: 'Découvrez mes réalisations et projets que j\'ai contribué',
      filters: {
        all: 'Tous',
        professionnel: 'Professionnel',
        personnel: 'Personnel',
        universitaire: 'Universitaire',
        associatif: 'Associatif',
      },
    },
    footer: {
      copyright: '© 2026 Mathéo Guinche. Tous droits réservés.',
    },
  },
} as const;

export type Translations = typeof translations;
export type Language = keyof Translations;

// Recursive type to generate all dot-notation paths that lead to string values
type DotJoin<T, P extends string> = T extends Record<string, unknown>
  ? { [K in keyof T & string]: T[K] extends string ? `${P}${K}` : DotJoin<T[K], `${P}${K}.`> }[keyof T & string]
  : never;

export type TranslationKeys = DotJoin<typeof translations.fr, ''>;
