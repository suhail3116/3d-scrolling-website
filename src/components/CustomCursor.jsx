import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [ringPos, setRingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });

      // Check if target is clickable
      const target = e.target;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('.hotspot-pin') ||
        target.closest('.interactive-hover')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId;
    let rx = -100;
    let ry = -100;

    const animLoop = () => {
      setPos((currentPos) => {
        rx += (currentPos.x - rx) * 0.15;
        ry += (currentPos.y - ry) * 0.15;
        setRingPos({ x: rx, y: ry });
        return currentPos;
      });
      animationFrameId = requestAnimationFrame(animLoop);
    };

    animationFrameId = requestAnimationFrame(animLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={isHovered ? 'cursor-hover' : ''}>
      <div
        className="custom-cursor-dot"
        style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
      />
      <div
        className="custom-cursor-ring"
        style={{ left: `${ringPos.x}px`, top: `${ringPos.y}px` }}
      />
    </div>
  );
}
