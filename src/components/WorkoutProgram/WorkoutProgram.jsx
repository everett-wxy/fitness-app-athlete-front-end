import React, { useState, useEffect } from "react";
import { useWorkOutProgramContext } from "../../context/WorkoutProgramContext";
import { useNavigate } from "react-router-dom";
import useWorkoutProgram from "../../hooks/useWorkoutProgram";

const WorkoutProgram = () => {
    const { workoutProgram } = useWorkOutProgramContext();
    const navigate = useNavigate();

    useWorkoutProgram();

    return (
        <div>
            {workoutProgram ? (
                <div>
                    <h2>{workoutProgram.program.title}</h2>
                    <p>{workoutProgram.program.description}</p>
                    <p>
                        <strong>Program Length:</strong>{" "}
                        {workoutProgram.program.length} weeks |{" "}
                        <strong>Frequency:</strong>{" "}
                        {workoutProgram.program.frequency} sessions/week
                    </p>
                    <h3>Sessions:</h3>
                    <ul>
                        {workoutProgram.sessionDetails.map((session) => (
                            <li key={session.session_id}>
                                <strong>{session.title}</strong> - Week{" "}
                                {session.week_of_training}, Session{" "}
                                {session.session_no} | Date:{" "}
                                {new Date(
                                    session.session_date
                                ).toLocaleDateString()}
                                | Duration: {session.length} mins
                                <ul>
                                    {session.workout.map((exercise, idx) => (
                                        <li key={idx}>
                                            {exercise.exercise_name}:{" "}
                                            {exercise.sets} sets x{" "}
                                            {exercise.reps} reps @{" "}
                                            {exercise.weight} kg
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onClick={() => navigate("/planner")}
                    >
                        Go to Planner
                    </button>
                </div>
            ) : (
                <p>No workout program available. Please generate one.</p>
            )}
        </div>
    );
};

export default WorkoutProgram;
