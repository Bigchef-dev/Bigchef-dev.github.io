import {
  Code2,
  Brain,
  Database,
  Server,
  Container,
  Coffee,
} from 'lucide-react';

const technologies = [
  { name: 'Java', icon: Coffee },
  { name: 'Typescript', icon: Server },
  { name: 'Python', icon: Code2 },
  { name: 'LangChain', icon: Brain },
  { name: 'PostgreSQL', icon: Database },
  { name: 'Docker', icon: Container },
];

export function TechCircle() {
  return (
    <div className="relative w-80 h-80 mx-auto mb-12">
      {/* Central circle */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-black text-gray-900 mb-3">
            Mathéo Guinche
          </h1>
          <p className="text-xl text-teal-600 font-semibold">
            Fullstack & AI Engineer
          </p>
        </div>
        {/* Single thin gray ring */}
        <div className="absolute inset-2 rounded-full border border-gray-200" />
      </div>

      {/* Tech icons in circle */}
      <div className="absolute inset-0">
        {technologies.map((tech, index) => {
          const angle = (index / technologies.length) * Math.PI * 2;
          const radius = 150;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          const IconComponent = tech.icon;

          return (
            <div
              key={tech.name}
              className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
              style={{
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              }}
            >
              <IconComponent
                size={24}
                className="text-teal-500"
              />
              <p className="text-xs text-center mt-2 text-gray-500 font-medium">
                {tech.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
