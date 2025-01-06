import React, {useEffect, useState} from "react";
import Card from "./Card";
import {useParams} from "react-router-dom";
import {useUser} from "./UserProvider";
import {useFetchData} from "../hooks/UseFetchData";
import {usePostData} from "../hooks/UsePostData";
import Results from "./Results";

const MemoryCard = () => {

    const {subjectId, gameId} = useParams();
    const {user} = useUser();

    const {data, loading, error} = useFetchData(`/subject/${subjectId}/games/${gameId}`)
    const [flippedCards, setFlippedCards] = useState([]);
    const [cards, setCards] = useState([]);  // Store generated questions
    const [score, setScore] = useState(0);
    const [attempts, setAttempts] = useState(0);
    const [finalScore, setFinalScore] = useState(0);
    const [maxScore, setMaxScore] = useState(6);
    const [startTime, setStartTime] = useState(null); // Store game start time
    const [endTime, setEndTime] = useState(null);
    const [isGameComplete, setIsGameComplete] = useState(false);

    const {responseData, error: postError, loading: postLoading, postData} = usePostData("/gameComplete", {
        userId: user.userId,
        subjectId,
        gameId,
        startTime,
        endTime,
        score: finalScore,
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
        if (data != null) {
            const generatedQuestions = [];
            const usedIndices = new Set(); // Track used indices to prevent duplicates
            while (generatedQuestions.length < 12 && usedIndices.size < data.length) { // Generate 5 questions, adjust as needed
                const randomIndex = Math.floor(Math.random() * data.length)
                // Check if this index has already been used
                if (!usedIndices.has(randomIndex)) {
                    usedIndices.add(randomIndex); // Mark this index as used
                    const row = data[randomIndex];
                    generatedQuestions.push({content: row.imagePath, isFlipped: false});
                    generatedQuestions.push({content: row.name, isFlipped: false});
                }
            }
            setCards(shuffleArray(generatedQuestions));
        }
    }, [data]);

    useEffect(() => {
        if (score === maxScore) {
            setFinalScore(calculateScore(attempts, maxScore, maxScore));
            setIsGameComplete(true);
            setEndTime(new Date().toISOString()); // Record end time when the game is complete
        }
    }, [score]); // Trigger this effect whenever score changes

    const calculateScore = (attempts, minAttempts, maxScore) => {
        const perfectAttempts = minAttempts + 3;
        // Now we penalize for every 2.5 attempts missed, instead of each attempt
        const penaltyFactor = Math.max(0, (attempts - perfectAttempts) / (2.5)); // Penalize after every 2.5 attempts
        const scalingFactor = 1 + penaltyFactor; // Gradual increase in the scaling factor based on missed attempts
        const rawScore = maxScore / scalingFactor; // Apply the scaling factor to the score
        const finalScore = Math.max(0, Math.min(maxScore, Math.ceil(rawScore))); // Ensure score is between 0 and maxScore
        return finalScore;
    };


    const handleCardClick = (index) => {
        if (flippedCards.length === 2 || cards[index].isFlipped) return; // Prevent more than 2 flips or flipping an already flipped card

        const updatedCards = cards.map((card, idx) =>
            idx === index ? {...card, isFlipped: true} : card
        );
        setCards(updatedCards);

        const newFlippedCards = [...flippedCards, index];
        setFlippedCards(newFlippedCards);

        if (newFlippedCards.length === 2) {
            setAttempts((prev) => prev + 1);
            const [firstIndex, secondIndex] = newFlippedCards;

            const firstCard = cards[firstIndex].content;
            const secondCard = cards[secondIndex].content;

            const isMatch =
                (firstCard.includes("/") && firstCard.split("/").pop().split(".")[0].toLowerCase() === secondCard.toLowerCase()) ||
                (secondCard.includes("/") && secondCard.split("/").pop().split(".")[0].toLowerCase() === firstCard.toLowerCase());

            if (isMatch) {
                setScore((prevState => prevState + 1))
                // Match found; leave them flipped
                setFlippedCards([]);
            } else {
                // No match; flip back after a short delay
                setTimeout(() => {
                    const resetCards = updatedCards.map((card, idx) =>
                        idx === firstIndex || idx === secondIndex ? {...card, isFlipped: false} : card
                    );
                    setCards(resetCards);
                    setFlippedCards([]);
                }, 1000);
            }
        }
    };


    const shuffleArray = (array) => {
        const shuffled = [...array]; // Make a copy to avoid mutating the original array
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
        }
        return shuffled;
    };

    return (
        <div
            className="flex-1 flex flex-col overflow-auto items-center bg-gradient-to-br from-indigo-200 to-indigo-600">
            {isGameComplete ? (<Results score={finalScore} max={maxScore}/>)
                : (
                    <>
                        <div
                            className="bg-lime-300 rounded-lg py-2 mt-4 w-1/4 flex justify-center items-center shadow-md">
                            <p className="text-5xl bg-gradient-to-br from-indigo-300 to-indigo-600 bg-clip-text text-transparent">Memory
                                cards</p>
                        </div>
                        <div
                            className="flex flex-wrap justify-center items-center"
                        >
                            {cards.map((card, index) => (
                                <Card
                                    content={card.content}
                                    isFlipped={card.isFlipped}
                                    onClick={() => handleCardClick(index)}
                                />
                            ))}
                        </div>
                    </>
                )}
        </div>
    );
}

export default MemoryCard;
