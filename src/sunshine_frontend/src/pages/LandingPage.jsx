import React, { useEffect, useState } from "react";
import PhotoTilt from "../components/PhotoTilt";
import Feature from "../components/Feature";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { Typewriter } from "react-simple-typewriter";
import homeBackgroundSky from "../../../../assets/parallax/parallax8.png";
import parallax1 from "../../../../assets/parallax/parallax1.png";
import parallax2 from "../../../../assets/parallax/parallax2.png";
import parallax3 from "../../../../assets/parallax/parallax3.png";
import parallax4 from "../../../../assets/parallax/parallax4.png";
import parallax5 from "../../../../assets/parallax/parallax5.png";
import parallax6 from "../../../../assets/parallax/parallax6.png";
import parallax7 from "../../../../assets/parallax/parallax7.png";
import parallax8 from "../../../../assets/parallax/parallax8.png";
import sun from "../../../../assets/parallax/sun.png";
import Footer from "../components/Footer";
import { useAuth } from "../use-auth-client";
import LandingCard from "../components/LandingCard";
import StatLabel from "../components/StatLanding";
import CardComments from "../components/CardComments";
import { ChakraProvider } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { sunshine_backend } from "../../../declarations/sunshine_backend";
import Loader from "../components/Loader";

// import { sunshine_backend } from "../../.././declarations/sunshine_backend"

// style for parallax images
const imageStyle = {
  width: "100%",
};

