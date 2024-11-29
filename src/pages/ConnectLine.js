import {useParams} from "react-router-dom";
import {useFetchData} from "../hooks/UseFetchData";
import React, {useEffect, useMemo, useState} from "react";
import LoadingPage from "./LoadingPage";
import Lottie from "lottie-react";
import amazing from "../animations/amazing2.json";
import good from "../animations/good.json";
import fail from "../animations/fail.json";
import Results from "./Results";
import {usePostData} from "../hooks/UsePostData";
import {useUser} from "./UserProvider";

export default function ConnectLine() {

    const {subjectId, gameId} = useParams();
    const {user} = useUser();

    const {data, loading, error} = useFetchData(`/subject/${subjectId}/games/${gameId}`)

    const [images, setImages] = useState([]);  // Store generated questions
    const [score, setScore] = useState(0);
    const [maxScore, setMaxScore] = useState(5);
    const [startTime, setStartTime] = useState(null); // Store game start time
    const [endTime, setEndTime] = useState(null);
    const [isGameComplete, setIsGameComplete] = useState(false);
    const [connections, setConnections] = useState([]); // Store user connections
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedName, setSelectedName] = useState(null);

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
        if (data != null) {
            const genImages = [];
            const usedIndices = new Set(); // Track used indices to prevent duplicates
            while (genImages.length < 5 && usedIndices.size < data.length) { // Generate 5 images, adjust as needed
                const randomIndex = Math.floor(Math.random() * data.length)
                // Check if this index has already been used
                if (!usedIndices.has(randomIndex)) {
                    usedIndices.add(randomIndex); // Mark this index as used
                    genImages.push(data[randomIndex]);
                }
            }
            setImages(genImages);
        }
    }, [data]);

    const shuffleArray = (array) => {
        return [...array].sort(() => Math.random() - 0.5);
    };

    const shuffledNames = useMemo(() => shuffleArray(images), [images]);

    const handleImageClick = (image) => {
        setSelectedImage(image);
        if (selectedName) {
            makeConnection(image, selectedName);
        }
    };

    const handleNameClick = (name) => {
        setSelectedName(name);
        if (selectedImage) {
            makeConnection(selectedImage, name);
        }
    };

    const makeConnection = (image, name) => {
        //Delete that connection
        const updatedConnections = connections.filter(
            (connection) => connection.imageId !== image.gamedataId && connection.nameId !== name.gamedataId
        )
        // Add connection to the state
        setConnections([...updatedConnections, {imageId: image.gamedataId, nameId: name.gamedataId}]);

        // Reset selections
        setSelectedImage(null);
        setSelectedName(null);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // Check if the user's answer is correct
        const correctConnections = connections.filter((connection) => connection.imageId === connection.nameId);
        setScore(correctConnections.length);
        setIsGameComplete(true);  // Mark the game as complete
        setEndTime(new Date().toISOString());
    }

    // Show loading while numbers are being fetched or questions are being generated
    if (data === null || images.length === 0) {
        return <LoadingPage/>
    }

    return (
        <div
            className="flex-1 flex flex-col overflow-auto items-center bg-gradient-to-br from-indigo-200 to-indigo-600">
            {isGameComplete ? (<Results score={score} max={images.length}/>) : (
                <>
                    <div className="bg-lime-300 rounded-lg py-3 w-1/4 flex justify-center items-center shadow-md mt-5">
                        <p className="text-4xl bg-gradient-to-br from-indigo-300 to-indigo-600 bg-clip-text text-transparent">
                            Connect terms
                        </p>
                    </div>

                    {/* Game Container */}
                    <div className="relative flex flex-col justify-between items-center w-full h-full mt-4">
                        {/* Upper Row: Images */}
                        <div className="flex justify-evenly w-full mb-10">
                            {images.map((image) => (
                                <div
                                    key={image.gamedataId}
                                    className={`z-10 w-48 h-48 overflow-hidden bg-gray-200 rounded-lg shadow-lg border-4 ${
                                        selectedImage?.gamedataId === image.gamedataId ? "border-indigo-600" : "border-lime-300"
                                    } cursor-pointer`}
                                    onClick={() => handleImageClick(image)}
                                >
                                    <img src={image.imagePath} className="w-full h-full object-cover"/>
                                </div>
                            ))}
                        </div>

                        {/* Canvas for Drawing Lines */}
                        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
                            {connections.map((conn, index) => {
                                const imageIndex = images.findIndex((img) => img.gamedataId === conn.imageId);
                                const nameIndex = shuffledNames.findIndex((name) => name.gamedataId === conn.nameId)

                                const imageX = (imageIndex * 0.99 * 19 + 12.5) + "%";
                                const nameX = (nameIndex * 0.99 * 19 + 12.5) + "%";

                                return (
                                    <line
                                        key={index}
                                        x1={imageX}
                                        y1="37%"
                                        x2={nameX}
                                        y2="90%"
                                        stroke="yellow"
                                        strokeWidth="6"
                                    />
                                )
                                    ;
                            })}
                        </svg>

                        {/* Lower Row: Names */
                        }
                        <div className="flex justify-evenly w-full mt-10 z-10">
                            {shuffledNames.map((name) => (
                                <div
                                    key={name.gamedataId}
                                    className={`py-2 px-4 w-48 bg-gray-200 rounded-lg shadow-lg border-4 ${
                                        selectedName?.gamedataId === name.gamedataId ? "border-blue-500" : "border-lime-300"
                                    } flex justify-center items-center cursor-pointer`}
                                    onClick={() => handleNameClick(name)}
                                >
                                    <p className="text-2xl">{name.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <form className="flex flex-col items-center space-y-4 p-4"
                          onSubmit={handleSubmit}>
                        <button
                            type="submit"
                            className="w-60 p-2 bg-lime-300 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md"
                        >
                            <p className="text-xl bg-gradient-to-br from-indigo-300 to-indigo-600 bg-clip-text text-transparent">Submit
                                Answer</p>
                        </button>
                    </form>
                </>
            )
            }
        </div>
    )
        ;
}
