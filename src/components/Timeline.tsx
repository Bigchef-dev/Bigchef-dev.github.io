import { useState } from 'react';
import { GraduationCap, Briefcase } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { timelineData, type TimelineEntry } from '../data/timeline';
import type { TranslationKeys } from '../locales/translations';

function TimelineEntryCard({ entry }: { entry: TimelineEntry }) {
  const [imgError, setImgError] = useState(false);
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
            alt={t(entry.companyKey as TranslationKeys)}
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
          {t(entry.titleKey as TranslationKeys)}
        </h3>
        <p className="text-sm font-medium text-teal-600 mb-2">
          {t(entry.companyKey as TranslationKeys)}
        </p>
        <p className="text-sm text-gray-600 leading-relaxed">
          {t(entry.descriptionKey as TranslationKeys)}
        </p>
      </div>
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
