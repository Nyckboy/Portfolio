
import React, { useState, useRef, useEffect } from 'react';

export interface Project {
  title: string;
  description: string;
  tech: string[];
  image: string;
}

interface ProjectCardProps {
  project: Project;
  onHover: (isHovering: boolean) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onHover }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const transformRef = useRef({ x: 0, y: 0 });
  const mousePosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    
    const currentContainerRef = containerRef.current;
    if (currentContainerRef) {
      observer.observe(currentContainerRef);
    }

    return () => {
      if (currentContainerRef) {
        observer.unobserve(currentContainerRef);
      }
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mousePosRef.current = { x: event.clientX, y: event.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;
    const animate = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = mousePosRef.current.x - centerX;
        const dy = mousePosRef.current.y - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        let targetX = 0;
        let targetY = 0;

        if (distance < 250 && !isHovered) {
          const force = 1 - distance / 250;
          targetX = dx * force * 0.15;
          targetY = dy * force * 0.15;
        }

        transformRef.current.x += (targetX - transformRef.current.x) * 0.08;
        transformRef.current.y += (targetY - transformRef.current.y) * 0.08;

        containerRef.current.style.transform = `translate(${transformRef.current.x}px, ${transformRef.current.y}px)`;
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHover(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHover(false);
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative transition-opacity duration-700 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        willChange: 'transform',
      }}
    >
      {/* Glow effect, positioned behind the card */}
      <div
        className={`absolute -inset-2 bg-white/10 rounded-2xl transition-all duration-300 ease-out pointer-events-none ${isHovered ? 'scale-110 opacity-100' : 'scale-100 opacity-0'}`}
        style={{ filter: 'blur(20px)' }}
      ></div>

      {/* The actual project card */}
      <div
        className="relative block rounded-xl transition-transform duration-500 ease-out group overflow-hidden aspect-[4/3]"
        style={{
          border: '1px solid rgba(255, 255, 255, 0.1)',
          transform: `scale(${isHovered ? 1.03 : 1})`,
        }}
      >
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-300"></div>
        
        <div className="relative p-8 h-full flex flex-col justify-end">
          <h3 className="text-2xl font-bold font-space-grotesk text-white transition-transform duration-300 ease-out group-hover:-translate-y-1">
            {project.title}
          </h3>
          
          <div className="transition-all duration-300 ease-out max-h-0 opacity-0 group-hover:max-h-screen group-hover:opacity-100 group-hover:mt-4">
            <p className="text-gray-300 font-light mb-4 font-space-grotesk leading-relaxed text-sm">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-semibold text-gray-300 bg-white/10 px-3 py-1 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
