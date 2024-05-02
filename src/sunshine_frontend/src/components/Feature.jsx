import React from 'react';
import { useInView } from 'react-intersection-observer';

const Feature = ({ title, description }) => {
  const { ref, inView } = useInView({
    triggerOnce: false, // To re-trigger animations on re-enter
    threshold: 0.5      // At least half the element must be visible to trigger
  });

  return (
    <>
    <div ref={ref} style={{ textAlign: 'left' }}>
    <h2 className={`transition-all duration-100 ease-in-out text-white ${inView ? 'slide-in-left' : 'slide-out-right'} p-2 text-xl font-productsans font-bold`}>
        {title}
    </h2>
    <p className={`transition-all duration-100 ease-in-out text-white ${inView ? 'slide-in-left' : 'slide-out-right'} p-2 pb-4 text-lg font-productsans font-regular`}>
        {description}
    </p>
    </div>
    </>
  );
};

export default Feature;
