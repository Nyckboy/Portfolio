import React, { useState, useEffect, useRef } from "react";

const skills = [
  "React",
  "TypeScript",
  "Node.js",
  "Java",
  "Python",
  "Docker",
  "C/C++",
];

const AboutMe: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
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
      id="about"
      className="min-h-screen flex items-center justify-center container mx-auto px-24 py-24 text-white"
    >
      <div
        className={`transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
      >
        <h2
          className="text-center text-4xl md:text-5xl font-bold font-space-grotesk uppercase tracking-tighter mb-16 animate-slide-up"
          style={{ opacity: isVisible ? 1 : 0, animationDelay: "0.1s" }}
        >
          About Me
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
          {/* Text Content */}
          <div className="md:col-span-3 text-gray-300 font-light font-space-grotesk tracking-wide leading-relaxed">
            <p
              className="mb-6 text-lg animate-slide-up"
              style={{ opacity: isVisible ? 1 : 0, animationDelay: "0.3s" }}
            >
              Hello! I’m Mouad Abbassid, but most people call me Nyck. I’m a
              full-stack developer who loves building modern, scalable
              experiences with a strong focus on clean architecture and refined
              UI. I pick up new technologies fast, and lately I’ve been diving
              deep into the React ecosystem.
            </p>
            <p
              className="mb-8 text-lg animate-slide-up"
              style={{ opacity: isVisible ? 1 : 0, animationDelay: "0.4s" }}
            >
              I enjoy solving problems, breaking complex ideas into simple
              systems, and writing code that stays clean no matter how big the
              project grows. Outside of development, you’ll probably find me
              drawing or reading manhwa — two things that fuel my creativity and
              shape how I approach design and user experience.
            </p>

            <div
              className="animate-slide-up"
              style={{ opacity: isVisible ? 1 : 0, animationDelay: "0.5s" }}
            >
              <p className="mb-4 text-white">
                Here are a few technologies I've been working with recently:
              </p>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
                {skills.map((skill) => (
                  <li
                    key={skill}
                    className="relative pl-5 before:content-['▹'] before:absolute before:left-0 before:text-white"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Image */}
          <div
            className="md:col-span-2 relative flex items-center justify-center animate-slide-up"
            style={{ opacity: isVisible ? 1 : 0, animationDelay: "0.6s" }}
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 group">
              <div className="absolute inset-0 rounded-lg bg-white/10 border border-white/20 transition-transform duration-300 ease-out group-hover:translate-x-2 group-hover:-translate-y-2"></div>
              <img
                src="/killua.jpeg"
                alt="Portrait of Mouad Abbassid"
                className="absolute inset-0 w-full h-full object-cover rounded-lg grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
