import { useEffect } from "react";
import { useWorkOutProgramContext } from "../context/WorkoutProgramContext"; 

const useWorkoutProgram = () => {
    const { updateWorkoutProgram, workoutProgram } = useWorkOutProgramContext();

    useEffect(() => {
        if (!workoutProgram) {
            const storedProgram = localStorage.getItem("workoutProgram");

            if (storedProgram) {
                // If it's in localStorage, update the context with that data
                updateWorkoutProgram(JSON.parse(storedProgram));
            } else {
                // Fetch the program if it's not in localStorage or context
                const fetchWorkoutProgram = async () => {
                    const response = await fetch("/workoutProgram");
                    const data = await response.json();

                    if (data.ok) {
                        updateWorkoutProgram(data.program);
                        // Store the fetched data in localStorage
                        localStorage.setItem("workoutProgram", JSON.stringify(data.program));
                    } else {
                        console.error(data.msg);
                        alert("Failed to fetch workout program");
                    }
                };

                fetchWorkoutProgram();
            }
        }
    }, [workoutProgram, updateWorkoutProgram]); // Dependency array to avoid infinite loop
};

export default useWorkoutProgram;
