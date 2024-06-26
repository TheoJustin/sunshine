import React, { useEffect, useState } from 'react';
import logo from "../../../../assets/Logo_Sunshine-removebg.png"

export default function PhotoTilt() {
  const [rotation, setRotation] = useState({ rotateX: 0, rotateY: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = event.clientX - window.innerWidth / 2;
      const y = event.clientY - window.innerHeight / 2;
      const offsetX = (x / (window.innerWidth / 2)) * 45;
      const offsetY = (y / (window.innerHeight / 2)) * 45;

      setRotation({
        rotateX: Math.max(-45, Math.min(45, offsetX)),
        rotateY: Math.max(-45, Math.min(45, -offsetY))
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="flex items-center justify-center">
      <pre
        className="p-8 rounded-lg shadow-lg relative transform-gpu cursor-pointer bg-orange-custom"
        style={{
          transform: `perspective(5000px) rotateY(${rotation.rotateX}deg) rotateX(${rotation.rotateY}deg)`,
          transformStyle: 'preserve-3d',
          borderRadius: '50%'
        }}>
          <div style={{backgroundColor: '#ffffff', borderRadius: '50%'}}>
            <img src={logo} className='w-48' alt="Sunshine Logo"/>

          </div>
      </pre>
    </div>
  );
}
