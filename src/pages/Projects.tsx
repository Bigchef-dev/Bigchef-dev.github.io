import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { ExternalLink, Code, X, Globe, GitBranch } from 'lucide-react';

// Définition des skills avec indexation
const SKILLS_DB = {
  react: { name: 'React', color: 'from-cyan-500/20 to-cyan-500/10', border: 'border-cyan-500/30' },
  nodejs: { name: 'Node.js', color: 'from-orange-500/20 to-orange-500/10', border: 'border-orange-500/30' },
  langchain: { name: 'LangChain', color: 'from-purple-500/20 to-purple-500/10', border: 'border-purple-500/30' },
  postgresql: { name: 'PostgreSQL', color: 'from-blue-500/20 to-blue-500/10', border: 'border-blue-500/30' },
  websocket: { name: 'WebSocket', color: 'from-green-500/20 to-green-500/10', border: 'border-green-500/30' },
  python: { name: 'Python', color: 'from-cyan-500/20 to-cyan-500/10', border: 'border-cyan-500/30' },
  docker: { name: 'Docker', color: 'from-blue-500/20 to-blue-500/10', border: 'border-blue-500/30' },
  mongodb: { name: 'MongoDB', color: 'from-green-500/20 to-green-500/10', border: 'border-green-500/30' },
  aws: { name: 'AWS', color: 'from-orange-500/20 to-orange-500/10', border: 'border-orange-500/30' },
  grafana: { name: 'Grafana', color: 'from-orange-500/20 to-orange-500/10', border: 'border-orange-500/30' },
  typescript: { name: 'TypeScript', color: 'from-blue-500/20 to-blue-500/10', border: 'border-blue-500/30' },
  fastapi: { name: 'FastAPI', color: 'from-cyan-500/20 to-cyan-500/10', border: 'border-cyan-500/30' },
} as const;

type SkillKey = keyof typeof SKILLS_DB;

interface Project {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  technologies: SkillKey[];
  github?: string;
  gitlab?: string;
  website?: string;
  demo?: string;
  category: 'professional' | 'personal';
}

