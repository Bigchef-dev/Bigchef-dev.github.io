import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { Globe } from 'lucide-react';

export function Header() {
  const { t, language, setLanguage } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-black text-teal-600 hover:opacity-80 transition-opacity">
          M.
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          <Link 
            to="/" 
            className="text-gray-600 hover:text-teal-600 transition-colors font-medium"
          >
            {t('nav.home')}
          </Link>
          <Link 
            to="/projects" 
            className="text-gray-600 hover:text-teal-600 transition-colors font-medium"
          >
            {t('nav.projects')}
          </Link>
          <Link 
            to="/contact" 
            className="text-gray-600 hover:text-teal-600 transition-colors font-medium"
          >
            {t('nav.contact')}
          </Link>

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
