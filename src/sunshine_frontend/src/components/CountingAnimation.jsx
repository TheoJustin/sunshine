
import CountUp from 'react-countup';

export default function CountingAnimation() {
    return (
      <div className="bottom w-full flex justify-center items-center">
        <div className="flex justify-around items-center w-full max-w-6xl mx-auto">
          <div className="flex flex-col items-center">
            <div className="text-5xl font-bold mb-2 font-sans">Users Joined</div>
            <div className="text-8xl font-bold text-blue-600">
              <CountUp end={54523} duration={7.5} className='font-sans'/>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-5xl font-bold mb-2 font-sans">Chats Created</div>
            <div className="text-8xl font-bold text-purple-600">
              <CountUp end={163052} duration={7.5} className='font-sans'/>
            </div>
          </div>
        </div>
      </div>
    );
  }