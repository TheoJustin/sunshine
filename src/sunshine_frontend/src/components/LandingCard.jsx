import React from 'react';
import { CardContainer, CardBody, CardItem } from './CardTilt';
import Logo from '../../../../assets/motoko.jpg';
import { NavLink } from 'react-router-dom';

function LandingCard() {
  return (
    <CardContainer className="mr-16">
      <CardBody className="w-full h-full p-8 bg-white/30 rounded-2xl shadow-xl backdrop-blur-sm border border-gray-300">
        <CardItem
          className="text-lg text-gray-800 mb-4"
        >
          <h1 className="text-4xl font-sans font-bold text-gray-900 mb-4">Welcome to sunshine!</h1>
          <p className='font-sans font-semibold'>Discover the amazing features of our platform.</p>
        </CardItem>
        <CardItem
          className="w-full"
        >
          <img
            src={Logo}
            alt="Motoko Kusanagi"
            className="w-full rounded-xl"
          />
        </CardItem>
        <CardItem
          className="w-full flex justify-between mt-5"
        >
          <NavLink to="/chat">
            <CardItem
              translateZ={40}
              as="button"
              className="px-6 py-3 rounded-full font-sans font-semibold text-black-600 bg-white/50 hover:bg-blue-50/70 focus:outline-none focus:ring focus:ring-blue-500 transition-colors duration-300 ease-in-out"
            >
              Try now →
            </CardItem>
          </NavLink>
          <NavLink to="/login">
            <CardItem
              translateZ={40}
              as="button"
              className="px-6 py-3 rounded-full font-sans font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 transition-colors duration-300 ease-in-out"
            >
              Sign up
            </CardItem>
          </NavLink>
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}

export default LandingCard;
