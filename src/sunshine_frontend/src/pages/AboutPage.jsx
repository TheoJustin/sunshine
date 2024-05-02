import Navbar from "../components/Navbar";
import { MacbookScroll } from '../components/Macbook';
import logo from "../../../../assets/motoko.jpg"
import WavyBackground from "../components/background/WavyBackground";
import { FaInstagram, FaDiscord } from 'react-icons/fa';

function AboutPage() {
  return (
    <>
      <WavyBackground
        className="content-class" // Custom class for the content container
        containerClassName="container-class" // Custom class for the main container
        colors={["#6ee7b7", "#3b82f6", "#9333ea", "#f472b6", "#10b981"]} // Custom wave colors
        waveWidth={60} // Custom wave width
        backgroundFill="#FFFFFF" // Custom background color
        blur={15} // Custom blur effect
        speed="fast" // Animation speed
        waveOpacity={0.6} // Wave opacity
      >
        <div style={{ backgroundColor: '#2EC4B6' }} className="container mx-auto py-12 px-4 rounded-lg">
          <h1 className="text-3xl font-bold mb-6 font-productsans">Our Members</h1>
          <p className="text-lg text-gray-700 mb-8">Meet our team members who contributed to this project.</p>
          
          {/* Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div style={{ backgroundColor: '#CBF3F0' }} className="p-6 rounded-lg shadow-md flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-4">Theo Justin Amantha</h2>
                <p className="text-gray-800 text-sm">Undergraduate Student @Bina Nusantara.</p>
              </div>
              <div className="flex justify-between mt-4">
                <a href="#" className="text-blue-500 hover:text-blue-700"><FaInstagram size={24} /></a>
                <a href="#" className="text-blue-500 hover:text-blue-700 ml-4"><FaDiscord size={24} /></a>
              </div>
            </div>
            
            {/* Card 2 */}
            <div style={{ backgroundColor: '#CBF3F0' }} className="p-6 rounded-lg shadow-md flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-4">Jose Jonathan Tano</h2>
                <p className="text-gray-800 text-sm">Undergraduate Student @Bina Nusantara.</p>
              </div>
              <div className="flex justify-between mt-4">
                <a href="#" className="text-blue-500 hover:text-blue-700"><FaInstagram size={24} /></a>
                <a href="#" className="text-blue-500 hover:text-blue-700 ml-4"><FaDiscord size={24} /></a>
              </div>
            </div>
            
            {/* Card 3 */}
            <div style={{ backgroundColor: '#CBF3F0' }} className="p-6 rounded-lg shadow-md flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-4">Ryan Ray Wantouw Oei</h2>
                <p className="text-gray-800 text-sm">Undergraduate Student @Bina Nusantara.</p>
              </div>
              <div className="flex justify-between mt-4">
                <a href="#" className="text-blue-500 hover:text-blue-700"><FaInstagram size={24} /></a>
                <a href="#" className="text-blue-500 hover:text-blue-700 ml-4"><FaDiscord size={24} /></a>
              </div>
            </div>
          </div>
        </div>
      </WavyBackground>
      
      {/* Macbook Scroll */}
      <MacbookScroll
          src={logo}
          showGradient={true}
          title="Made Using Internet Computer Web 3.0"
          badge={<span>Internet Computer</span>}
        />
    </>
  );
}

export default AboutPage;
