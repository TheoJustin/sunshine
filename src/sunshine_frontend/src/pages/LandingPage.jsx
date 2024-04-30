import React from 'react';
import PhotoTilt from "../components/PhotoTilt";
import Navbar from "../components/Navbar";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { Typewriter } from "react-simple-typewriter";
import homeBackgroundSky from "../../../../assets/parallax/background_home_sky.png";


function LandingPage() {
  return (
    <>
      <Parallax pages={2}>
      <ParallaxLayer offset={0} speed={0.3} style={{
          backgroundImage: `url(${homeBackgroundSky})`,
          objectFit: 'cover'
      }} >
          <div className="absolute" style={{top: '40%',left: '50%', transform: 'translate(-50%, -50%)'}}>
              You are my <Typewriter
                  words={["sunshine!", "only sunshine!"]}
                  loop={0}
                  cursor
                  cursorStyle='_'
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1000}
              />
          </div>
      </ParallaxLayer>
      <ParallaxLayer offset={1} speed={0.5}>
        <h2 className="">Landing Page</h2>
        <p className="text-blue-600">The quick brown fox...</p>
        <p style={{ fontFamily: 'Product Sans', fontSize: '18px' }}>
          This is a test paragraph using Product Sans Regular.
        </p>
        <div className="flex flex-row">
          <div className="m-5">
            <PhotoTilt />
          </div>
          <div className="flex flex-col">
            <div className="animate-slide-in-left p-4 text-3xl">Feature 1</div>
            <div className="animate-slide-in-left p-4 pl-6 text-3xl">Feature 2</div>
            <div className="animate-slide-in-left p-4 pl-8 text-3xl">Feature 3</div>
          </div>
        </div>
      </ParallaxLayer>     
    </Parallax>
    </>
  );
}

export default LandingPage;
