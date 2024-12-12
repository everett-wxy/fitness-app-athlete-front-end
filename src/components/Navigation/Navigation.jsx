import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
    const navigate = useNavigate();

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

    const isLoggedIn = () => {
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

    const getUserRole = () => {
        const token = localStorage.getItem("token");
        if (!token) return null;

        try {
            const decoded = decodeToken(token);
            return decoded.role; // Assuming 'role' is a part of the token payload
        } catch (error) {
            console.error("Invalid token:", error);
            return null;
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove the token from localStorage
        navigate("/"); // Navigate back to the homepage
    };

    return (
        <nav className="bg-custom-dark-two text-white py-4 shadow-lg fixed top-0 left-0 w-full z-50">
            <div className="flex h-8">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-semibold">
                    <Link
                        to="/"
                        className="hover:text-custom-accent text-custom-off-white-two"
                    >
                        Athlete
                    </Link>
                </div>

                {isLoggedIn() && (
                    <div className="flex justify-between w-full px-10">
                        <div className="flex items-center space-x-6 ">
                            <Link
                                to="/workoutProgram"
                                className="text-lg hover:border-b-2 hover:border-custom-accent hover:pb-0 text-custom-off-white-two"
                            >
                                Workout Program
                            </Link>
                            <Link
                                to="/planner"
                                className="text-lg hover:border-b-2 hover:border-custom-accent hover:pb-0 text-custom-off-white-two"
                            >
                                Planner
                            </Link>
                            {getUserRole() === "admin" && (
                                <Link
                                    to="/users"
                                    className="text-lg hover:border-b-2 hover:border-custom-accent hover:pb-0 text-custom-off-white-two"
                                >
                                    Users
                                </Link>
                            )}
                        </div>
                        <button
                            onClick={handleLogout}
                            className="bg-custom-grey text-custom-off-white-two px-4 py-2 rounded hover:bg-custom-accent flex items-center justify-center"
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
