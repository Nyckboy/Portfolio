import React from "react";
import ProjectCard, { Project } from "./ProjectCard";

const projectsData: Project[] = [
  {
    title: "HrDesk",
    description:
      "A centralized HR platform for IT-Road that lets employees request documents, leaves, and approvals directly from managers and HR—eliminating verbal requests and improving workflow transparency.",
    tech: ["React", "TypeScript", "Spring-Boot"],
    image:
      "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2071&auto=format&fit=crop",
  },
  {
    title: "TimeSheet",
    description:
      "A web app that tracks employee work hours for IT-Road and automatically generates detailed Word-format timesheets for end-of-month payroll, streamlining HR and admin tasks.",
    tech: ["React", "TypeScript", "Spring-Boot"],
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "AeroVision",
    description:
      "AeroVision is a desktop app built with Python that uses machine learning models like K-Means, Linear Regression, and Random Forest to analyze data and generate accurate predictions through a simple, intuitive interface.",
    tech: ["Python"],
    image:
      "https://storage.googleapis.com/aistudio-hosting/images/41c45053-5d57-4148-8424-63f53835cc99.png",
  },
  {
    title: "CandidApp",
    description:
      "A recruitment web app built with Django and React where companies post jobs, candidates apply, and both sides manage applications through a clean, user-friendly interface.",
    tech: ["Django", "React"],
    image:
      "https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=2070&auto=format&fit=crop",
  },
];

interface ProjectsProps {
  onCardHover: (isHovering: boolean) => void;
}

const Projects: React.FC<ProjectsProps> = ({ onCardHover }) => {
  const sectionRef = React.useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 },
    );

    const currentSectionRef = sectionRef.current;
    if (currentSectionRef) {
      observer.observe(currentSectionRef);
    }

    return () => {
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="phttps://www.stefanobartoletti.it/rojects"
      className="min-h-screen container mx-auto px-24 py-24 text-white"
    >
      <div
        className={`transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
      >
        <h2
          className="text-center text-4xl md:text-6xl font-bold font-space-grotesk uppercase tracking-tighter mb-16 animate-slide-up"
          style={{ opacity: isVisible ? 1 : 0, animationDelay: "0.1s" }}
        >
          Selected Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsData.map((project, index) => (
            <div
              key={project.title}
              className="animate-slide-up"
              style={{
                opacity: isVisible ? 1 : 0,
                animationDelay: `${0.3 + index * 0.15}s`,
              }}
            >
              <ProjectCard project={project} onHover={onCardHover} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

