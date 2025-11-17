import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onLoaded: () => void;
}

const greetings = ["Hello.", "Welcome.", "Bonjour.", "Ciao.", "Hola."];

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoaded }) => {
  const [exiting, setExiting] = useState(false);
  const [imageVisible, setImageVisible] = useState(false);
  const [greetingIndex] = useState(
    Math.floor(Math.random() * greetings.length)
  );

  useEffect(() => {
    // Make the image visible shortly after mount to trigger fade-in
    const imageTimer = setTimeout(() => {
      setImageVisible(true);
    }, 100);

    // After a delay, trigger the exit animation
    const exitTimer = setTimeout(() => {
      setExiting(true);
      // Call onLoaded after the exit animation completes
      setTimeout(onLoaded, 1000); // This duration should match the transition-duration in className
    }, 2000); // Total time the loading screen is displayed before exiting

    return () => {
      clearTimeout(imageTimer);
      clearTimeout(exitTimer);
    };
  }, [onLoaded]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-black transition-all duration-1000 ease-in-out
        ${exiting ? 'opacity-0 -translate-y-full' : 'opacity-100 translate-y-0'}`}
    >
      <img
        src="https://picsum.photos/1920/1080?blur=5&grayscale"
        alt="Loading background"
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-2000"
        style={{ opacity: imageVisible ? 0.75 : 0 }}
      />
      <div className="z-10 text-white text-center pointer-events-none">
        <div className="font-serif-display text-5xl md:text-6xl h-24 flex items-center justify-center">
           <p className="animate-greeting">
              {greetings[greetingIndex]}
            </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
