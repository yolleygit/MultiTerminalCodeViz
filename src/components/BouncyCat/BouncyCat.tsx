import { useState, useEffect, useRef } from 'react';

interface BouncyCatProps {
  id: string;
  onRemove?: (id: string) => void;
}

interface Position {
  x: number;
  y: number;
}

interface Velocity {
  x: number;
  y: number;
}

export function BouncyCat({ id, onRemove }: BouncyCatProps) {
  const [position, setPosition] = useState<Position>(() => ({
    x: Math.random() * (window.innerWidth - 100),
    y: Math.random() * (window.innerHeight - 100),
  }));
  
  const [velocity, setVelocity] = useState<Velocity>(() => ({
    x: (Math.random() - 0.5) * 4 + 2, // Random speed between -2 and 4, biased toward positive
    y: (Math.random() - 0.5) * 4,
  }));

  const animationRef = useRef<number>();
  const catSize = 64; // Assumed cat GIF size

  useEffect(() => {
    const animate = () => {
      setPosition(prevPosition => {
        const newPosition = { ...prevPosition };
        
        // Update position
        newPosition.x += velocity.x;
        newPosition.y += velocity.y;
        
        // Bounce off walls
        let newVelocity = { ...velocity };
        
        // Left and right walls
        if (newPosition.x <= 0 || newPosition.x >= window.innerWidth - catSize) {
          newVelocity.x = -newVelocity.x;
          newPosition.x = Math.max(0, Math.min(newPosition.x, window.innerWidth - catSize));
        }
        
        // Top and bottom walls
        if (newPosition.y <= 0 || newPosition.y >= window.innerHeight - catSize) {
          newVelocity.y = -newVelocity.y;
          newPosition.y = Math.max(0, Math.min(newPosition.y, window.innerHeight - catSize));
        }
        
        // Update velocity if it changed
        if (newVelocity.x !== velocity.x || newVelocity.y !== velocity.y) {
          setVelocity(newVelocity);
        }
        
        return newPosition;
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [velocity]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setPosition(prevPosition => ({
        x: Math.min(prevPosition.x, window.innerWidth - catSize),
        y: Math.min(prevPosition.y, window.innerHeight - catSize),
      }));
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      className="fixed pointer-events-none"
      style={{
        left: position.x,
        top: position.y,
        zIndex: 9999, // Above everything else
        transform: velocity.x < 0 ? 'scaleX(-1)' : 'scaleX(1)', // Mirror when moving left
        transition: 'transform 0.1s ease',
      }}
    >
      <img
        src="/nyancat.gif"
        alt="Bouncy cat"
        width={catSize}
        height={catSize}
        style={{
          imageRendering: 'pixelated', // Keep GIF crisp
        }}
      />
    </div>
  );
}