import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Subjects from "./pages/Subjects";
import SelectGame from "./pages/SelectGame";
import Addition from "./pages/Addition";
import GamePage from "./pages/GamePage";
import Profile from "./pages/Profile";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./services/ProtectedRoute";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/" element={<ProtectedRoute><Layout/></ProtectedRoute>}>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/subject" element={<Subjects/>}/>
                    <Route path="/subject/:id/games" element={<SelectGame/>}/>
                    <Route path="/subject/:subjectId/games/:gameId" element={<GamePage/>}/>
                    <Route path="/profile/:userId" element={<Profile/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
