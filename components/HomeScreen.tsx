import React, { useState, useEffect } from "react";
import WorkTogether from "./WorkTogether";
import SideElements from "./SideElements";
import AboutMe from "./AboutMe";
import Projects from "./Projects";
import Footer from "./Footer";
import Hero from "./Hero";

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

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", handleMouseMove);
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
        style={{ ...ballStyle, width: "32px", height: "32px" }}
      ></div>

      <SideElements visible={visible} />

      <Hero
        visible={visible}
        mousePos={mousePos}
        onHoverChange={handleInteractiveHover}
      />
      <AboutMe />

      <Projects onCardHover={handleInteractiveHover} />

      <WorkTogether onButtonHover={handleInteractiveHover} />

      <Footer />
    </>
  );
};

export default HomeScreen;
