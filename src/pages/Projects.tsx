import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useLanguage } from '../hooks/useLanguage';
import { ExternalLink, Code, X, Globe, GitBranch, ChevronLeft, ChevronRight, FileText } from 'lucide-react';
import { SKILLS_DB, projects, type Project } from '../data';
import type { TranslationKeys } from '../locales/translations';

type Category = 'associatif' | 'universitaire' | 'professionnel' | 'personnel';

const CATEGORIES: { key: 'all' | Category; labelKey: TranslationKeys; icon: string }[] = [
  { key: 'all', labelKey: 'projects.filters.all', icon: '📋' },
  { key: 'professionnel', labelKey: 'projects.filters.professionnel', icon: '💼' },
  { key: 'personnel', labelKey: 'projects.filters.personnel', icon: '🎨' },
  { key: 'universitaire', labelKey: 'projects.filters.universitaire', icon: '🎓' },
  { key: 'associatif', labelKey: 'projects.filters.associatif', icon: '🤝' },
];

const CATEGORY_BADGES: Record<Category, { label: string; icon: string }> = {
  professionnel: { label: 'Professionnel', icon: '💼' },
  personnel: { label: 'Personnel', icon: '🎨' },
  universitaire: { label: 'Universitaire', icon: '🎓' },
  associatif: { label: 'Associatif', icon: '🤝' },
};

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onImageClick: (src: string) => void;
}

