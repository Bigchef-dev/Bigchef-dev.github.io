import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { TechCircle } from '../components/TechCircle';
import { Button } from '../components/Button';

export function Home() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        {/* Tech Circle with name and title */}
        <TechCircle />

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Button 
            variant="primary"
            onClick={() => navigate('/projects')}
          >
            {t('hero.cta_projects')}
          </Button>
          <Button 
            variant="secondary"
            onClick={() => navigate('/contact')}
          >
            {t('hero.cta_contact')}
          </Button>
        </div>

        {/* Scroll indicator */}
        <div className="mt-20 flex flex-col items-center gap-2 text-gray-400 animate-bounce">
          <p className="text-sm font-medium">{t('nav.projects')}</p>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </div>
  );
}
