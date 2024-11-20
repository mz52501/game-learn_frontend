import {useParams} from "react-router-dom";
import {useFetchData} from "../hooks/UseFetchData";
import LoadingPage from "./LoadingPage";
import React from "react";
import '../styles/Profile.css';

export default function Profile() {

    const basePoints = 100;
    const growthFactor = 1.5;

    const {userId} = useParams();

    const {data, loading, error} = useFetchData(`/profile/${userId}`)

    if (loading) return <LoadingPage/>
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div
            className="flex-1 flex flex-col overflow-auto items-center bg-gradient-to-br from-indigo-200 to-indigo-600">
            {data.map((subject) =>
                <div className="flex flex-col justify-center items-start w-2/3 mt-5">
                    <div
                        className="bg-lime-300 rounded-lg py-1 w-3/12 flex justify-center items-center shadow-md mb-4">
                        <p className="text-3xl bg-gradient-to-br from-indigo-300 to-indigo-600 bg-clip-text text-transparent">{subject.subjectName}</p>
                    </div>
                    {subject.progresses.map((progress) =>
                        <div className="w-full">
                            <div className="flex justify-start items-center mb-4">
                                <div
                                    className="bg-lime-300 rounded-lg py-1 w-2/12 flex justify-center items-center shadow-md mr-5">
                                    <p className="text-xl bg-gradient-to-br from-indigo-300 to-indigo-600 bg-clip-text text-transparent">{progress.game}</p>
                                </div>
                                <div>
                                    <p className="text-xl text-lime-300">Last
                                        played: {new Date(progress.lastPlayed).toLocaleDateString()}{" "}
                                        at {new Date(progress.lastPlayed).toLocaleTimeString()}</p>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <div className="relative w-2/3">
                                    <progress
                                        value={progress.totalPoints / (basePoints * (growthFactor ** (progress.progressLevel - 1)))}/>
                                    <div className="absolute inset-0 h-6 w-full flex justify-center items-center">
                                        <p className="text-xl text-red-400">
                                            {progress.totalPoints + "/" + basePoints * (growthFactor ** (progress.progressLevel - 1)) + " Level " + progress.progressLevel}</p>
                                    </div>
                                </div>
                                <div
                                    className="accuracy flex justify-center items-center">
                                    <p className="text-xl text-red-400">Accuracy {100 * progress.accuracy.toFixed(4)}%</p>
                                </div>
                            </div>
                            {progress.gameinstanceList.map((game, index) =>
                                <div
                                    className="bg-lime-300 rounded-lg py-1 flex justify-start items-center shadow-md mb-5">
                                    <p className="ml-4 mr-10">Game number {index + 1}</p>
                                    <p>Correct answers: {game.score} out of {game.maxScore}</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
