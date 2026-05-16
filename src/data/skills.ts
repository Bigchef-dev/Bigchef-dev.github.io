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
    color: 'from-teal-500/20 to-teal-500/10',
    border: 'border-teal-300',
  },
  nodejs: {
    name: 'Node.js',
    color: 'from-teal-500/20 to-teal-500/10',
    border: 'border-teal-300',
  },
  langchain: {
    name: 'LangChain',
    color: 'from-teal-500/20 to-teal-500/10',
    border: 'border-teal-300',
  },
  postgresql: {
    name: 'PostgreSQL',
    color: 'from-teal-500/20 to-teal-500/10',
    border: 'border-teal-300',
  },
  websocket: {
    name: 'WebSocket',
    color: 'from-teal-500/20 to-teal-500/10',
    border: 'border-teal-300',
  },
  python: {
    name: 'Python',
    color: 'from-teal-500/20 to-teal-500/10',
    border: 'border-teal-300',
  },
  docker: {
    name: 'Docker',
    color: 'from-teal-500/20 to-teal-500/10',
    border: 'border-teal-300',
  },
  mongodb: {
    name: 'MongoDB',
    color: 'from-teal-500/20 to-teal-500/10',
    border: 'border-teal-300',
  },
  aws: {
    name: 'AWS',
    color: 'from-teal-500/20 to-teal-500/10',
    border: 'border-teal-300',
  },
  grafana: {
    name: 'Grafana',
    color: 'from-teal-500/20 to-teal-500/10',
    border: 'border-teal-300',
  },
  typescript: {
    name: 'TypeScript',
    color: 'from-teal-500/20 to-teal-500/10',
    border: 'border-teal-300',
  },
  api: {
    name: 'API Rest',
    color: 'from-teal-500/20 to-teal-500/10',
    border: 'border-teal-300',
  },
  vue: {
    name: 'Vue',
    color: 'from-teal-500/20 to-teal-500/10',
    border: 'border-teal-300',
  },
  queues: {
    name: 'Message Queues',
    color: 'from-teal-500/20 to-teal-500/10',
    border: 'border-teal-300',
  },
  nestjs: {
    name: 'NestJS',
    color: 'from-teal-500/20 to-teal-500/10',
    border: 'border-teal-300',
  },
  sql: {
    name: 'MySQL',
    color: 'from-teal-500/20 to-teal-500/10',
    border: 'border-teal-300',
  },
  orm: {
    name: 'TypeORM',
    color: 'from-teal-500/20 to-teal-500/10',
    border: 'border-teal-300',
  },
  auth: {
    name: 'Auth & Security',
    color: 'from-teal-500/20 to-teal-500/10',
    border: 'border-teal-300',
  },
  'mistral-ai': {
    name: 'Mistral AI',
    color: 'from-teal-500/20 to-teal-500/10',
    border: 'border-teal-300',
  },
  mcp: {
    name: 'MCP',
    color: 'from-teal-500/20 to-teal-500/10',
    border: 'border-teal-300',
  },
  rag: {
    name: 'RAG',
    color: 'from-teal-500/20 to-teal-500/10',
    border: 'border-teal-300',
  },
  agentic: {
    name: 'Agentic',
    color: 'from-teal-500/20 to-teal-500/10',
    border: 'border-teal-300',
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
