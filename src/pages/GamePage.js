import React from 'react';
import {useParams} from 'react-router-dom';
import {useFetchData} from "../hooks/UseFetchData";
import Addition from "./Addition";
import LoadingPage from "./LoadingPage";
import ImageWord from "./ImageWord";  // Adjust the import based on your folder structure

const GamePage = () => {
    const {subjectId, gameId} = useParams();  // Accessing the gameId from the URL

    const {data, loading, error} = useFetchData(`/game/${gameId}`);

    if (loading) return <LoadingPage/>

    switch (data.name) {
        case 'Addition':
            return <Addition/>;
        // You can add more cases for other games
        case 'Image&word':
            return <ImageWord/>;
        default:
            return <p>Game not found</p>;
    }
};

export default GamePage;
