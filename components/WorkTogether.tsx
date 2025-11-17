import React, { useState, useEffect, useRef } from "react";

interface WorkTogetherProps {
  onButtonHover: (isHovering: boolean) => void;
}

const WorkTogether: React.FC<WorkTogetherProps> = ({ onButtonHover }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [buttonTransform, setButtonTransform] = useState({
    x: 0,
    y: 0,
    scale: 1,
  });

  const sectionRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  // Use refs to store latest mouse position and transform values to avoid re-renders and stale closures in the animation loop.
  const mousePosRef = useRef({ x: 0, y: 0 });
  const targetTransformRef = useRef({ x: 0, y: 0 });
  const currentTransformRef = useRef({ x: 0, y: 0 });

  // IntersectionObserver to trigger the component's entrance animation.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
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

  // Main animation loop effect.
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mousePosRef.current = { x: event.clientX, y: event.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);

    let animationFrameId: number;
    const animateButton = () => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = mousePosRef.current.x - centerX;
        const dy = mousePosRef.current.y - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const influenceRadius = 150;
        const maxDisplacement = 25;

        // Calculate magnetic pull if mouse is within radius and not hovering directly over.
        if (distance < influenceRadius && !isHovered) {
          const force = Math.max(0, 1 - distance / influenceRadius);
          const angle = Math.atan2(dy, dx);
          targetTransformRef.current = {
            x: -Math.cos(angle) * force * maxDisplacement,
            y: -Math.sin(angle) * force * maxDisplacement,
          };
        } else {
          targetTransformRef.current = { x: 0, y: 0 };
        }
      }

      // Apply smoothing (lerp) to the button's movement.
      const current = currentTransformRef.current;
      const target = targetTransformRef.current;
      current.x += (target.x - current.x) * 0.1;
      current.y += (target.y - current.y) * 0.1;

      setButtonTransform({
        x: current.x,
        y: current.y,
        scale: isHovered ? 1.05 : 1,
      });

      animationFrameId = requestAnimationFrame(animateButton);
    };

    animationFrameId = requestAnimationFrame(animateButton);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered]); // Rerun effect only when hover state changes.

  const handleMouseEnter = () => {
    setIsHovered(true);
    onButtonHover(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onButtonHover(false);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="min-h-screen flex flex-col items-center justify-center p-8 text-white text-center"
    >
      <div
        className={`transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
      >
        <h2
          className="text-4xl md:text-6xl font-bold font-space-grotesk uppercase tracking-tighter mb-6 animate-slide-up"
          style={{ opacity: isVisible ? 1 : 0, animationDelay: "0.2s" }}
        >
          Have a Project in Mind?
        </h2>
        <p
          className="max-w-2xl text-base md:text-lg font-light text-gray-300 mb-10 tracking-wide animate-slide-up font-space-grotesk"
          style={{ opacity: isVisible ? 1 : 0, animationDelay: "0.4s" }}
        >
          I'm a passionate full-stack developer, ready to transform your ideas
          into stunning, high-performance web applications. Let's build
          something extraordinary together.
        </p>
        <div
          className="relative inline-block animate-slide-up"
          style={{ opacity: isVisible ? 1 : 0, animationDelay: "0.6s" }}
        >
          <a
            ref={buttonRef}
            href="mailto:abasside1234@gmail.com"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative z-10 inline-block bg-white/10 border border-white/20 text-white font-bold tracking-widest uppercase rounded-full px-10 py-4 text-sm transition-all duration-300 hover:bg-white/20 hover:border-white/40"
            style={{
              transform: `translate(${buttonTransform.x}px, ${buttonTransform.y}px) scale(${buttonTransform.scale})`,
            }}
          >
            Get In Touch
          </a>
          <div
            className={`absolute top-0 left-0 w-full h-full bg-white/10 rounded-full transition-all duration-300 ease-out pointer-events-none ${isHovered ? "scale-125 opacity-100" : "scale-100 opacity-0"}`}
            style={{ filter: "blur(15px)" }}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default WorkTogether;

