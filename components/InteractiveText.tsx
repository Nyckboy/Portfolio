
import React, { useRef, useState, useEffect } from 'react';

interface InteractiveTextProps {
  text: string;
  mousePos: { x: number; y: number };
}

interface CharPosition {
  centerX: number;
  centerY: number;
}

const InteractiveText: React.FC<InteractiveTextProps> = ({ text, mousePos }) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  // Cache the initial positions of each character to avoid repeated DOM measurements.
  const [charPositions, setCharPositions] = useState<CharPosition[]>([]);

  // Calculate character positions once after the initial render.
  useEffect(() => {
    if (containerRef.current) {
      const positions = Array.from(containerRef.current.children).map((child) => {
        // FIX: Cast child to Element to fix TypeScript error where it was inferred as 'unknown'.
        const rect = (child as Element).getBoundingClientRect();
        return {
          centerX: rect.left + rect.width / 2,
          centerY: rect.top + rect.height / 2,
        };
      });
      setCharPositions(positions);
    }
  }, [text]); // Recalculate if text changes.

  return (
    <span ref={containerRef} className="inline-block">
      {text.split('').map((char, index) => {
        let x = 0;
        let y = 0;

        const pos = charPositions[index];
        if (pos) {
          const dx = mousePos.x - pos.centerX;
          const dy = mousePos.y - pos.centerY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const influenceRadius = 100;
          const maxDisplacement = 20;

          if (distance < influenceRadius) {
            const force = Math.max(0, 1 - distance / influenceRadius);
            const angle = Math.atan2(dy, dx);
            x = -Math.cos(angle) * force * maxDisplacement;
            y = -Math.sin(angle) * force * maxDisplacement;
          }
        }
        
        return (
          <span
            key={`${char}-${index}`}
            className="inline-block transition-transform duration-300 ease-out"
            style={{ transform: `translate(${x}px, ${y}px)` }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        );
      })}
    </span>
  );
};

export default InteractiveText;
