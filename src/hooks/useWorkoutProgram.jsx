import { useEffect } from "react";
import { useWorkOutProgramContext } from "../context/WorkoutProgramContext";
import useFetch from "./useFetch";

const useWorkoutProgram = () => {
    const { updateWorkoutProgram, workoutProgram } = useWorkOutProgramContext();
    const fetchData = useFetch();
    
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

