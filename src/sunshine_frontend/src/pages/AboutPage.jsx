import { MacbookScroll } from '../components/Macbook';
import logo from "../../../../assets/motoko.jpg"
import WavyBackground from "../components/background/WavyBackground";
import { FaTelegramPlane, FaDiscord } from 'react-icons/fa';
import Footer from '../components/Footer';
import CountingAnimation from '../components/CountingAnimation';
import { useEffect, useState } from 'react';
import { CardPattern, EvervaultCard } from "../components/EncryptedText"


function AboutPage({ setScrolled }) {
  // const [scrolled, setScrolled] = useState(false);

  function handleScroll() {
    const scrollY = window.scrollY;
    console.log(scrollY);
    if (scrollY > 0) {
      console.log("higher");
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className='bg-lightgreen-custom' onScrollCapture={handleScroll}>
      <WavyBackground
        className="content-class"
        containerClassName="container-class"
        colors={["#FF9F1C", "#FFBF69", "#FFFFFF", "#2EC4B6", "#10b981"]}
        waveWidth={60}
        backgroundFill="#d7ffdc"
        blur={15}
        speed="fast"
        waveOpacity={0.6}
      >
        <div className="mt-8 container text-center mx-auto py-12 mb-5 bg-white/40 rounded-2xl shadow-xl backdrop-blur-sm">
          <h1 className="text-3xl font-bold mb-6 text-orange-custom font-sans pl-4 pt-4"><span className='text-green-custom'>Our</span> Members</h1>
          <p className="text-lg text-darkgreen-custom mb-8 font-bold font-sans pl-4">Meet our team members who contributed to this project.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pl-4 pr-4">
            <div className="p-6 rounded-xl shadow-md flex flex-col items-center bg-white/60 text-teal-custom justify-between">
              <h2 className="text-2xl font-bold mb-4 font-sans"><span className='text-darkgreen-custom'>Theo</span> Justin Amantha</h2>
              <p className="text-gray-800 font-semibold text-sm font-sans">Undergraduate Student @Bina Nusantara.</p>
              <div className="flex mt-4">
                <a href="https://t.me/theojustin" className="text-blue-500 hover:text-blue-700"><FaTelegramPlane size={24} /></a>
                <a href="https://discord.com/users/31709445408948225" className="text-blue-500 hover:text-blue-700 ml-4"><FaDiscord size={24} /></a>
              </div>
            </div>
            <div className="p-6 shadow-md rounded-xl bg-white/60 text-teal-custom flex flex-col items-center justify-between">
              <h2 className="text-2xl font-bold mb-4 font-sans"><span className='text-darkgreen-custom'>Jose</span> Jonathan Tano</h2>
              <p className="text-gray-800 font-semibold text-sm font-sans">Undergraduate Student @Bina Nusantara.</p>
              <div className="flex mt-4">
                <a href="https://t.me/yentano" className="text-blue-500 hover:text-blue-700"><FaTelegramPlane size={24} /></a>
                <a href="https://discord.com/users/295769116403302411" className="text-blue-500 hover:text-blue-700 ml-4"><FaDiscord size={24} /></a>
              </div>
            </div>
            <div className="p-6 shadow-md bg-white/60 rounded-xl flex text-teal-custom flex-col items-center justify-between">
              <h2 className="text-2xl font-bold mb-4 font-sans"><span className='text-darkgreen-custom'>Ryan</span> Ray Wantouw Oei</h2>
              <p className="text-gray-800 font-semibold text-sm font-sans">Undergraduate Student @Bina Nusantara.</p>
              <div className="flex mt-4">
                <a href="https://t.me/wantouw" className="text-blue-500 hover:text-blue-700"><FaTelegramPlane size={24} /></a>
                <a href="https://discord.com/users/693037429908570172" className="text-blue-500 hover:text-blue-700 ml-4"><FaDiscord size={24} /></a>
              </div>
            </div>
          </div>
        </div>
      </WavyBackground>
      
      <CountingAnimation />

      <div className='mb-16 mt-44 font-productsans text-4xl font-bold flex flex-col items-center justify-center'>
        <h1 className='mb-10'>Made Using Internet Computer Web 3.0</h1>
        <EvervaultCard />
        <p className='text-2xl leading-10 w-1/2 text-center mt-10 font-normal font-productsans'>Decentralized computing offers several advantages, including enhanced <span className='text-orange-custom'>security</span>, improved <span className='text-orange-custom'>resilience</span>, increased <span className='text-orange-custom'>transparency</span>, and greater <span className='text-orange-custom'>user control</span> over data and resources.</p>
      </div>

      <Footer />
    </div>
  );
}

export default AboutPage;
