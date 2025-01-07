import {useParams} from "react-router-dom";
import {useUser} from "./UserProvider";
import {useFetchData} from "../hooks/UseFetchData";
import React, {useEffect, useState} from "react";
import {usePostData} from "../hooks/UsePostData";
import LoadingPage from "./LoadingPage";
import Results from "./Results";

export default function Subtraction() {
    const {subjectId, gameId} = useParams();
    const {user} = useUser();

    const [questions, setQuestions] = useState([]);  // Store generated questions
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [isGameComplete, setIsGameComplete] = useState(false);
    const [startTime, setStartTime] = useState(null); // Store game start time
    const [endTime, setEndTime] = useState(null);
    const [maxScore, setMaxScore] = useState(5);

    const {responseData, error: postError, loading: postLoading, postData} = usePostData("/gameComplete", {
        userId: user.userId,
        subjectId,
        gameId,
        startTime,
        endTime,
        score,
        maxScore
    })

    useEffect(() => {
        if (endTime) {
            // Send the data only when endTime has been set (i.e., game is complete)
            postData();
        }
    }, [endTime]);

    useEffect(() => {
        // Record the game start time when the component mounts
        setStartTime(new Date().toISOString());
    }, []);

    useEffect(() => {
        const generatedQuestions = [];
        for (let i = 0; i < 5; i++) {  // Generate 5 questions, adjust as needed
            const numbers = getRandomNumbers(20);
            generatedQuestions.push({num1: numbers[0], num2: numbers[1], answer: numbers[0] - numbers[1]});
        }
        setQuestions(generatedQuestions);
    }, []);

    // Helper function to get a random number from the array
    const getRandomNumbers = (max) => {
        let first, second;
        do {
            first = Math.floor(Math.random() * (max + 1));
            second = Math.floor(Math.random() * (max + 1));
        } while (first <= second);

        return [first, second]
    };

    // Handle user input change
    const handleInputChange = (event) => {
        setUserAnswer(event.target.value);
    };

    // Handle answer submission
    const handleSubmit = (event) => {
        event.preventDefault();
        const currentQuestion = questions[currentQuestionIndex];

        // Check if the user's answer is correct
        if (parseInt(userAnswer) === currentQuestion.answer) {
            setScore(score + 1);  // Increment score for a correct answer
        }

        // Move to the next question or finish the game
        if (currentQuestionIndex + 1 < questions.length) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setUserAnswer('');  // Clear input field
        } else {
            setIsGameComplete(true);  // Mark the game as complete
            //handle post request
            setEndTime(new Date().toISOString())

        }
    };

    // Show loading while numbers are being fetched or questions are being generated
    if (questions.length === 0) {
        return <LoadingPage/>
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div
            className="flex-1 flex flex-col overflow-auto items-center bg-gradient-to-br from-indigo-200 to-indigo-600">
            {isGameComplete ? (<Results score={score} max={questions.length}/>)
                : (
                    <>
                        <div className="flex flex-col justify-center items-center w-full mt-20">
                            <div
                                className="bg-lime-300 rounded-lg py-4 w-1/4 flex justify-center items-center shadow-md">
                                <p className="text-5xl bg-gradient-to-br from-indigo-300 to-indigo-600 bg-clip-text text-transparent">Subtraction
                                    game</p>
                            </div>
                            <div className="mt-10">
                                <p className="text-5xl bg-gradient-to-br from-lime-200 to-lime-400 bg-clip-text text-transparent">Question {currentQuestionIndex + 1} of {questions.length}</p>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-center w-full mt-20">
                            <div className="mb-5">
                                <p className="text-6xl bg-gradient-to-br from-lime-200 to-lime-500 bg-clip-text text-transparent">What
                                    is {currentQuestion.num1} - {currentQuestion.num2}?</p>
                            </div>
                            <form className="flex flex-col items-center space-y-4 p-6"
                                  onSubmit={handleSubmit}>
                                <input
                                    type="number"
                                    value={userAnswer}
                                    onChange={handleInputChange}
                                    placeholder="Enter your answer"
                                    className="w-64 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                                />
                                <button
                                    type="submit"
                                    className="w-64 p-3 bg-lime-300 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md"
                                >
                                    <p className="text-xl bg-gradient-to-br from-indigo-300 to-indigo-600 bg-clip-text text-transparent">Submit
                                        Answer</p>
                                </button>
                            </form>
                        </div>
                    </>
                )}
        </div>
    )
}
