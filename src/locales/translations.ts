export const translations = {
  en: {
    nav: {
      home: 'Home',
      timeline: 'Timeline',
      projects: 'Projects',
      contact: 'Contact',
    },
    hero: {
      name: 'Mathéo',
      title: 'Software Engineer & AI Researcher',
      tagline: 'Building AI-Powered Solutions for Real-World Impact',
      location: 'Rennes, Montpellier, France',
      affiliation: 'Rennes University',
      cta_projects: 'View My Work ↓',
      cta_resume: 'Resume',
      cta_contact: 'Contact',
    },
    timeline: {
      subtitle: 'My academic and professional journey',
      entries: {
        '1': {
          title: 'Master in Artificial Intelligence',
          company: 'Carnegie Mellon University Africa',
          description: 'Specialization in NLP and Computer Vision. Research on language models and reinforcement learning.',
        },
        '2': {
          title: 'Fullstack Engineer',
          company: 'TechCorp Solutions',
          description: 'Development of web and AI applications. Microservices architecture with Node.js and React.',
        },
        '3': {
          title: 'Bachelor in Computer Science',
          company: 'Rennes University',
          description: 'Fundamental training in computer science, algorithms, and software development.',
        },
        '4': {
          title: 'Junior Developer',
          company: 'StartupAI',
          description: 'Development of chatbots and virtual assistants with LangChain and OpenAI.',
        },
      },
    },
    projects: {
      title: 'My Projects',
      description: 'Discover my latest projects combining fullstack and artificial intelligence',
      filters: {
        all: 'All',
        professionnel: 'Professional',
        personnel: 'Personal',
        universitaire: 'Academic',
        associatif: 'Community',
      },
    },
    contact: {
      title: "Let's connect",
      description: 'Feel free to reach out to discuss your projects',
      form: {
        name: 'Name',
        email: 'Email',
        message: 'Message',
        submit: 'Send',
        sending: 'Sending...',
        success: 'Message sent successfully!',
        error: 'An error occurred',
      },
    },
    footer: {
      copyright: '© 2026 Mathieu. All rights reserved.',
    },
  },
  fr: {
    nav: {
      home: 'Accueil',
      timeline: 'Parcours',
      projects: 'Projets',
      contact: 'Contact',
    },
    hero: {
      name: 'Mathieu',
      title: 'Software Engineer & AI Researcher',
      tagline: "Créer des solutions basées sur l'IA pour un impact dans le monde réel",
      location: 'Rennes, Montpellier, France',
      affiliation: 'Carnegie Mellon University Africa',
      cta_projects: 'Voir mon travail ↓',
      cta_resume: 'CV',
      cta_contact: 'Contact',
    },
    timeline: {
      subtitle: 'Mon parcours académique et professionnel',
      entries: {
        '1': {
          title: 'Master en Intelligence Artificielle',
          company: 'Carnegie Mellon University Africa',
          description: 'Spécialisation en NLP et Computer Vision. Recherche sur les modèles de langage et l\'apprentissage par renforcement.',
        },
        '2': {
          title: 'Ingénieur Fullstack',
          company: 'TechCorp Solutions',
          description: 'Développement d\'applications web et IA. Architecture microservices avec Node.js et React.',
        },
        '3': {
          title: 'Licence en Informatique',
          company: 'Rennes University',
          description: 'Formation fondamentale en informatique, algorithmique et développement logiciel.',
        },
        '4': {
          title: 'Développeur Junior',
          company: 'StartupAI',
          description: 'Développement de chatbots et assistants virtuels avec LangChain et OpenAI.',
        },
      },
    },
    projects: {
      title: 'Mes Projets',
      description: 'Découvrez mes derniers projets combinant fullstack et intelligence artificielle',
      filters: {
        all: 'Tous',
        professionnel: 'Professionnel',
        personnel: 'Personnel',
        universitaire: 'Universitaire',
        associatif: 'Associatif',
      },
    },
    contact: {
      title: 'Prenons contact',
      description: "N'hésitez pas à me contacter pour discuter de vos projets",
      form: {
        name: 'Nom',
        email: 'Email',
        message: 'Message',
        submit: 'Envoyer',
        sending: 'Envoi en cours...',
        success: 'Message envoyé avec succès!',
        error: "Une erreur s'est produite",
      },
    },
    footer: {
      copyright: '© 2026 Mathieu. Tous droits réservés.',
    },
  },
} as const;

export type Translations = typeof translations;
export type Language = keyof Translations;

// Recursive type to generate all dot-notation paths that lead to string values
type DotJoin<T, P extends string> = T extends Record<string, unknown>
  ? { [K in keyof T & string]: T[K] extends string ? `${P}${K}` : DotJoin<T[K], `${P}${K}.`> }[keyof T & string]
  : never;

export type TranslationKeys = DotJoin<typeof translations.en, ''>;
