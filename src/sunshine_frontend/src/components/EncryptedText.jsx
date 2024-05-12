"use client";
import { useMotionValue } from "framer-motion";
import React, { useState, useEffect } from "react";
import { useMotionTemplate, motion } from "framer-motion";
import { cn } from "./util/cn";

export const EvervaultCard = ({
  text,
  className,
}) => {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  const [randomString, setRandomString] = useState("");

  useEffect(() => {
    let str = generateRandomString(1500);
    setRandomString(str);
  }, []);

  function onMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);

    const str = generateRandomString(1500);
    setRandomString(str);
  }

  return (
    <div
      className={cn(
        "p-0.5  bg-transparent   flex items-center justify-center w-1/2 h-96 relative",
        className
      )}
    >
      <div
        onMouseMove={onMouseMove} style={{
          background: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(30px)",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.3)"
        }}
        className="group/card rounded-3xl w-full relative overflow-hidden flex items-center justify-center h-full"
      >
        <CardPattern
          mouseX={mouseX}
          mouseY={mouseY}
          randomString={randomString}
        />
        <div className="relative z-10 flex items-center justify-center">
          <div className="relative h-52 w-60  rounded-full flex items-center justify-center text-white font-bold text-4xl">
            <div className="absolute w-full h-1/2 blur-sm rounded-xl" style={{
              background: "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(30px)",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }} />
            <span className="text-center text-3xl text-black z-30">Using <span className="text-orange-custom">Motoko</span><br /><span className="text-2xl"> <span className="text-green-600 ">Hover</span> on me!</span></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export function CardPattern({ mouseX, mouseY, randomString }) {
  let maskImage = useMotionTemplate(`radial-gradient(250px at ${mouseX}px ${mouseY}px, white, transparent)`);
  let style = { maskImage, WebkitMaskImage: maskImage };

  return (
    <div className="pointer-events-none">
      <div className="absolute inset-0 rounded-2xl  [mask-image:linear-gradient(white,transparent)] group-hover/card:opacity-50"></div>
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-b from-green-300 to-orange-300 opacity-0  group-hover/card:opacity-100 backdrop-blur-xl transition duration-500"
        style={style}
      />
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay  group-hover/card:opacity-100"
        style={style}
      >
        <p className="absolute inset-x-0 text-base h-full tracking-wider break-words whitespace-pre-wrap text-white font-productsans font-bold transition duration-500 text-center ">
          {randomString}
        </p>
      </motion.div>
    </div>
  );
}

const characters =
  "MOTOKOmotoko";
export const generateRandomString = (length) => {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export const Icon = ({ className, ...rest }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};
