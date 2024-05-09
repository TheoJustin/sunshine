import React, { useState, useEffect } from 'react';

function generateQuestion() {
    const num1 = Math.floor(Math.random() * 19) + 2; // Random number between 2 and 20
    const num2 = Math.floor(Math.random() * 19) + 2; // Random number between 2 and 20
    const operations = ['+', '-', '*'];
    const operation = operations[Math.floor(Math.random() * operations.length)];

    let answer;
    switch (operation) {
        case '+':
            answer = num1 + num2;
            break;
        case '-':
            answer = num1 - num2;
            break;
        case '*':
            answer = num1 * num2;
            break;
        default:
            answer = num1 * num2;
    }

    return {
        question: `${num1} ${operation} ${num2}`,
        answer: answer
    };
}

function MentalMath() {
    const [time, setTime] = useState(0);
    const [timerOn, setTimerOn] = useState(false);
    const [score, setScore] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState({});
    const [userAnswer, setUserAnswer] = useState('');
    const [questionCount, setQuestionCount] = useState(0);

    useEffect(() => {
        if (timerOn) {
            const interval = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
            return () => clearInterval(interval);
        }
    }, [timerOn]);

    const handleStart = () => {
        if (!timerOn) {
            setCurrentQuestion(generateQuestion());
            setTimerOn(true);
            setQuestionCount(1);
        }
    };

    const handleAnswer = (event) => {
        event.preventDefault();
        if (parseInt(userAnswer) === currentQuestion.answer) {
            if (questionCount < 10) {
                setCurrentQuestion(generateQuestion());
                setUserAnswer('');
                setQuestionCount(questionCount + 1);
            } else {
                setTimerOn(false);
                setScore(time);
            }
        } else {
            setUserAnswer('');
        }
    };

    const formatTime = (milliseconds) => {
        const minutes = Math.floor(milliseconds / 60000);
        const seconds = Math.floor((milliseconds % 60000) / 1000);
        const millis = milliseconds % 1000;
        return `${minutes}:${seconds.toString().padStart(2, '0')}.${millis.toString().padStart(3, '0')}`;
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className='flex flex-col justify-center items-center space-y-4'>
                <h1>Mental Math</h1>
                {!timerOn && <button onClick={handleStart} type="button" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Start</button>}
                {timerOn && <div>
                    <h2>Question {questionCount}: {currentQuestion.question}</h2>
                    <form onSubmit={handleAnswer}>
                        <input type="number" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} autoFocus />
                        <button type="submit" className="ml-2 text-white bg-blue-500 px-4 py-2 rounded">Submit</button>
                    </form>
                </div>}
                <h2>Timer: {formatTime(time)}</h2>
                {!timerOn && questionCount >= 10 && <h1 className="text-2xl">Final Score (Time): {formatTime(score)}</h1>}
            </div>
        </div>
    );
}

export default MentalMath;