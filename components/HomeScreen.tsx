
import React, { useState, useEffect } from 'react';
import WorkTogether from './WorkTogether';
import SideElements from './SideElements';
import InteractiveText from './InteractiveText';
import AboutMe from './AboutMe';
import Projects from './Projects';
import Footer from './Footer';

const HomeScreen: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [cursorVisible, setCursorVisible] = useState(true);
  
  useEffect(() => {
    // A small delay to ensure the main component is mounted before starting animations.
    const timer = setTimeout(() => setVisible(true), 100);

    const handleMouseMove = (event: MouseEvent) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleInteractiveHover = (isHovering: boolean) => {
    setCursorVisible(!isHovering);
  };

  const ballStyle: React.CSSProperties = {
    transform: `translate(${mousePos.x}px, ${mousePos.y}px) translate(-50%, -50%) scale(${cursorVisible ? 1 : 0})`,
    opacity: cursorVisible ? 1 : 0,
  };
  
  return (
    <>
      <div
        id="ball"
        className="fixed top-0 left-0 bg-white rounded-full pointer-events-none mix-blend-difference z-50 transition-all duration-300 ease-out"
        style={{...ballStyle, width: '32px', height: '32px'}}
      ></div>

      <SideElements visible={visible} />

      <main
        id="home"
        className={`relative flex flex-col items-center justify-center min-h-screen p-8 transition-opacity duration-1000 ease-in ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div 
          className="absolute top-8 right-8 z-20 animate-slide-down"
          style={{ animationDelay: '1.0s', opacity: 0 }}
        >
          <a
            href="/resume.pdf"
            download
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => handleInteractiveHover(true)}
            onMouseLeave={() => handleInteractiveHover(false)}
            className="inline-block bg-white/10 border border-white/20 text-white font-bold tracking-widest uppercase rounded-full px-8 py-3 text-sm transition-all duration-300 hover:bg-white/20 hover:border-white/40"
          >
            Resume
          </a>
        </div>

        <div className="text-center z-10">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold font-orbitron uppercase leading-none tracking-tighter text-white">
            <span className="block animate-slide-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
              <InteractiveText text="Mouad" mousePos={mousePos} />
            </span>
            <span className="block animate-slide-up" style={{ animationDelay: '0.4s', opacity: 0 }}>
              <InteractiveText text="Abbassid" mousePos={mousePos} />
            </span>
          </h1>
          <p
            className="text-sm md:text-base font-light tracking-[0.3em] uppercase mt-4 text-gray-300 animate-slide-up"
            style={{ animationDelay: '0.6s', opacity: 0 }}
          >
            Creative Developer & Digital Artist
          </p>
        </div>

        <div className="absolute bottom-10 z-10">
          <div className="h-0.5 bg-white animate-line-draw"></div>
        </div>
      </main>

      <AboutMe />

      <Projects onCardHover={handleInteractiveHover} />

      <WorkTogether onButtonHover={handleInteractiveHover} />

      <Footer />
    </>
  );
};

export default HomeScreen;