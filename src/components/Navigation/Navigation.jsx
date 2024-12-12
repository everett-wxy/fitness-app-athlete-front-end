import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
    const navigate = useNavigate();

    const isLoggedIn = () => {
        const decodeToken = (token) => {
            try {
                const payload = JSON.parse(atob(token.split(".")[1])); 
                // Decodes the middle part (payload) using atob(), which converts the base64-encoded string to a regular string.
                // Parses the decoded string into a JavaScript object using JSON.parse()
                return payload;
            } catch (e) {
                console.error("Invalid token:", e);
                return null;
            }
        };
        const token = localStorage.getItem("token");
        if (!token) return false;

        try {
            const decoded = decodeToken(token);
            const currentTime = Date.now() / 1000; // Current time in seconds
            return decoded.exp > currentTime; // Check if token is not expired by comparing the expiration time (exp) in the token payload to the current time
        } catch (error) {
            console.error("Invalid token:", error);
            return false;
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove the token from localStorage
        navigate("/"); // Navigate back to the homepage
    };

    return (
        <nav className="bg-gray-800 text-white py-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo or App Name */}
                <div className="text-xl font-bold">
                    <Link to="/" className="hover:text-blue-400">
                        Athlete
                    </Link>
                </div>
                
                {/* Navigation Links */}
                {isLoggedIn() && (
                    <div className="space-x-6">
                        <Link
                            to="/workoutProgram"
                            className="text-lg hover:text-blue-400"
                        >
                            Workout Program
                        </Link>
                        <Link
                            to="/planner"
                            className="text-lg hover:text-blue-400"
                        >
                            Planner
                        </Link>
                        <Link
                            to="/users"
                            className="text-lg hover:text-blue-400"
                        >
                            Users
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navigation;
