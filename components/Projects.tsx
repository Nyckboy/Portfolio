import React from "react";
import ProjectCard, { Project } from "./ProjectCard";
import MobileProjectCard from "./MobileProjectCard";

interface ProjectCardProps {
  project: Project;
  onHover: (isHovering: boolean) => void;
}

const projectsData: Project[] = [
  {
    title: "HrDesk",
    description:
      "A centralized HR platform for IT-Road that lets employees request documents, leaves, and approvals directly from managers and HR—eliminating verbal requests and improving workflow transparency.",
    tech: ["React", "TypeScript", "Spring-Boot"],
    image: "/HrDesk2.png",
  },
  {
    title: "TimeSheet",
    description:
      "A web app that tracks employee work hours for IT-Road and automatically generates detailed Word-format timesheets for end-of-month payroll, streamlining HR and admin tasks.",
    tech: ["React", "TypeScript", "Spring-Boot"],
    image: "/timesheetapp.png",
  },
  {
    title: "AeroVision",
    description:
      "AeroVision is a desktop app built with Python that uses machine learning models like K-Means, Linear Regression, and Random Forest to analyze data and generate accurate predictions through a simple, intuitive interface.",
    tech: ["Python"],
    image: "/aerovison.png",
  },
  {
    title: "CandidApp",
    description:
      "A recruitment web app built with Django and React where companies post jobs, candidates apply, and both sides manage applications through a clean, user-friendly interface.",
    tech: ["Django", "React"],
    image: "/candidapp.png",
  },
];

interface ProjectsProps {
  onCardHover: (isHovering: boolean) => void;
}

const ResponsiveProject: React.FC<ProjectCardProps> = ({
  project,
  onHover,
}) => {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? (
    <MobileProjectCard project={project} onHover={onHover} />
  ) : (
    <ProjectCard project={project} onHover={onHover} />
  );
};
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
      id="pojects"
      className="min-h-screen container mx-auto px-10 lg:px-24 py-24 text-white"
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {projectsData.map((project, index) => (
            <div
              key={project.title}
              className="animate-slide-up"
              style={{
                opacity: isVisible ? 1 : 0,
                animationDelay: `${0.3 + index * 0.15}s`,
              }}
            >
              <ResponsiveProject project={project} onHover={onCardHover} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
