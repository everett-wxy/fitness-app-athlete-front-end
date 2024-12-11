import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
    return (
        <nav className="bg-gray-800 text-white py-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo or App Name */}
                <div className="text-xl font-bold">
                    <Link to="/" className="hover:text-blue-400">
                        Fitness App
                    </Link>
                </div>
                
                {/* Navigation Links */}
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
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
