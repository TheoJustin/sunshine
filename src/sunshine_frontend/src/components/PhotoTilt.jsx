import React, { useState, useEffect } from 'react';

export default function PhotoTilt() {
  const [rotation, setRotation] = useState({ rotateX: 0, rotateY: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = event.clientX;
      const y = event.clientY;
      const middleX = window.innerWidth / 2;
      const middleY = window.innerHeight / 2;
      const offsetX = ((x - middleX) / middleX) * 45;
      const offsetY = ((y - middleY) / middleY) * 45;
      setRotation({
        rotateX: offsetX,
        rotateY: -offsetY
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative grid grid-cols-3 grid-rows-3">
      <pre className="text-3xl font-bold text-white bg-[hsl(222,45%,7%)] p-8 rounded-lg shadow-lg relative transform-gpu"
           style={{
             transform: `perspective(5000px) rotateY(${rotation.rotateX}deg) rotateX(${rotation.rotateY}deg)`,
             transformStyle: 'preserve-3d'
           }}>
        .awesome-layouts {'{'}
          display: grid;
        {'}'}
      </pre>
    </div>
  );
}
