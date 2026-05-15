import { useState, useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { Globe } from 'lucide-react';

const NAV_ITEMS = ['contact', 'timeline', 'projects'] as const;

export function Header() {
  const { t, language, setLanguage } = useLanguage();
  const [activeSection, setActiveSection] = useState('contact');

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => scrollTo('contact')} className="text-2xl font-black text-teal-600 hover:opacity-80 transition-opacity">
          M.
        </button>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          {NAV_ITEMS.map((section) => (
            <button
              key={section}
              onClick={() => scrollTo(section)}
              className={`transition-colors font-medium ${
                activeSection === section
                  ? 'text-teal-600'
                  : 'text-gray-600 hover:text-teal-600'
              }`}
            >
              {t(`nav.${section}`)}
            </button>
          ))}

          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 hover:border-teal-400 text-sm font-semibold text-gray-700 hover:text-teal-600 transition-all"
          >
            <Globe size={16} />
            {language.toUpperCase()}
          </button>
        </div>
      </nav>
    </header>
  );
}
