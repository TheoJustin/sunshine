import React, { useState, useEffect } from 'react';

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}

function TwentyFive() {
    const [visible, setVisible] = useState(Array.from({ length: 25 }, () => false)); // Start with all numbers hidden
    const [shuffledNumbers, setShuffledNumbers] = useState([]);
    const [nextNumber, setNextNumber] = useState(1);
    const [time, setTime] = useState(0);
    const [intervalId, setIntervalId] = useState(null);
    const [started, setStarted] = useState(false);
    const [score, setScore] = useState(0);

    useEffect(() => {
        setShuffledNumbers(shuffleArray(Array.from({ length: 25 }, (_, index) => index + 1)));
    }, []);

    const handleStart = () => {
        if (!started) {
            setStarted(true);
            setVisible(Array.from({ length: 25 }, () => true)); // Make all numbers visible when starting
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
            setNextNumber(nextNumber + 1); // Increment the next number to be clicked

            // Check if all divs are hidden
            const allHidden = updatedVisibility.every(v => !v);
            if (allHidden) {
                clearInterval(intervalId);
                setScore(time); // Set the score to the current time
                setStarted(false); // Optionally reset the start flag
            }
        }
    };

    const formatTime = (milliseconds) => {
        const seconds = Math.floor(milliseconds / 1000);
        const remainMs = milliseconds % 1000;
        return `${seconds}.${remainMs.toString().padStart(3, '0')}`;
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className='flex flex-col justify-center items-center space-y-4'>
                <h1>Twenty Five</h1>
                <button onClick={handleStart} type="button" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Start</button>
                <h2>Timer: {formatTime(time)}</h2>
                <h1 className="text-2xl">Score : {score}</h1>
                <div className='h-56 grid grid-cols-5 gap-4 content-start'>
                    {started && shuffledNumbers.map((number, index) => (
                        <div
                            key={index}
                            className={`bg-gray-200 cursor-pointer ${visible[index] ? '' : 'opacity-0'}`}
                            onClick={() => handleClick(number, index)}
                        >
                            {number}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TwentyFive;
