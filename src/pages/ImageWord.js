import {useFetchData} from "../hooks/UseFetchData";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import LoadingPage from "./LoadingPage";
import Lottie from "lottie-react";
import amazing from "../animations/amazing2.json";
import good from "../animations/good.json";
import fail from "../animations/fail.json";

export default function ImageWord() {

    const {subjectId, gameId} = useParams();

    const {data, loading, error} = useFetchData(`/subject/${subjectId}/games/${gameId}`)
    const [questions, setQuestions] = useState([]);  // Store generated questions
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [isGameComplete, setIsGameComplete] = useState(false);

    useEffect(() => {
        if (data != null) {
            const generatedQuestions = [];
            const usedIndices = new Set(); // Track used indices to prevent duplicates
            while (generatedQuestions.length < 5 && usedIndices.size < data.length) { // Generate 5 questions, adjust as needed
                const randomIndex = Math.floor(Math.random() * data.length)
                // Check if this index has already been used
                if (!usedIndices.has(randomIndex)) {
                    usedIndices.add(randomIndex); // Mark this index as used
                    const row = data[randomIndex];
                    generatedQuestions.push({image: row.imagePath, answer: row.name});
                }
            }
            setQuestions(generatedQuestions);
        }
    }, [data]);

    // Handle user input change
    const handleInputChange = (event) => {
        setUserAnswer(event.target.value);
    };

    // Handle answer submission
    const handleSubmit = (event) => {
        event.preventDefault();
        const currentQuestion = questions[currentQuestionIndex];

        // Check if the user's answer is correct
        if (userAnswer.toLowerCase() === currentQuestion.answer.toLowerCase()) {
            setScore(score + 1);  // Increment score for a correct answer
        }

        // Move to the next question or finish the game
        if (currentQuestionIndex + 1 < questions.length) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setUserAnswer('');  // Clear input field
        } else {
            setIsGameComplete(true);  // Mark the game as complete
        }
    };


    // Show loading while words are being fetched or questions are being generated
    if (data === null || questions.length === 0) {
        return <LoadingPage/>
    }

    let additionalMessage = null;

    if (isGameComplete) {
        if (score === questions.length) {
            additionalMessage = <div className="flex flex-col justify-center items-center">
                <p className="text-4xl bg-gradient-to-br from-lime-200 to-lime-400 bg-clip-text text-transparent">Great
                    job! You scored perfect score!</p>
                <Lottie className="w-8/12" animationData={amazing} loop={true}/>
            </div>;
        } else if ((score / questions.length) >= 0.6 && score !== questions.length) {
            additionalMessage = <div className="flex flex-col justify-center items-center">
                <p className="text-4xl bg-gradient-to-br from-lime-200 to-lime-400 bg-clip-text text-transparent">Not
                    bad! Congratulations!</p>
                <Lottie className="w-6/12" animationData={good} loop={true}/>
            </div>;
        } else {
            additionalMessage = <div className="flex flex-col justify-center items-center">
                <p className="text-4xl text-red-600 mb-10">You didn't do so well! You should do this again!</p>
                <Lottie className="w-6/12" animationData={fail} loop={true}/>
            </div>;
        }
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div
            className="flex-1 flex flex-col overflow-auto items-center bg-gradient-to-br from-indigo-200 to-indigo-600">
            {isGameComplete ? (
                    <div className="mt-32 flex flex-col justify-center items-center">
                        <p className="text-6xl bg-gradient-to-br from-lime-200 to-lime-400 bg-clip-text text-transparent mb-9">Your
                            score is {score} out of {questions.length}</p>
                        {additionalMessage}
                    </div>)
                : (
                    <>
                        <div className="flex flex-col justify-center items-center w-full mt-5">
                            <div
                                className="bg-lime-300 rounded-lg py-3 w-1/3 flex justify-center items-center shadow-md">
                                <p className="text-5xl bg-gradient-to-br from-indigo-300 to-indigo-600 bg-clip-text text-transparent">Image&word
                                    game</p>
                            </div>
                            <div className="mt-5">
                                <p className="text-5xl bg-gradient-to-br from-lime-200 to-lime-400 bg-clip-text text-transparent">Image {currentQuestionIndex + 1} of {questions.length}</p>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-center w-full mt-5">
                            <div
                                className="w-1/4 h-80 overflow-hidden bg-gray-200 rounded-lg shadow-lg border-4 border-lime-300">
                                <img src={currentQuestion.image}
                                     className="w-full h-full object-cover"/>
                            </div>
                            <form className="flex flex-col items-center space-y-4 p-6"
                                  onSubmit={handleSubmit}>
                                <input
                                    type="text"
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
