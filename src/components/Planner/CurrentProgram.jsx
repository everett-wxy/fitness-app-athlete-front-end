import React, { useState, useEffect } from "react";
import { useWorkOutProgramContext } from "../../context/WorkoutProgramContext";
import useWorkoutProgram from "../../hooks/useWorkoutProgram";
import ProgressBar from "./ProgressBar";

const CurrentProgram = ({ headerFocusDate }) => {
    useWorkoutProgram();

    const { workoutProgram } = useWorkOutProgramContext();
    const imgLink =
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

    
    const totalSessions = workoutProgram?.sessions?.length;
    const completedSessions = workoutProgram?.sessions?.filter(session => session.completed).length; 
    const percentageCompleted = (completedSessions / totalSessions) * 100;
    

    return (
        <>
            <h1 className="text-2xl font-semibold mt-5">Current Program</h1>
            <div className="mt-5 flex border border-black">
                {!workoutProgram || !workoutProgram.program ? (
                    <p>No workout program available. Please generate one.</p> // This will show if workoutProgram is empty
                ) : (
                    <>
                        <img
                            src={imgLink}
                            alt="gym image"
                            style={{
                                width: "175px",
                                height: "175px",
                                objectFit: "cover",
                            }}
                        />
                        <div className="ml-5 flex flex-col justify-center">
                            <h2 className="text-2xl font-semibold">
                                {workoutProgram.program.title} |{" "}
                                {workoutProgram.program.length}
                            </h2>
                            <p className="">{completedSessions}/{totalSessions} workout sessions</p>
                            <ProgressBar completed={completedSessions} total={totalSessions} />
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default CurrentProgram;
