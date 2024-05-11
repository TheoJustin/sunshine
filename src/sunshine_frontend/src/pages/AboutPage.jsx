import { MacbookScroll } from '../components/Macbook';
import logo from "../../../../assets/motoko.jpg"
import WavyBackground from "../components/background/WavyBackground";
import { FaTelegramPlane, FaDiscord } from 'react-icons/fa';
import Footer from '../components/Footer';
import CountingAnimation from '../components/CountingAnimation';


function AboutPage() {
  return (
    <div>
      <WavyBackground
        className="content-class"
        containerClassName="container-class"
        colors={["#6ee7b7", "#3b82f6", "#9333ea", "#f472b6", "#10b981"]}
        waveWidth={60}
        backgroundFill="#FFFFFF"
        blur={15}
        speed="fast"
        waveOpacity={0.6}
      >
        <div style={{ backgroundColor: '#2EC4B6', padding: '20px', borderRadius: '20px' }} className="container mx-auto py-12 shadow-lg mb-5">
          <h1 className="text-3xl font-bold mb-6 text-white font-sans pl-4 pt-4">Our Members</h1>
          <p className="text-lg text-white mb-8 font-sans pl-4">Meet our team members who contributed to this project.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pl-4 pr-4">
            <div style={{ backgroundColor: '#CBF3F0', borderRadius: '15px' }} className="p-6 shadow-md flex flex-col items-center justify-between">
              <h2 className="text-2xl font-bold mb-4 font-sans">Theo Justin Amantha</h2>
              <p className="text-gray-800 text-sm font-sans">Undergraduate Student @Bina Nusantara.</p>
              <div className="flex mt-4">
                <a href="https://t.me/theojustin" className="text-blue-500 hover:text-blue-700"><FaTelegramPlane size={24} /></a>
                <a href="https://discord.com/users/31709445408948225" className="text-blue-500 hover:text-blue-700 ml-4"><FaDiscord size={24} /></a>
              </div>
            </div>
            <div style={{ backgroundColor: '#CBF3F0', borderRadius: '15px' }} className="p-6 shadow-md flex flex-col items-center justify-between">
              <h2 className="text-2xl font-bold mb-4 font-sans">Jose Jonathan Tano</h2>
              <p className="text-gray-800 text-sm font-sans">Undergraduate Student @Bina Nusantara.</p>
              <div className="flex mt-4">
                <a href="https://t.me/yentano" className="text-blue-500 hover:text-blue-700"><FaTelegramPlane size={24} /></a>
                <a href="https://discord.com/users/295769116403302411" className="text-blue-500 hover:text-blue-700 ml-4"><FaDiscord size={24} /></a>
              </div>
            </div>
            <div style={{ backgroundColor: '#CBF3F0', borderRadius: '15px' }} className="p-6 shadow-md flex flex-col items-center justify-between">
              <h2 className="text-2xl font-bold mb-4 font-sans">Ryan Ray Wantouw Oei</h2>
              <p className="text-gray-800 text-sm font-sans">Undergraduate Student @Bina Nusantara.</p>
              <div className="flex mt-4">
                <a href="https://t.me/wantouw" className="text-blue-500 hover:text-blue-700"><FaTelegramPlane size={24} /></a>
                <a href="https://discord.com/users/693037429908570172" className="text-blue-500 hover:text-blue-700 ml-4"><FaDiscord size={24} /></a>
              </div>
            </div>
          </div>
        </div>
      </WavyBackground>
      
        <CountingAnimation />

      <MacbookScroll
          src={logo}
          showGradient={true}
          title="Made Using Internet Computer Web 3.0"
          badge=""
        />
      
      <Footer/>
    </div>
  );
}

export default AboutPage;
