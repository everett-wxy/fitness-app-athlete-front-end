import React from "react";
import { useWorkOutProgramContext } from "../../context/WorkoutProgramContext";
import { useNavigate } from "react-router-dom";
import useWorkoutProgram from "../../hooks/useWorkoutProgram";

const WorkoutProgram = () => {
    const { workoutProgram } = useWorkOutProgramContext();
    const navigate = useNavigate();

    useWorkoutProgram();

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
            {workoutProgram ? (
                <div>
                    {/* Program Details */}
                    <h2 className="text-2xl font-bold text-blue-600 mb-2">
                        {workoutProgram.program.title}
                    </h2>
                    <p className="text-gray-700 mb-4">
                        {workoutProgram.program.description}
                    </p>
                    <p className="text-sm text-gray-600 mb-6">
                        <strong className="font-semibold">Program Length:</strong> {workoutProgram.program.length} weeks |{" "}
                        <strong className="font-semibold">Frequency:</strong> {workoutProgram.program.frequency} sessions/week
                    </p>

                    {/* Sessions */}
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Sessions:</h3>
                    <ul className="space-y-6">
                        {workoutProgram.sessions.map((session) => (
                            <li
                                key={session.session_id}
                                className="p-4 bg-white rounded-lg shadow-md border border-gray-200"
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <strong className="text-blue-500 text-lg">
                                        {session.title}
                                    </strong>
                                    <span
                                        className={`text-sm font-medium ${
                                            session.completed
                                                ? "text-green-600"
                                                : "text-red-500"
                                        }`}
                                    >
                                        {session.completed ? "Completed" : "Pending"}
                                    </span>
                                </div>
                                <p className="text-gray-600">
                                    <strong>Week:</strong> {session.week_of_training},{" "}
                                    <strong>Session:</strong> {session.session_no} |{" "}
                                    <strong>Date:</strong>{" "}
                                    {new Date(session.session_date).toLocaleDateString()} |{" "}
                                    <strong>Duration:</strong> {session.length} mins
                                </p>

                                {/* Session Details */}
                                <ul className="mt-4 space-y-2">
                                    {workoutProgram.sessionDetails
                                        .filter(
                                            (detail) =>
                                                detail.session_id === session.session_id
                                        )
                                        .map((exercise, idx) => (
                                            <li
                                                key={idx}
                                                className="p-3 bg-gray-50 rounded-lg border border-gray-300"
                                            >
                                                <div className="flex justify-between items-center">
                                                    <span className="font-semibold text-gray-800">
                                                        {exercise.exercise_name}
                                                    </span>
                                                    <span
                                                        className={`text-sm ${
                                                            exercise.completed
                                                                ? "text-green-600"
                                                                : "text-red-500"
                                                        }`}
                                                    >
                                                        {exercise.completed
                                                            ? "Completed"
                                                            : "Pending"}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-600">
                                                    {exercise.sets} sets x {exercise.reps} reps @{" "}
                                                    {exercise.weight} kg
                                                </p>
                                            </li>
                                        ))}
                                </ul>
                            </li>
                        ))}
                    </ul>

                    {/* Navigate to Planner */}
                    <div className="mt-6 text-right">
                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            onClick={() => navigate("/planner")}
                        >
                            Go to Planner
                        </button>
                    </div>
                </div>
            ) : (
                <p className="text-center text-gray-600">
                    No workout program available. Please generate one.
                </p>
            )}
        </div>
    );
};

export default WorkoutProgram;
