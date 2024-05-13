import React, { useState, useEffect } from 'react';
import BackToChat from '../../components/game/BackToChat';
import { useLocation, useNavigate } from 'react-router-dom';

function generateQuestion() {
    const num1 = Math.floor(Math.random() * 19) + 2;
    const num2 = Math.floor(Math.random() * 19) + 2;
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
        answer
    };
}

function MentalMath() {
    const [time, setTime] = useState(0);
    const [timerOn, setTimerOn] = useState(false);
    const [score, setScore] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState({});
    const [userAnswer, setUserAnswer] = useState('');
    const [questionCount, setQuestionCount] = useState(0);
    const location = useLocation();
    const [currGameId, setCurrGameId] = useState(null); 
    const navigate = useNavigate();
    useEffect(() => {
        if(location.state == null){
            navigate('/');
            return;
        }
        const { gameId } = location.state;
        // console.log(idGame);
        setCurrGameId(gameId);
        if (timerOn) {
            const interval = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
            return () => clearInterval(interval);
        }
    }, [timerOn]);

    const handleStart = () => {
        setCurrentQuestion(generateQuestion());
        setTimerOn(true);
        setQuestionCount(1);
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
                updateMutate();
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
        <div className="flex justify-center items-center min-h-screen bg-blue-200 font-sans">
            <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
                <h1 className='text-2xl font-bold text-center mb-6'>Mental Math Challenge</h1>
                {!timerOn && <button onClick={handleStart} type="button" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-4 transition-colors duration-200">Start Challenge</button>}
                {timerOn && (
                    <div>
                        <h2 className='text-lg mb-2'>Question {questionCount}: {currentQuestion.question}</h2>
                        <form onSubmit={handleAnswer} className="flex justify-between items-center">
                            <input type="number" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} className="border-2 border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500" autoFocus />
                            <button type="submit" className="ml-2 text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200">Submit</button>
                        </form>
                    </div>
                )}
                <h2 className='mt-4'>Timer: {formatTime(time)}</h2>
                {!timerOn && questionCount >= 10 && <h1 className="text-xl font-semibold mt-4">Final Score (Time): {formatTime(score)}</h1>}
            <BackToChat score={score} gameId={currGameId}/>
            </div>
        </div>
    );
}

export default MentalMath;
