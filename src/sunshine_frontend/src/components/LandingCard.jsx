import React from 'react';
import { CardContainer, CardBody, CardItem } from './CardTilt';
import Logo from '../../../../assets/motoko.jpg';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

function LandingCard() {
  const navigate = useNavigate();  // Initialize the navigate function

  // Function to handle navigation
  const handleNavigate = (path) => () => {
    navigate(path);
  };

  return (
    <div className='flex-grow'>
      <CardContainer >
        <CardBody className="p-8 h-max w-full bg-white/30 rounded-2xl shadow-xl backdrop-blur-sm border border-gray-300">
          <CardItem
            className="text-lg text-gray-800 w-full mb-4"
          >
            <h1 className="text-3xl font-sans font-bold text-white mb-4">Welcome to <span className='text-orange-custom'>sunshine!</span></h1>
            <p className='font-sans text-base text-teal-custom font-semibold'>Discover the amazing features of our platform.</p>
          </CardItem>
          <CardItem
            className="w-full "
          >
            <img
              src={Logo}
              alt="Motoko Kusanagi"
              className="w-full rounded-xl"
            />
          </CardItem>
          <CardItem
            className="w-full  flex justify-start gap-5 mt-5"
          >
            <CardItem
              translateZ={40}
              as="button"
              onClick={handleNavigate('/chat')} // Use handleNavigate for navigation
              className="px-4 py-3 rounded-xl font-sans text-base font-semibold text-white bg-green-custom hover:bg-darkgreen-custom focus:outline-none focus:ring focus:ring-blue-500 transition-colors duration-300 ease-in-out"
            >
              Try now →
            </CardItem>
            <CardItem
              translateZ={40}
              as="button"
              onClick={handleNavigate('/login')} // Use handleNavigate for navigation
              className="px-4 py-3 rounded-xl font-sans text-base font-semibold text-white bg-orange-custom hover:bg-darkorange-custom focus:outline-none focus:ring focus:ring-blue-300 transition-colors duration-300 ease-in-out"
            >
              Sign up
            </CardItem>
          </CardItem>
        </CardBody>
      </CardContainer>
    </div>
  );
}

export default LandingCard;
