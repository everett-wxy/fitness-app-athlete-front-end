import React, { useState, useEffect } from "react";
import { useWorkOutProgramContext } from "../../context/WorkoutProgramContext";
import useWorkoutProgram from "../../hooks/useWorkoutProgram";

const SessionModule = () => {
    useWorkoutProgram();
    const { workoutProgram } = useWorkOutProgramContext();

    const imgLink =
        "https://images.unsplash.com/photo-1604233098531-90b71b1b17a6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

    return (
        <>
            <p>hi</p>
        </>
    );
};

export default SessionModule;
