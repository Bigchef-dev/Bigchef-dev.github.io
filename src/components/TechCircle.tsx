import { 
  Code2, 
  GitBranch, 
  Zap,
  Brain,
  Database,
  Server
} from 'lucide-react';

const technologies = [
  { name: 'React', icon: Code2, color: '#00f0ff' },
  { name: 'Node.js', icon: Server, color: '#ff6b35' },
  { name: 'Python', icon: Code2, color: '#00f0ff' },
  { name: 'LangChain', icon: Brain, color: '#ff6b35' },
  { name: 'PostgreSQL', icon: Database, color: '#00f0ff' },
  { name: 'Docker', icon: GitBranch, color: '#ff6b35' },
];

export function TechCircle() {
  return (
    <div className="relative w-80 h-80 mx-auto mb-12">
      {/* Central circle */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-black gradient-text mb-3">
            Mathéo Guinche
          </h1>
          <p className="text-xl text-neon-cyan font-semibold">
            Fullstack & AI Engineer
          </p>
        </div>
        {/* Animated border circle */}
        <div className="absolute inset-0 rounded-full border-2 border-neon-cyan/30 animate-spin" style={{ animationDuration: '20s' }} />
        <div className="absolute inset-4 rounded-full border-2 border-neon-orange/30 animate-spin" style={{ animationDuration: '25s', animationDirection: 'reverse' }} />
      </div>

      {/* Tech icons in circle */}
      <div className="absolute inset-0">
        {technologies.map((tech, index) => {
          const angle = (index / technologies.length) * Math.PI * 2;
          const radius = 130;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          const IconComponent = tech.icon;
          const isOrange = tech.color === '#ff6b35';

          return (
            <div
              key={tech.name}
              className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
              style={{
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              }}
            >
              <div
                className={`p-3 rounded-full glass ${
                  isOrange ? 'neon-border-orange' : 'neon-border'
                } hover:shadow-neon-glow transition-all duration-300 animate-float group cursor-pointer`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <IconComponent
                  size={24}
                  style={{ color: tech.color }}
                  className="group-hover:scale-110 transition-transform"
                />
              </div>
              <p className="text-xs text-center mt-2 text-white/70 font-medium">
                {tech.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
