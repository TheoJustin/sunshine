import React, { useState, useEffect } from 'react';
import BackToChat from '../../components/game/BackToChat';
import { useMutation } from '@tanstack/react-query';
import { sunshine_chat } from '../../../../declarations/sunshine_chat';

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function TwentyFive() {
    const [visible, setVisible] = useState(Array.from({ length: 25 }, () => false));
    const [shuffledNumbers, setShuffledNumbers] = useState([]);
    const { activeGroup, principal, gameId } = location.state || {};
    const [nextNumber, setNextNumber] = useState(1);
    const [time, setTime] = useState(0);
    const [intervalId, setIntervalId] = useState(null);
    const [started, setStarted] = useState(false);
    const [score, setScore] = useState(0);
    const {status: updateScoreStatus, mutate: updateMutate} = useMutation({
        mutationKey: ["updateScore", activeGroup, principal, gameId],
        mutationFn: updateScore
    })

    async function updateScore(){
        await sunshine_chat.updateScore(gameId, principal, score);
        return true;
    }

    useEffect(() => {
        setShuffledNumbers(shuffleArray(Array.from({ length: 25 }, (_, index) => index + 1)));
        console.log(activeGroup, principal, gameId);
    }, []);

    const handleStart = () => {
        if (!started) {
            setStarted(true);
            setVisible(Array.from({ length: 25 }, () => true));
            const id = setInterval(() => {
                setTime(prevTime => prevTime + 10);
            }, 10);
            setIntervalId(id);
        }
    };

    const handleClick = (number, index) => {
        if (number === nextNumber) {
            const updatedVisibility = visible.map((item, i) => i === index ? false : item);
            setVisible(updatedVisibility);
            setNextNumber(nextNumber + 1);

            if (updatedVisibility.every(v => !v)) {
                clearInterval(intervalId);
                setScore(time);
                setStarted(false);
                updateMutate();
            }
        }
    };

    const formatTime = (milliseconds) => {
        const seconds = Math.floor(milliseconds / 1000);
        const remainMs = milliseconds % 1000;
        return `${seconds}.${remainMs.toString().padStart(3, '0')}`;
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-blue-100 font-sans">
            <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl'>
                <h1 className='text-3xl font-bold text-center mb-6'>Twenty Five Game</h1>
                <button onClick={handleStart} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-4 transition-colors duration-200">Start Game</button>
                <h2 className='text-xl mb-2'>Timer: {formatTime(time)}</h2>
                <div className='grid grid-cols-5 gap-4'>
                    {started && shuffledNumbers.map((number, index) => (
                        <div
                            key={index}
                            className={`flex justify-center items-center h-12 bg-blue-500 text-white font-semibold cursor-pointer rounded ${visible[index] ? 'opacity-100' : 'opacity-0'}`}
                            onClick={() => handleClick(number, index)}
                        >
                            {number}
                        </div>
                    ))}
                </div>
                <BackToChat score={score}/>
            </div>
        </div>
    );
}

export default TwentyFive;
