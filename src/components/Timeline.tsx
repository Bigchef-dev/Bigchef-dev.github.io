import { useState } from 'react';
import { GraduationCap, Briefcase } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useLanguage } from '../hooks/useLanguage';
import { timelineData, type TimelineEntry } from '../data/timeline';
import type { TranslationKeys } from '../locales/translations';

function tKey(id: number, field: 'title' | 'company' | 'description'): TranslationKeys {
  return `timeline.entries.${id}.${field}` as TranslationKeys;
}

function TimelineEntryCard({ entry }: { entry: TimelineEntry }) {
  const [imgError, setImgError] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { t } = useLanguage();

  const IconComponent = entry.type === 'education' ? GraduationCap : Briefcase;

  return (
    <div className="relative pl-14 pb-12 last:pb-0">
      {/* Vertical line */}
      <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-gray-200 last:hidden" style={{ display: 'inherit' }} />
      <div className="absolute left-[19px] top-0 h-full w-0.5 bg-gray-200 last-of-type:hidden" />

      {/* Logo circle */}
      <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center overflow-hidden shadow-sm">
        {!imgError ? (
          <img
            src={entry.logo}
            alt={t(tKey(entry.id, 'company'))}
            className="w-6 h-6 object-contain"
            onError={() => setImgError(true)}
          />
        ) : (
          <IconComponent size={18} className="text-teal-500" />
        )}
      </div>

      {/* Content card */}
      <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
        <span className="inline-block px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-semibold mb-3">
          {entry.year}
        </span>
        <h3 className="font-bold text-gray-900 text-lg mb-1">
          {t(tKey(entry.id, 'title'))}
        </h3>
        <p className="text-sm font-medium text-teal-600 mb-2">
          {t(tKey(entry.id, 'company'))}
        </p>
        <div className="text-sm text-gray-600 leading-relaxed prose prose-sm max-w-none">
          <ReactMarkdown>
            {t(tKey(entry.id, 'description'))}
          </ReactMarkdown>
        </div>
      </div>

      {/* Lightbox modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white/80 hover:text-white text-3xl font-light transition-colors"
            aria-label="Close"
          >
            ✕
          </button>
          <img
            src={selectedImage}
            alt=""
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}

export function Timeline() {
  const { t } = useLanguage();

  return (
    <section id="timeline" className="py-20">
      <div className="max-w-3xl mx-auto px-6">
        {/* Section title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-gray-900 mb-4">
            {t('nav.timeline')}
          </h2>
          <p className="text-lg text-gray-500">
            {t('timeline.subtitle')}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {timelineData.map((entry) => (
            <TimelineEntryCard key={entry.id} entry={entry} />
          ))}
        </div>
      </div>
    </section>
  );
}
