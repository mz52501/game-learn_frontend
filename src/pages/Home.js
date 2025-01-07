import {Link, useNavigate} from "react-router-dom";
import {useUser} from "./UserProvider";
import {useEffect} from "react";

export default function Home() {
    const {user, setUser} = useUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        setUser(null); // Log the user out
    };

    return (
        <div
            className="flex-1 flex overflow-auto items-center justify-center bg-gradient-to-br from-indigo-200 to-indigo-600 relative">
            {/* Logout Button */}
            <button
                className="absolute top-4 right-4 bg-red-600 hover:bg-red-400 text-2xl text-white font-bold py-3 px-10 rounded"
                onClick={handleLogout}
            >
                Log Out
            </button>

            {/* Play Button */}
            <Link
                className="group bg-lime-300 hover:bg-lime-100 rounded-lg px-48 py-20 shadow-md"
                to="subject"
            >
                <p className="text-7xl bg-gradient-to-br from-indigo-300 to-indigo-600 bg-clip-text text-transparent group-hover:from-indigo-500 group-hover:to-indigo-800">
                    Play
                </p>
            </Link>
        </div>
    );
}
