import React from 'react';
import { useInView } from 'react-intersection-observer';

const Feature = ({ title, description, colorIndex }) => {
  const { ref, inView } = useInView({
    triggerOnce: false, // To re-trigger animations on re-enter
    threshold: 0.5      // At least half the element must be visible to trigger
  });

  return (
    <>
      <div ref={ref} style={{ textAlign: 'left' }}>
        <h2 className={`transition-all duration-100 ease-in-out ${inView ? 'slide-in-left' : 'slide-out-right'} p-2 text-2xl font-productsans font-bold`}>
          {title.split(" ").map((word, index) => (
            <span key={index} style={{ color: index === colorIndex ? '#ff9f1c' : 'white' }}>
              {word}{' '}
            </span>
          ))}
        </h2>
        <p className={`transition-all duration-100 ease-in-out text-white ${inView ? 'slide-in-left' : 'slide-out-right'} p-3 pb-4 pr-10 text-justify text-lg font-productsans font-regular`}>
          {description}
        </p>
      </div>
    </>
  );
};

export default Feature;
