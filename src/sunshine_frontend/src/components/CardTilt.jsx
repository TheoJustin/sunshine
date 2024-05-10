"use client";

import { cn } from "./../components/util/cn";

import React, {
  createContext,
  useState,
  useContext,
  useRef,
  useEffect,
} from "react";
import PropTypes from 'prop-types';

const MouseEnterContext = createContext();

export const CardContainer = ({
  children,
  className,
  containerClassName,
}) => {
  const containerRef = useRef(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  };

  const handleMouseEnter = (e) => {
    setIsMouseEntered(true);
  };

  const handleMouseLeave = (e) => {
    setIsMouseEntered(false);
    containerRef.current.style.transform = "rotateY(0deg) rotateX(0deg)";
  };

  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div
        className={cn("py-20 flex items-center justify-center", containerClassName)}
        style={{ perspective: "1000px" }}
      >
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={cn("flex items-center justify-center relative transition-all duration-200 ease-linear", className)}
          style={{ transformStyle: "preserve-3d" }}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
};

CardContainer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  containerClassName: PropTypes.string,
};

export const CardBody = ({ children, className }) => {
  return (
    <div
      className={cn("h-96 w-96 [transform-style:preserve-3d]  [&>*]:[transform-style:preserve-3d]", className)}
    >
      {children}
    </div>
  );
};

CardBody.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export const CardItem = ({
  as: Tag = "div",
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}) => {
  const ref = useRef(null);
  const [isMouseEntered] = useMouseEnter();

  useEffect(() => {
    ref.current.style.transform = isMouseEntered ? `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)` : "translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)";
  }, [isMouseEntered, translateX, translateY, translateZ, rotateX, rotateY, rotateZ]);

  return (
    <Tag ref={ref} className={cn("w-fit transition duration-200 ease-linear", className)} {...rest}>
      {children}
    </Tag>
  );
};

CardItem.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  translateX: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  translateY: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  translateZ: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  rotateX: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  rotateY: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  rotateZ: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

// Create a hook to use the context
export const useMouseEnter = () => {
  const context = useContext(MouseEnterContext);
  if (context === undefined) {
    throw new Error("useMouseEnter must be used within a MouseEnterProvider");
  }
  return context;
};
