import React from 'react';
import { CardContainer, CardBody, CardItem } from './CardTilt';
import Logo from '../../../../assets/motoko.jpg';

function LandingCard() {
  return (
    <CardContainer className="flex items-center justify-center w-2/5">
      <CardBody className="w-full h-full p-8 bg-white rounded-2xl shadow-xl">
        <CardItem
          translateZ={20}
          className="text-lg text-gray-800 mb-4"
        >
          <h1 className="text-4xl font-sans font-bold text-gray-900 mb-4">Welcome to sunshine!</h1>
          <p className='font-sans font-semibold'>Discover the amazing features of our platform.</p>
        </CardItem>
        <CardItem
          translateZ={30}
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
          <CardItem
            translateZ={40}
            translateX={-5}
            as="button"
            className="px-6 py-3 rounded-lg font-sans font-semibold text-black-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring focus:ring-blue-500"
          >
            Try now →
          </CardItem>
          <CardItem
            translateZ={40}  // Slightly forward
            translateX={5}  // Shifted to the right
            as="button"
            className="px-6 py-3 rounded-lg font-sans font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Sign up
          </CardItem>
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}

export default LandingCard;
