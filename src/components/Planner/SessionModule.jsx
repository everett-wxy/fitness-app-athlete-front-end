import React, { useState, useEffect } from "react";
import { useWorkOutProgramContext } from "../../context/WorkoutProgramContext";
import useWorkoutProgram from "../../hooks/useWorkoutProgram";
import { useNavigate } from "react-router-dom";

const SessionModule = ({ session }) => {
    useWorkoutProgram();
    const { workoutProgram } = useWorkOutProgramContext();
    const navigate = useNavigate();

    if (!session || !workoutProgram) {
        return <div>No session or workout program available</div>;
    }

    const findSessionDetail = workoutProgram.sessionDetails.filter(
        (sessionDetail) => sessionDetail.session_id === session.session_id
    );

    const numOfExercise = new Set(
        findSessionDetail.map((item) => item.exercise_name)
    ).size;

    const imgLink =
        "https://images.unsplash.com/photo-1604233098531-90b71b1b17a6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

    return (
        <div className="my-5 flex border border-black">
            <img
                src={imgLink}
                style={{ width: 175, height: 175, objectFit: "cover" }}
            />
            <div className="p-5 flex flex-col justify-between">
                <p className="text-1xl">
                    {workoutProgram.program.title} | Week{" "}
                    {session.week_of_training} | Session {session.session_no}
                </p>
                <p className="text-2xl font-semibold">{session.title}</p>
                <p>
                    {session.length} minutes | {numOfExercise} exercises{" "}
                </p>
                <button
                    className={`${
                        session.completed
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-blue-500 hover:bg-blue-600"
                    } text-white px-3 py-1 rounded-md`}
                    onClick={() =>
                        navigate(`/session-details/${session.session_id}`)
                    }
                >
                    {" "}
                    {session.completed ? "Review Session" : "Start Session"}
                </button>
            </div>
        </div>
    );
};

export default SessionModule;
