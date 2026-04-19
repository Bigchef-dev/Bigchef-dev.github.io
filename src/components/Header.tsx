import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { Globe } from 'lucide-react';

export function Header() {
  const { t, language, setLanguage } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-black gradient-text hover:opacity-80 transition-opacity">
          M.
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          <Link 
            to="/" 
            className="text-white/80 hover:text-neon-cyan transition-colors font-medium"
          >
            {t('nav.home')}
          </Link>
          <Link 
            to="/projects" 
            className="text-white/80 hover:text-neon-cyan transition-colors font-medium"
          >
            {t('nav.projects')}
          </Link>
          <Link 
            to="/contact" 
            className="text-white/80 hover:text-neon-cyan transition-colors font-medium"
          >
            {t('nav.contact')}
          </Link>

          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
            className="flex items-center gap-2 px-3 py-2 rounded-lg glass-hover neon-border text-sm font-semibold hover:shadow-neon-glow transition-all"
          >
            <Globe size={16} />
            {language.toUpperCase()}
          </button>
        </div>
      </nav>
    </header>
  );
}
