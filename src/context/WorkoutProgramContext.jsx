import React, { createContext, useContext, useState } from "react";

//creating the context object that holds the workout program data
const WorkoutProgramContext = createContext();

// create the custom hook that simplifies accesing the context data
export const useWorkOutProgramContext = () => {
    return useContext(WorkoutProgramContext);
};

// create the provider component that will wrap the app to provide context data
export const WorkoutProgramProvider = ({ children }) => {
    const [workoutProgram, setWorkoutProgram] = useState(null);

    const updateWorkoutProgram = (data) => {

        setWorkoutProgram(data);
    };

    return (
        <WorkoutProgramContext.Provider
            value={{ workoutProgram, updateWorkoutProgram }}
        >
            {children}
        </WorkoutProgramContext.Provider>
    );
};
