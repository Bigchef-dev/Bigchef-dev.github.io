import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { Button } from '../components/Button';
import { Mail, User, Code, ArrowRight } from 'lucide-react';

export function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    // Simulate form submission
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-2xl mx-auto px-6">
        {/* Title */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black gradient-text mb-4">
            {t('contact.title')}
          </h1>
          <p className="text-xl text-white/60">
            {t('contact.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-neon-cyan">
                {t('contact.form.name')}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg glass border border-white/10 focus:border-neon-cyan focus:outline-none focus:ring-2 focus:ring-neon-cyan/20 transition-all bg-white/5 text-white placeholder-white/30"
                placeholder="Votre nom"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-neon-cyan">
                {t('contact.form.email')}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg glass border border-white/10 focus:border-neon-cyan focus:outline-none focus:ring-2 focus:ring-neon-cyan/20 transition-all bg-white/5 text-white placeholder-white/30"
                placeholder="votre@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-neon-cyan">
                {t('contact.form.message')}
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 rounded-lg glass border border-white/10 focus:border-neon-cyan focus:outline-none focus:ring-2 focus:ring-neon-cyan/20 transition-all bg-white/5 text-white placeholder-white/30 resize-none"
                placeholder="Votre message..."
              />
            </div>

            <Button
              type="submit"
              variant="neon"
              disabled={status === 'sending'}
              className="w-full flex items-center justify-center gap-2"
            >
              {status === 'idle' && t('contact.form.submit')}
              {status === 'sending' && t('contact.form.sending')}
              {status === 'success' && t('contact.form.success')}
              {status === 'error' && t('contact.form.error')}
              <ArrowRight size={16} />
            </Button>

            {status === 'success' && (
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-sm text-center">
                ✓ {t('contact.form.success')}
              </div>
            )}
          </form>

          {/* Social Links */}
          <div className="flex flex-col justify-between">
            <div className="space-y-4 mb-8">
              <h3 className="text-xl font-bold text-neon-cyan mb-6">
                Connectez-vous
              </h3>

              <a
                href="mailto:hello@mathieu.dev"
                className="flex items-center gap-4 p-4 rounded-lg glass glass-hover neon-border hover:shadow-neon-glow transition-all group"
              >
                <Mail size={24} className="text-neon-cyan group-hover:scale-110 transition-transform" />
                <div>
                  <p className="font-semibold text-white">Email</p>
                  <p className="text-sm text-white/60">hello@mathieu.dev</p>
                </div>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-lg glass glass-hover neon-border-orange hover:shadow-neon-orange transition-all group"
              >
                <User size={24} className="text-neon-orange group-hover:scale-110 transition-transform" />
                <div>
                  <p className="font-semibold text-white">LinkedIn</p>
                  <p className="text-sm text-white/60">linkedin.com/in/mathieu</p>
                </div>
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-lg glass glass-hover neon-border hover:shadow-neon-glow transition-all group"
              >
                <Code size={24} className="text-neon-cyan group-hover:scale-110 transition-transform" />
                <div>
                  <p className="font-semibold text-white">GitHub</p>
                  <p className="text-sm text-white/60">github.com/mathieu</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
