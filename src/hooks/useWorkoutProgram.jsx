import { useEffect } from "react";
import { useWorkOutProgramContext } from "../context/WorkoutProgramContext";
import useFetch from "./useFetch";

const useWorkoutProgram = () => {
    const { updateWorkoutProgram, workoutProgram } = useWorkOutProgramContext();
    const fetchData = useFetch();

    // useEffect(() => {
    //     if (!workoutProgram) {
    //         const storedProgram = localStorage.getItem("workoutProgram");

    //         if (storedProgram) {
    //             // If it's in localStorage, update the context with that data
    //             updateWorkoutProgram(JSON.parse(storedProgram));
    //         } else {
    //             // Fetch the program if it's not in localStorage or context
    //             const fetchWorkoutProgram = async () => {
    //                 const response = await fetch("/workoutProgram");
    //                 const data = await response.json();

    //                 if (data.ok) {
    //                     updateWorkoutProgram(data.program);
    //                     // Store the fetched data in localStorage
    //                     localStorage.setItem("workoutProgram", JSON.stringify(data.program));
    //                 } else {
    //                     console.error(data.msg);
    //                     alert("Failed to fetch workout program");
    //                 }
    //             };

    //             fetchWorkoutProgram();
    //         }
    //     }
    // }, [workoutProgram, updateWorkoutProgram]); // Dependency array to avoid infinite loop
    
    useEffect(() => {
        const fetchWorkoutProgram = async () => {
            const { ok, data } = await fetchData("/workoutProgram", "GET", null, true);

            if (ok) {
                updateWorkoutProgram(data.program);
                localStorage.setItem(
                    "workoutProgram",
                    JSON.stringify(data.program)
                );
            } else {
                console.error(data.msg);
                alert("Failed to fetch workout program");
            }
        };

        // Always check for the latest program, regardless of localStorage or context
        fetchWorkoutProgram();
    }, []);
};

/* 
1. if workoutProgram is not in context, check localStorage
2. if workoutProgram is not in localStorage, fetch it
3. update context with fetched data
4. store fetched data in localStorage
*/

export default useWorkoutProgram;

