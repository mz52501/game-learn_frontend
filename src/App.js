import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Subjects from "./pages/Subjects";
import SelectGame from "./pages/SelectGame";
import Addition from "./pages/Addition";
import GamePage from "./pages/GamePage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="/subject" element={<Subjects/>}/>
                    <Route path="/subject/:id/games" element={<SelectGame/>}/>
                    <Route path="/subject/:subjectId/games/:gameId" element={<GamePage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
