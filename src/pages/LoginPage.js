import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {usePostData} from "../hooks/UsePostData";
import {useUser} from "./UserProvider";

export default function LoginPage() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const {user, setUser} = useUser();
    const navigate = useNavigate();


    useEffect(() => {
        if (user !== null) {
            navigate("/");
        }
    }, [user, navigate]);

    const {responseData, loading: loadingPost, error: postError, postData} = usePostData("/login", {
        username,
        password
    });


    const handleSubmit = async (e) => {
        e.preventDefault();
        postData();
        // If login successful, set the user and navigate
    };

    if (responseData) {
        setUser({userId: responseData.userId, username: responseData.username});
        navigate("/");
    }

    return (
        <div className="flex items-center justify-center h-full bg-gradient-to-br from-indigo-200 to-indigo-600">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            autoComplete="new-password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="new-password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    {postError && <p className="mb-4 text-red-500 text-xl">{postError.response.data}</p>}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );

}
