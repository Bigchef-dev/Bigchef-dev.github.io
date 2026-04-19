import { useEffect, useState } from 'react';

export function Background() {
  const [particlesLoaded, setParticlesLoaded] = useState(false);

  useEffect(() => {
    // Dynamically import and load particles-bg
    import('particles-bg').then((ParticlesBg) => {
      setParticlesLoaded(true);
    });
  }, []);

  if (!particlesLoaded) {
    return <div className="fixed inset-0 bg-gradient-to-b from-neon-dark via-neon-dark to-slate-900" />;
  }

  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-b from-neon-dark via-neon-dark to-slate-900" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,240,255,0.1),rgba(255,107,53,0.05))]" />
      </div>
    </div>
  );
}
