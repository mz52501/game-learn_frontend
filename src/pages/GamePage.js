import React from 'react';
import {useParams} from 'react-router-dom';
import {useFetchData} from "../hooks/UseFetchData";
import Addition from "./Addition";
import LoadingPage from "./LoadingPage";
import ImageWord from "./ImageWord";
import ConnectLine from "./ConnectLine";
import MemoryCard from "./MemoryCard";
import Subtraction from "./Subtraction";  // Adjust the import based on your folder structure

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
        case 'Memory cards':
            return <MemoryCard/>;
        case 'Connect terms':
            return <ConnectLine/>;
        case 'Subtraction':
            return <Subtraction/>
        default:
            return <p>Game not found</p>;
    }
};

export default GamePage;
