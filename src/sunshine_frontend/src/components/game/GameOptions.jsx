import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TwentyFiveLogo from '../../../../../assets/game/twentyfive.png';
import MentalMathLogo from '../../../../../assets/game/mentalmath.png';
import ReactionTimeLogo from '../../../../../assets/game/reactiontime.png';

function GameOptions() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState('');

  const games = [
    { id: 'firstgame', title: 'Twenty Five', company: 'Sunshine Games', imageUrl: TwentyFiveLogo },
    { id: 'secondgame', title: 'Mental Math', company: 'Brain Boosters', imageUrl: MentalMathLogo },
    { id: 'thirdgame', title: 'Reaction Time', company: 'Quick Reflex Co.', imageUrl: ReactionTimeLogo }
  ];

  const toggleModal = () => setIsOpen(!isOpen);
  const handleSelection = (gameId) => setSelectedGame(gameId);

  const handleStartGame = () => {
    if (selectedGame) {
      navigate(`/${selectedGame}`);
    } else {
      alert('Please select a game first!');
    }
  };

  return (
    <>
      <button onClick={toggleModal} className="rounded-full block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 font-sans">
        Choose Your Game
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto font-sans">
          <div className="relative p-4 w-full max-w-md">
            <div className="relative bg-white rounded-2xl shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white font-sans">
                  Game Selection
                </h3>
                <button onClick={toggleModal} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white font-sans">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-4 md:p-5 font-sans">
                <p className="text-gray-500 dark:text-gray-400 mb-4 font-sans">Pick a game to test your skills:</p>
                <ul className="space-y-4 mb-4 font-sans">
                  {games.map(game => (
                    <li key={game.id}>
                      <input type="radio" id={game.id} name="game" value={game.id} checked={selectedGame === game.id} onChange={() => handleSelection(game.id)} className="hidden peer" required />
                      <label htmlFor={game.id} className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500 font-sans">
                        <div className="flex items-center">
                          <img src={game.imageUrl} alt={game.title} className="h-16 w-16 mr-4" />
                          <div>
                            <div className="text-lg font-semibold">{game.title}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{game.company}</div>
                          </div>
                        </div>
                      </label>
                    </li>
                  ))}
                </ul>
                <button onClick={handleStartGame} className="rounded-full text-white inline-flex w-full justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 font-sans">
                  Start Game
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default GameOptions;
