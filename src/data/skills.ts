/**
 * Définition centralisée des skills/technologies
 * Source unique de vérité pour toute l'application
 */

export interface SkillDefinition {
  name: string;
  color: string;
  border: string;
}

export const SKILLS_DB = {
  react: {
    name: 'React',
    color: 'from-cyan-500/20 to-cyan-500/10',
    border: 'border-cyan-500/30',
  },
  nodejs: {
    name: 'Node.js',
    color: 'from-orange-500/20 to-orange-500/10',
    border: 'border-orange-500/30',
  },
  langchain: {
    name: 'LangChain',
    color: 'from-purple-500/20 to-purple-500/10',
    border: 'border-purple-500/30',
  },
  postgresql: {
    name: 'PostgreSQL',
    color: 'from-blue-500/20 to-blue-500/10',
    border: 'border-blue-500/30',
  },
  websocket: {
    name: 'WebSocket',
    color: 'from-green-500/20 to-green-500/10',
    border: 'border-green-500/30',
  },
  python: {
    name: 'Python',
    color: 'from-cyan-500/20 to-cyan-500/10',
    border: 'border-cyan-500/30',
  },
  docker: {
    name: 'Docker',
    color: 'from-blue-500/20 to-blue-500/10',
    border: 'border-blue-500/30',
  },
  mongodb: {
    name: 'MongoDB',
    color: 'from-green-500/20 to-green-500/10',
    border: 'border-green-500/30',
  },
  aws: {
    name: 'AWS',
    color: 'from-orange-500/20 to-orange-500/10',
    border: 'border-orange-500/30',
  },
  grafana: {
    name: 'Grafana',
    color: 'from-orange-500/20 to-orange-500/10',
    border: 'border-orange-500/30',
  },
  typescript: {
    name: 'TypeScript',
    color: 'from-blue-500/20 to-blue-500/10',
    border: 'border-blue-500/30',
  },
  fastapi: {
    name: 'FastAPI',
    color: 'from-cyan-500/20 to-cyan-500/10',
    border: 'border-cyan-500/30',
  },
} as const;

export type SkillKey = keyof typeof SKILLS_DB;

/**
 * Obtenir les informations d'un skill
 */
export const getSkillInfo = (skillKey: SkillKey): SkillDefinition => {
  return SKILLS_DB[skillKey];
};

/**
 * Obtenir tous les skills disponibles
 */
export const getAllSkills = (): SkillKey[] => {
  return Object.keys(SKILLS_DB) as SkillKey[];
};
