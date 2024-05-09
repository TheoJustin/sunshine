import { MacbookScroll } from '../components/Macbook';
import logo from "../../../../assets/motoko.jpg"
import WavyBackground from "../components/background/WavyBackground";
import { FaInstagram, FaDiscord } from 'react-icons/fa';
import CountUp from 'react-countup';

function CountingAnimation() {
  return (
    <div className="absolute bottom w-full flex justify-center items-center">
      <div className="flex justify-around items-center w-full max-w-6xl mx-auto">
        <div className="flex flex-col items-center">
          <div className="text-5xl font-bold mb-2">Users Joined</div>
          <div className="text-8xl font-bold text-blue-600">
            <CountUp end={163052} duration={5} />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-5xl font-bold mb-2">Chats Created</div>
          <div className="text-8xl font-bold text-purple-600">
            <CountUp end={54523} duration={5} />
          </div>
        </div>
      </div>
    </div>
  );
}


function AboutPage() {
  return (
    <>
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
        <div style={{ backgroundColor: '#2EC4B6', padding: '20px', borderRadius: '20px' }} className="container mx-auto py-12 px-4 shadow-lg mb-5">
          <h1 className="text-3xl font-bold mb-6 text-white">Our Members</h1>
          <p className="text-lg text-white mb-8">Meet our team members who contributed to this project.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div style={{ backgroundColor: '#CBF3F0', borderRadius: '15px' }} className="p-6 shadow-md flex flex-col items-center justify-between">
              <h2 className="text-2xl font-bold mb-4">Theo Justin Amantha</h2>
              <p className="text-gray-800 text-sm">Undergraduate Student @Bina Nusantara.</p>
              <div className="flex mt-4">
                <a href="#" className="text-blue-500 hover:text-blue-700"><FaInstagram size={24} /></a>
                <a href="#" className="text-blue-500 hover:text-blue-700 ml-4"><FaDiscord size={24} /></a>
              </div>
            </div>
            <div style={{ backgroundColor: '#CBF3F0', borderRadius: '15px' }} className="p-6 shadow-md flex flex-col items-center justify-between">
              <h2 className="text-2xl font-bold mb-4">Jose Jonathan Tano</h2>
              <p className="text-gray-800 text-sm">Undergraduate Student @Bina Nusantara.</p>
              <div className="flex mt-4">
                <a href="#" className="text-blue-500 hover:text-blue-700"><FaInstagram size={24} /></a>
                <a href="#" className="text-blue-500 hover:text-blue-700 ml-4"><FaDiscord size={24} /></a>
              </div>
            </div>
            <div style={{ backgroundColor: '#CBF3F0', borderRadius: '15px' }} className="p-6 shadow-md flex flex-col items-center justify-between">
              <h2 className="text-2xl font-bold mb-4">Ryan Ray Wantouw Oei</h2>
              <p className="text-gray-800 text-sm">Undergraduate Student @Bina Nusantara.</p>
              <div className="flex mt-4">
                <a href="#" className="text-blue-500 hover:text-blue-700"><FaInstagram size={24} /></a>
                <a href="#" className="text-blue-500 hover:text-blue-700 ml-4"><FaDiscord size={24} /></a>
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
    </>
  );
}

export default AboutPage;
