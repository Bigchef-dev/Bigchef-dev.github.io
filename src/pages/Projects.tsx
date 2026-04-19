import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useLanguage } from '../hooks/useLanguage';
import { ExternalLink, Code, X, Globe, GitBranch } from 'lucide-react';
import { SKILLS_DB, projects, type Project, type SkillKey } from '../data';

// Données importées depuis ../data
// const projects est importé depuis '../data/projects'
// const SKILLS_DB est importé depuis '../data/skills'

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
            src={project.image.src}
            alt={project.image.alt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900" />
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Category Badge - 4 Options */}
          <div className="flex gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
              {
                professionnel: 'bg-neon-orange/10 border-neon-orange/50 text-neon-orange',
                personnel: 'bg-neon-cyan/10 border-neon-cyan/50 text-neon-cyan',
                universitaire: 'bg-purple-500/10 border-purple-500/30 text-purple-400',
                associatif: 'bg-green-500/10 border-green-500/30 text-green-400',
              }[project.category]
            }`}>
              {{
                professionnel: '💼 Professionnel',
                personnel: '🎨 Personnel',
                universitaire: '🎓 Universitaire',
                associatif: '🤝 Associatif',
              }[project.category]}
            </span>
          </div>

          {/* Full Description */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">À propos</h3>
            <div className="text-white/70 leading-relaxed space-y-3">
              <ReactMarkdown
                components={{
                  h1: ({ node, ...props }) => <h1 className="text-2xl font-bold text-white mt-6 mb-3" {...props} />,
                  h2: ({ node, ...props }) => <h2 className="text-xl font-bold text-white/90 mt-5 mb-2" {...props} />,
                  h3: ({ node, ...props }) => <h3 className="text-lg font-semibold text-white/80 mt-4 mb-2" {...props} />,
                  p: ({ node, ...props }) => <p className="text-white/70 mb-3 text-justify" {...props} />,
                  ul: ({ node, ...props }) => <ul className="list-disc list-inside space-y-1 mb-3 text-white/70 text-justify" {...props} />,
                  li: ({ node, ...props }) => <li className="ml-2" {...props} />,
                  strong: ({ node, ...props }) => <strong className="text-white font-semibold" {...props} />,
                  em: ({ node, ...props }) => <em className="text-white/80 italic" {...props} />,
                }}
              >
                {project.fullDescription}
              </ReactMarkdown>
            </div>
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
                  src={project.image.src}
                  alt={project.image.alt}
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