const projects: Project[] = [
  {
    id: 1,
    title: 'AI Chat Assistant',
    description: 'Assistant IA conversationnel avec LangChain et OpenAI. Interface React avec streaming en temps réel.',
    fullDescription: `Un assistant IA conversationnel complet et performant.

🎯 Fonctionnalités principales:
• Streaming des réponses en temps réel
• Support du contexte conversationnel persistant
• Intégration avec OpenAI et autres LLMs
• Interface utilisateur moderne et réactive
• Historique complet de conversations
• Authentification sécurisée

🏗️ Architecture technique:
• Frontend: React avec Tailwind CSS et animations
• Backend: Node.js/Express avec WebSocket
• Base de données: PostgreSQL pour l'historique
• Déploiement: Docker sur infrastructure cloud
• Monitoring: ELK Stack pour les logs

📊 Performances:
• Temps de réponse < 200ms
• Support 1000+ utilisateurs concurrents
• Uptime 99.9%`,
    image: 'https://images.unsplash.com/photo-1677442d019cecf8d29b36b9cf5f9e6e3d5f6d9d?w=1000&q=80',
    technologies: ['react', 'nodejs', 'langchain', 'postgresql', 'websocket', 'typescript', 'docker'],
    github: 'https://github.com/mathieu/ai-chat',
    website: 'https://ai-chat-demo.vercel.app',
    category: 'personal',
  },
  {
    id: 2,
    title: 'Portfolio Analytics',
    description: 'Dashboard d\'analyse de performance avec visualisations interactive. Docker + microservices.',
    fullDescription: `Plateforme d'analytics complète pour suivre et analyser les performances.

📈 Fonctionnalités:
• Dashboards temps réel personnalisables
• Graphiques interactifs avec Chart.js
• Filtrage avancé par période et catégorie
• Export en PDF/CSV
• Système d'alertes et notifications
• Comparaison de périodes

🛠️ Stack technique:
• Frontend: React + TypeScript + Tailwind
• Backend: Python FastAPI
• Cache: Redis pour les requêtes fréquentes
• Database: PostgreSQL avec optimisations
• DevOps: Docker + Kubernetes
• Monitoring: Prometheus + Grafana

⚡ Optimisations:
• Caching agressif (Redis)
• Pagination côté serveur
• Compression des données
• CDN pour les assets statiques`,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&q=80',
    technologies: ['react', 'python', 'fastapi', 'postgresql', 'docker', 'grafana', 'typescript'],
    github: 'https://github.com/mathieu/portfolio-analytics',
    gitlab: 'https://gitlab.com/mathieu/portfolio-analytics',
    category: 'professional',
  },
  {
    id: 3,
    title: 'Real-time Collaboration App',
    description: 'Plateforme de collaboration temps réel avec sync cloud. Stack fullstack moderne.',
    fullDescription: `Application collaborative permettant à plusieurs utilisateurs de travailler ensemble en temps réel.

🤝 Fonctionnalités collaboratives:
• Synchronisation en temps réel via WebSocket
• Édition collaborative de documents
• Curseurs et présence des utilisateurs
• Versioning et historique complet
• Commentaires inline
• Partage de fichiers

☁️ Cloud & Storage:
• AWS S3 pour les fichiers
• CloudFlare CDN pour les assets
• MongoDB pour les données collaboratives
• Transactions ACID

🔒 Sécurité:
• Authentification OAuth2
• Chiffrement end-to-end
• Permissions granulaires
• Audit trail complet`,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1000&q=80',
    technologies: ['react', 'nodejs', 'websocket', 'mongodb', 'aws', 'typescript', 'docker'],
    website: 'https://collab-app.demo.com',
    category: 'personal',
  },
];

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur"
      onClick={onClose}
    >
      <div 
        className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-neon-cyan/20 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with close button */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-neon-cyan/10 bg-slate-900/95 backdrop-blur">
          <h2 className="text-2xl font-bold gradient-text">{project.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Image */}
        <div className="relative w-full h-64 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900" />
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Category Badge */}
          <div className="flex gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
              project.category === 'professional'
                ? 'bg-neon-orange/10 border-neon-orange/50 text-neon-orange'
                : 'bg-neon-cyan/10 border-neon-cyan/50 text-neon-cyan'
            }`}>
              {project.category === 'professional' ? '💼 Professionnel' : '🎨 Personnel'}
            </span>
          </div>

          {/* Full Description */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">À propos</h3>
            <p className="text-white/70 whitespace-pre-wrap leading-relaxed text-sm">
              {project.fullDescription}
            </p>
          </div>

          {/* Skills */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">Technologies utilisées</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => {
                const skillInfo = SKILLS_DB[tech];
                return (
                  <div
                    key={tech}
                    className={`px-3 py-2 rounded-lg border ${skillInfo.border} bg-gradient-to-br ${skillInfo.color} text-white text-xs font-medium`}
                  >
                    {skillInfo.name}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Links */}
          <div className="space-y-3 pt-4">
            <h3 className="text-lg font-semibold text-white">Liens</h3>
            <div className="flex flex-wrap gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg glass glass-hover neon-border text-sm font-semibold hover:shadow-neon transition-all"
                >
                  <Code size={16} />
                  GitHub
                </a>
              )}
              {project.gitlab && (
                <a
                  href={project.gitlab}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg glass glass-hover neon-border-orange text-sm font-semibold hover:shadow-neon-orange transition-all"
                >
                  <GitBranch size={16} />
                  GitLab
                </a>
              )}
              {project.website && (
                <a
                  href={project.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg glass glass-hover neon-border text-sm font-semibold hover:shadow-neon transition-all"
                >
                  <Globe size={16} />
                  Voir le site
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg glass glass-hover neon-border-orange text-sm font-semibold hover:shadow-neon-orange transition-all"
                >
                  <ExternalLink size={16} />
                  Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Title */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black gradient-text mb-4">
            {t('projects.title')}
          </h1>
          <p className="text-xl text-white/60">
            {t('projects.description')}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              {/* Project Image Thumbnail */}
              <div className="relative h-48 rounded-t-lg overflow-hidden mb-0">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60" />
              </div>

              {/* Project Card */}
              <div className="glass glass-hover neon-border p-6 rounded-b-lg flex flex-col h-auto">
                <h3 className="text-xl font-bold gradient-text mb-3 group-hover:opacity-80 transition-opacity">
                  {project.title}
                </h3>
                <p className="text-white/70 mb-4 flex-grow text-sm">
                  {project.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => {
                    const skillInfo = SKILLS_DB[tech];
                    return (
                      <span
                        key={tech}
                        className={`px-2 py-1 text-xs font-semibold rounded-full border ${skillInfo.border} bg-gradient-to-br ${skillInfo.color} text-white`}
                      >
                        {skillInfo.name}
                      </span>
                    );
                  })}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 text-xs font-semibold rounded-full glass border border-neon-cyan/30 text-neon-cyan">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* View Details Button */}
                <button className="w-full px-4 py-2 rounded-lg glass glass-hover neon-border text-sm font-semibold hover:shadow-neon transition-all">
                  Voir les détails →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}
