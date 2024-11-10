import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Subjects from "./pages/Subjects";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="/subjects" element={<Subjects/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