function ProjectModal({ project, onClose, onImageClick }: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!project) return null;

  const { images } = project;
  const hasMultipleImages = images.length > 1;

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : prev));
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with close button */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-gray-100 bg-white/95 backdrop-blur">
          <h2 className="text-2xl font-bold text-gray-900">{project.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500"
          >
            <X size={24} />
          </button>
        </div>

        {/* Image Carousel */}
        <div className="relative w-full h-64 overflow-hidden bg-gray-100 group">
          <img
            src={images[currentImageIndex].src}
            alt={images[currentImageIndex].alt}
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => onImageClick(images[currentImageIndex].src)}
          />

          {/* Gradient overlay at bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/60 pointer-events-none" />

          {/* Image caption just above position indicator */}
          <div className="absolute bottom-12 left-0 right-0 flex items-center justify-center pointer-events-none">
            <p className="text-xs text-white font-medium px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-sm max-w-[70%] text-center truncate">
              {images[currentImageIndex].alt}
            </p>
          </div>

          {/* Navigation Chevrons */}
          {hasMultipleImages && (
            <>
              {/* Left chevron */}
              <button
                onClick={goToPrevious}
                disabled={currentImageIndex === 0}
                className={`absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-md transition-all ${
                  currentImageIndex === 0
                    ? 'opacity-30 cursor-not-allowed'
                    : 'opacity-100 hover:scale-105'
                }`}
                aria-label="Image précédente"
              >
                <ChevronLeft size={24} className="text-gray-700" />
              </button>

              {/* Right chevron */}
              <button
                onClick={goToNext}
                disabled={currentImageIndex === images.length - 1}
                className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-md transition-all ${
                  currentImageIndex === images.length - 1
                    ? 'opacity-30 cursor-not-allowed'
                    : 'opacity-100 hover:scale-105'
                }`}
                aria-label="Image suivante"
              >
                <ChevronRight size={24} className="text-gray-700" />
              </button>

              {/* Position indicator */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/50 text-white text-xs font-medium">
                {currentImageIndex + 1} / {images.length}
              </div>
            </>
          )}
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Category Badge */}
          <div className="flex gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
              {
                professionnel: 'bg-teal-50 border-teal-300 text-teal-700',
                personnel: 'bg-teal-50 border-teal-300 text-teal-700',
                universitaire: 'bg-teal-50 border-teal-300 text-teal-700',
                associatif: 'bg-teal-50 border-teal-300 text-teal-700',
              }[project.category]
            }`}>
              {CATEGORY_BADGES[project.category].icon} {CATEGORY_BADGES[project.category].label}
            </span>
          </div>

          {/* Full Description */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">À propos</h3>
            <div className="text-gray-600 leading-relaxed space-y-3">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ node, ...props }) => <h1 className="text-2xl font-bold text-gray-900 mt-6 mb-3" {...props} />,
                  h2: ({ node, ...props }) => <h2 className="text-xl font-bold text-gray-800 mt-5 mb-2" {...props} />,
                  h3: ({ node, ...props }) => <h3 className="text-lg font-semibold text-gray-700 mt-4 mb-2" {...props} />,
                  p: ({ node, ...props }) => <p className="text-gray-600 mb-3" {...props} />,
                  ul: ({ node, ...props }) => <ul className="list-disc list-inside space-y-1 mb-3 text-gray-600 text-justify" {...props} />,
                  li: ({ node, ...props }) => <li className="ml-2" {...props} />,
                  strong: ({ node, ...props }) => <strong className="text-gray-900 font-semibold" {...props} />,
                  em: ({ node, ...props }) => <em className="text-gray-700 italic" {...props} />,
                  a: ({ node, ...props }) => (
                    <a className="text-blue-600 underline hover:text-blue-800 transition-colors" target="_blank" rel="noopener noreferrer" {...props} />
                  ),
                  img: ({ node, src, alt, ...props }) => (
                    <img
                      src={src}
                      alt={alt}
                      className="rounded-lg border border-gray-200 my-2 max-w-full h-auto"
                      {...props}
                    />
                  ),
                  table: ({ node, ...props }) => (
                    <div className="overflow-x-auto my-4">
                      <table className="min-w-full border-collapse border border-gray-200 text-sm" {...props} />
                    </div>
                  ),
                  thead: ({ node, ...props }) => <thead className="bg-gray-50" {...props} />,
                  tbody: ({ node, ...props }) => <tbody {...props} />,
                  tr: ({ node, ...props }) => <tr className="border-b border-gray-200" {...props} />,
                  th: ({ node, ...props }) => <th className="px-4 py-2 text-left font-semibold text-gray-900 border border-gray-200" {...props} />,
                  td: ({ node, ...props }) => <td className="px-4 py-2 text-gray-600 border border-gray-200" {...props} />,
                }}
              >
                {project.fullDescription}
              </ReactMarkdown>
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">Technologies utilisées</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => {
                const skillInfo = SKILLS_DB[tech];
                return (
                  <div
                    key={tech}
                    className={`px-3 py-2 rounded-lg border ${skillInfo.border} bg-gradient-to-br ${skillInfo.color} text-gray-800 text-xs font-medium`}
                  >
                    {skillInfo.name}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Links */}
          <div className="space-y-3 pt-4">
            <h3 className="text-lg font-semibold text-gray-900">Liens</h3>
            <div className="flex flex-wrap gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 hover:border-teal-300 hover:bg-teal-50 text-sm font-semibold text-gray-700 hover:text-teal-600 transition-all"
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
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 hover:border-teal-300 hover:bg-teal-50 text-sm font-semibold text-gray-700 hover:text-teal-600 transition-all"
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
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 hover:border-teal-300 hover:bg-teal-50 text-sm font-semibold text-gray-700 hover:text-teal-600 transition-all"
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
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 hover:border-teal-300 hover:bg-teal-50 text-sm font-semibold text-gray-700 hover:text-teal-600 transition-all"
                >
                  <ExternalLink size={16} />
                  Demo
                </a>
              )}
              {project.files?.map((file, index) => (
                <a
                  key={index}
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 hover:border-teal-300 hover:bg-teal-50 text-sm font-semibold text-gray-700 hover:text-teal-600 transition-all"
                >
                  <FileText size={16} />
                  {file.icon && <span>{file.icon}</span>}
                  {file.label}
                </a>
              ))}
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
  const [activeCategory, setActiveCategory] = useState<'all' | Category>('all');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-gray-900 mb-4">
            {t('projects.title')}
          </h1>
          <p className="text-xl text-gray-500">
            {t('projects.description')}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                  isActive
                    ? 'bg-teal-50 border-teal-300 text-teal-700 shadow-sm'
                    : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-800'
                }`}
              >
                {cat.icon} {t(cat.labelKey)}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group cursor-pointer"
              onClick={() => {
                setSelectedProject(project);
              }}
            >
              {/* Project Image Thumbnail */}
              <div className="relative h-48 rounded-t-lg overflow-hidden mb-0">
                <img
                  src={project.images[0].src}
                  alt={project.images[0].alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent opacity-60" />
              </div>

              {/* Project Card */}
              <div className="bg-white border border-gray-200 rounded-b-lg p-6 flex flex-col h-auto shadow-sm hover:shadow-md transition-shadow overflow-hidden break-words">
                {/* Category Badge */}
                <div className="flex gap-2 mb-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${
                    {
                      professionnel: 'bg-teal-50 border-teal-300 text-teal-700',
                      personnel: 'bg-teal-50 border-teal-300 text-teal-700',
                      universitaire: 'bg-teal-50 border-teal-300 text-teal-700',
                      associatif: 'bg-teal-50 border-teal-300 text-teal-700',
                    }[project.category]
                  }`}>
                    {CATEGORY_BADGES[project.category].icon} {CATEGORY_BADGES[project.category].label}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-teal-700 mb-3 group-hover:opacity-80 transition-opacity">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4 flex-grow text-sm">
                  {project.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => {
                    const skillInfo = SKILLS_DB[tech];
                    return (
                      <span
                        key={tech}
                        className={`px-2 py-1 text-xs font-semibold rounded-full border ${skillInfo.border} bg-gradient-to-br ${skillInfo.color} text-gray-700`}
                      >
                        {skillInfo.name}
                      </span>
                    );
                  })}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 text-xs font-semibold rounded-full border border-gray-200 text-gray-500">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* View Details Button */}
                <button className="w-full px-4 py-2 rounded-lg border border-gray-200 hover:border-teal-300 hover:bg-teal-50 text-sm font-semibold text-gray-700 hover:text-teal-600 transition-all">
                  Voir les détails →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg">Aucun projet trouvé pour cette catégorie.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} onImageClick={setLightboxImage} />

      {/* Global lightbox (outside modal to overlay everything) */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-[70] bg-black/80 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 text-white/80 hover:text-white text-3xl font-light transition-colors z-10"
            aria-label="Fermer"
          >
            ✕
          </button>
          <img
            src={lightboxImage}
            alt=""
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
