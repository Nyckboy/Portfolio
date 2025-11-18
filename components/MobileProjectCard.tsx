import React from "react";
import { FiFolder, FiGithub, FiExternalLink } from "react-icons/fi";

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
  return (
    <div
      className="
      group 
      bg-[#111827] 
      p-6 
      rounded-lg 
      shadow-md 
      transition-transform 
      duration-300 
      hover:-translate-y-2
      hover:shadow-xl
      cursor-pointer
    "
    >
      {/* Top icons */}
      <div className="flex justify-between items-center mb-6">
        <FiFolder className="text-cyan-400" size={40} />
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-sky-500 transition">
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-gray-300 text-sm mb-4 leading-relaxed">
        {project.description}
      </p>

      {/* Tech list */}
      <div className="flex flex-wrap gap-3 text-xs text-gray-400">
        {project.tech.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;