function LandingPage() {
  const { principal } = useAuth();
  // const [currentName, setCurrentName] = useState("Stranger");

  const getUserName = async () => {
    return await sunshine_backend.getName(principal);
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["getUserName"],
    queryFn: getUserName,
  });

  // useEffect(() => {
  //   // console.log(user);
  //   if (user != null) {
  //     user.getName(principal).then((name) => {
  //       setCurrentName(name);
  //     });
  //   }
  // }, [user]);

  if (isLoading) return <Loader />;

  return (
    <>
      {/* parallax of mountains and sun for landing page */}
      <Parallax pages={2.29} style={{ backgroundColor: "#1b2f2e" }}>
        {/* 1st part -> mountains and sun, some tagline?*/}
        <ParallaxLayer
          offset={0}
          speed={0.3}
          onScroll={() => ref.current.scrollTo(0.9)}
          factor={1}
          style={{
            backgroundImage: `url(${homeBackgroundSky})`,
            objectFit: "contain",
            zIndex: "-130",
          }}
        ></ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.3} factor={1}>
          <div
            className="w-[100] absolute font-productsans  font-bold text-center"
            style={{
              top: "36%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: "100",
            }}
          >
            <h1 className="text-5xl">
              Hello <span style={{ color: "#ff9f1c" }}>{data}</span> &lt;3
            </h1>
            <p className="mt-2">
              You are my
              <span style={{ color: "#ff9f1c" }}>
                <Typewriter
                  words={[" sunshine!", " only sunshine!"]}
                  loop={0}
                  cursor
                  cursorStyle="_"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </span>
            </p>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.5} factor={1} className="-z-20">
          <img src={parallax8} style={imageStyle} alt="" />
        </ParallaxLayer>
        <ParallaxLayer
          offset={0}
          speed={0.55}
          factor={1 - 0.28}
          className="-z-10"
        >
          <img src={parallax7} style={imageStyle} alt="" />
        </ParallaxLayer>
        <ParallaxLayer
          offset={0.33}
          speed={0.6}
          factor={1 - 0.3}
          className="z-0"
        >
          <img src={parallax6} style={imageStyle} alt="" />
        </ParallaxLayer>
        <ParallaxLayer
          offset={0.3}
          speed={0.65}
          factor={1 - 0.4}
          className="z-10"
        >
          <img src={parallax5} style={imageStyle} alt="" />
        </ParallaxLayer>
        <ParallaxLayer
          offset={0.2}
          speed={0.7}
          factor={1 - 0.2}
          className="z-20"
        >
          <img src={parallax4} style={imageStyle} alt="" />
        </ParallaxLayer>
        <ParallaxLayer
          offset={0.2}
          speed={0.75}
          factor={1 - 0.2}
          className="z-30"
        >
          <img src={parallax3} style={imageStyle} alt="" />
        </ParallaxLayer>
        <ParallaxLayer
          offset={0.2}
          speed={0.8}
          factor={1 - 0.2}
          className="z-40"
        >
          <img src={parallax2} style={imageStyle} alt="" />
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.3} factor={1} className="-z-10">
          <img
            src={sun}
            className="w-4/5 left-12 top-20 absolute"
            style={{ filter: "drop-shadow(0 0 20px #ffbf64)" }}
            alt="asd"
          />
        </ParallaxLayer>
        <ParallaxLayer offset={0.2} speed={0.85} factor={1} className="z-40">
          <img src={parallax1} style={imageStyle} alt="" />
          <div
            className="flex flex-row -z-50"
            style={{
              backgroundColor: "#1b2f2e",
              alignContent: "center",
              textAlign: "center",
              height: "110vh",
            }}
          >
            <div className="ml-20 mr-20 w-3/5 flex justify-center">
              <PhotoTilt />
            </div>
            <div className="flex flex-col gap-7 justify-center">
              {/* <Feature title="Decentralized Authentication" description="Utilize Internet Identity for decentralized authentication to ensure secure and private access to the application. This will leverage blockchain technology to verify user identities without relying on traditional centralized servers." /> */}
              <Feature
                title="Scalable Real-Time Messaging"
                description="Implement a scalable real-time messaging system built on the Internet Computer, benefiting from its high throughput and low latency. This system can handle massive amounts of data and a high number of users without compromising speed or efficiency."
                colorIndex={1}
              />
              <Feature
                title="Blockchain-Enabled Cryptocurrency Transactions"
                description="Enable cryptocurrency transactions through the app using a blockchain-based approach, possibly through a regtest environment for safe testing and demonstrations. This will allow users to perform secure and verifiable transactions within their chats."
                colorIndex={1}
              />
              <Feature
                title="Distributed Game Logic"
                description="Games integrated into the chat can run their backend logic directly on the Internet Computer, ensuring transparent and verifiable game mechanics. This decentralized approach prevents cheating and enhances performance."
                colorIndex={1}
              />
              {/* <Feature title="Immutable Chat History" description="Store chat histories on the blockchain, providing users with immutable records of their conversations. This feature not only enhances security but also allows for easy retrieval and verification of past interactions." /> */}
            </div>
          </div>
        </ParallaxLayer>

        {/* 3rd part include sliding animation + footer? */}
        <ParallaxLayer
          offset={1.9}
          speed={3}
          factor={1}
          className="z-50"
          style={{
            backgroundColor: "#2A4A49",
            marginTop: "-15rem",
          }}
        ></ParallaxLayer>
        <ParallaxLayer
          offset={1.9}
          speed={3}
          factor={1}
          className="z-50"
          style={{
            backgroundColor: "#437574",
            marginTop: "-12rem",
          }}
        ></ParallaxLayer>
        <ParallaxLayer
          offset={1.9}
          speed={3}
          factor={1}
          className="z-50"
          style={{
            backgroundColor: "#5DBAA2",
            marginTop: "-9rem",
          }}
        ></ParallaxLayer>
        <ParallaxLayer
          offset={1.9}
          speed={3}
          factor={1.3}
          className="z-50"
          style={{
            backgroundColor: "#9BDDCB",
            marginTop: "-2rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            width: "100%",
            minHeight: "100vh",
          }}
        >
          <div className="flex justify-start items-center gap-8 align-top m-10 mt-20 mb-16">
            <LandingCard />
            <CardComments />
          </div>
          <Footer />
        </ParallaxLayer>
        {/* <ParallaxLayer offset={2.9} speed={0.9} factor={1} className='z-50' style={{
          backgroundColor: '#B0DDD6',
          marginTop: '-41rem'
        }}>
        
      </ParallaxLayer> */}
      </Parallax>
    </>
  );
}

export default () => (
  // <AuthProvider>
  <LandingPage />
  // </AuthProvider>
);
