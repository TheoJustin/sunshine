import React, { useState, useEffect } from 'react';

function ReactionTest() {
    const [status, setStatus] = useState('waiting'); // Status can be 'waiting', 'ready', 'tooSoon', or 'clicked'
    const [startTime, setStartTime] = useState(0);
    const [reactionTime, setReactionTime] = useState(null);

    useEffect(() => {
        if (status === 'ready') {
            const timer = setTimeout(() => {
                if (status === 'ready') {
                    setStatus('waiting');
                    alert("Too slow! Try again.");
                    setReactionTime(null);
                }
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [status]);

    const handleStart = () => {
        if (status !== 'ready' && status !== 'clicked') {
            setStatus('waiting');
            setReactionTime(null);
            const delay = Math.random() * 5000 + 1000;
            setTimeout(() => {
                setStatus('ready');
                setStartTime(new Date().getTime());
            }, delay);
        }
    };

    const handleClick = () => {
        if (status === 'ready') {
            const endTime = new Date().getTime();
            const reactionTime = endTime - startTime;
            setReactionTime(reactionTime);
            setStatus('clicked');
        } else if (status === 'waiting') {
            setStatus('tooSoon');
            setTimeout(() => {
                setStatus('waiting');
            }, 2000); // Display "Too Soon" for 2 seconds before resetting
        }
    };

    const getBackgroundColor = () => {
        switch (status) {
            case 'waiting':
                return 'bg-blue-500';
            case 'ready':
                return 'bg-green-500';
            case 'tooSoon':
                return 'bg-red-500';
            case 'clicked':
                return 'bg-green-500';
            default:
                return 'bg-blue-500';
        }
    };

    return (
        <div className={`flex justify-center items-center min-h-screen w-full ${getBackgroundColor()}`}
             onClick={handleClick}>
            <div className='text-center text-white'>
                <h1 className="text-4xl font-bold">Reaction Time Test</h1>
                {status === 'waiting' && <p className="text-2xl">Get ready...</p>}
                {status === 'tooSoon' && <p className="text-2xl">Too soon!</p>}
                {status === 'ready' && <p className="text-2xl">Click now!</p>}
                {status === 'clicked' && reactionTime !== null && <p className="text-2xl">Your reaction time: {reactionTime} milliseconds</p>}
                {(status === 'waiting' || status === 'clicked') &&
                    <button onClick={(e) => {
                        e.stopPropagation();
                        handleStart();
                    }} className="mt-4 bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-white">Start</button>
                }
            </div>
        </div>
    );
}

export default ReactionTest;