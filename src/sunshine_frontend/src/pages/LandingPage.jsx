import React from 'react';
import PhotoTilt from "../components/PhotoTilt";
import Navbar from "../components/Navbar";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { Typewriter } from "react-simple-typewriter";
import homeBackgroundSky from "../../../../assets/parallax/background_home_sky.png";
import parallax1 from "../../../../assets/parallax/parallax-1.png";
import parallax2 from "../../../../assets/parallax/parallax-2.png";
import parallax3 from "../../../../assets/parallax/parallax-3.png";
import parallax4 from "../../../../assets/parallax/parallax-4.png";
import parallax5 from "../../../../assets/parallax/parallax-5.png";
import parallax6 from "../../../../assets/parallax/parallax-6.png";
import parallax7 from "../../../../assets/parallax/parallax-7.png";
import parallax8 from "../../../../assets/parallax/parallax-8.png";
import sun1 from "../../../../assets/parallax/sun-1.png";

// style for parallax images
const imageStyle = ({
  width: '100%',
  // height: '100%',
  // objectFit: 'cover'
})


function LandingPage() {
  return (
    <>
      {/* parallax of mountains and sun for landing page */}
      <Parallax pages={1.835}>
                {/* 1st part -> mountains and sun, some tagline?*/}
                <ParallaxLayer offset={0} speed={0.3} factor={1} style={{
                    backgroundImage: `url(${homeBackgroundSky})`,
                    objectFit: 'contain',
                    zIndex: '-130'
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
                <ParallaxLayer offset={0.21} speed={1.9} factor={1-0.21} className='z-50'>
                    <img src={parallax1} style={imageStyle} alt="" />
                </ParallaxLayer>
                <ParallaxLayer offset={0.2} speed={1.9} factor={1-0.2} className='z-40'>
                    <img src={parallax2} style={imageStyle} alt="" />
                </ParallaxLayer>
                <ParallaxLayer offset={0.2} speed={2} factor={1-0.2} className='z-30'>
                    <img src={parallax3} style={imageStyle} alt="" />
                </ParallaxLayer>
                <ParallaxLayer offset={0.2} speed={2} factor={1-0.2} className='z-20'>
                    <img src={parallax4} style={imageStyle} alt="" />
                </ParallaxLayer>
                <ParallaxLayer offset={0.4} speed={2.2} factor={1-0.4} className='z-10'>
                    <img src={parallax5} style={imageStyle} alt="" />
                </ParallaxLayer>
                <ParallaxLayer offset={0.3} speed={2.2} factor={1-0.3} className='z-0'>
                    <img src={parallax6} style={imageStyle} alt="" />
                </ParallaxLayer>
                <ParallaxLayer offset={0.28} speed={2.4} factor={1-0.28} className='-z-10'>
                    <img src={parallax7} style={imageStyle} alt="" />
                </ParallaxLayer>  
                <ParallaxLayer offset={0.38} speed={2.4} factor={1-0.38} className='-z-20'>
                    <img src={parallax8} style={imageStyle} alt="" />
                </ParallaxLayer>
                <ParallaxLayer offset={0.2} speed={0.3}  factor={1-0.2} className='-z-30'>
                    <img src={sun1} className='w-40 left-64 top-10 absolute' alt="" />
                </ParallaxLayer>

                {/* 2nd part -> features */}
                <ParallaxLayer offset={0.9} speed={1.9} className='-z-50 pt-64' factor={1.5} style={{
                  backgroundColor: '#2A6356',
                  alignContent: 'center',
                  textAlign: 'center'
                }}>
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

                
                {/* 3rd part include sliding animation + footer? */}
                <ParallaxLayer offset={1} speed={3.5} factor={1}  style={{ 
                  backgroundColor: '#34836E',
                  marginTop: '-53rem'
                  }}>
                </ParallaxLayer>
                <ParallaxLayer offset={1} speed={3.4} factor={1}  style={{ 
                  backgroundColor: '#3F967E',
                  marginTop: '-47rem'
                  }}>
                </ParallaxLayer>
                <ParallaxLayer offset={1} speed={3.3} factor={1}  style={{ 
                  backgroundColor: '#5DBAA2',
                  marginTop: '-41rem'
                  }}>
                </ParallaxLayer>
                <ParallaxLayer offset={1} speed={3.2} factor={1}  style={{ 
                  backgroundColor: '#9BDDCB',
                  marginTop: '-36rem'
                  }}>
                </ParallaxLayer>
                <ParallaxLayer offset={1} speed={3.1} factor={1}  style={{ 
                  backgroundColor: '#B0DDD6',
                  marginTop: '-31rem'
                  }}>
                </ParallaxLayer>

                <ParallaxLayer offset={1} speed={3} factor={1} className='border' style={{ 
                  backgroundColor: '#FFFFFF',
                  marginTop: '-26rem'
                  }}>
                    Footer
                </ParallaxLayer>
            </Parallax>

            
    </>
  );
}

export default LandingPage;
