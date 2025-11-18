import React from "react";
import InteractiveText from "./InteractiveText";

interface HeroProps {
  mousePos: { x: number; y: number };
  onHoverChange: (isHovering: boolean) => void;
  visible: boolean;
}

const Hero: React.FC<HeroProps> = ({ mousePos, onHoverChange, visible }) => {
  return (
    <main
      id="home"
      className={`relative flex flex-col items-center justify-center min-h-screen p-8 transition-opacity duration-1000 ease-in ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className="absolute top-8 right-8 z-20 animate-slide-down"
        style={{ animationDelay: "1.0s", opacity: 0 }}
      >
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => onHoverChange(true)}
          onMouseLeave={() => onHoverChange(false)}
          className="inline-block bg-white/10 border border-white/20 text-white font-bold tracking-widest uppercase rounded-full px-8 py-3 text-sm transition-all duration-300 hover:bg-white/20 hover:border-white/40"
        >
          Resume
        </a>
      </div>

      <div className="text-center z-10">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold font-orbitron uppercase leading-none tracking-tighter text-white">
          <span
            className="block animate-slide-up"
            style={{ animationDelay: "0.2s", opacity: 0 }}
          >
            <InteractiveText text="Mouad" mousePos={mousePos} />
          </span>
          <span
            className="block animate-slide-up"
            style={{ animationDelay: "0.4s", opacity: 0 }}
          >
            <InteractiveText text="Abbassid" mousePos={mousePos} />
          </span>
        </h1>
        <p
          className="text-sm md:text-base font-light tracking-[0.3em] uppercase mt-4 text-gray-300 animate-slide-up"
          style={{ animationDelay: "0.6s", opacity: 0 }}
        >
          Creative Developer & Digital Artist
        </p>
      </div>

      <div className="absolute bottom-10 z-10">
        <div className="h-0.5 bg-white animate-line-draw"></div>
      </div>
    </main>
  );
};

export default Hero;
