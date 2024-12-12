import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useWorkOutProgramContext } from "../../context/WorkoutProgramContext";
import useWorkoutProgram from "../../hooks/useWorkoutProgram";
import Exercise from "./Exercise";

const SessionDetails = () => {
    useWorkoutProgram();
    const navigate = useNavigate();

    const { sessionId } = useParams(); // Get session ID from URL
    const { workoutProgram } = useWorkOutProgramContext();
    const [session, setSession] = useState(null);

    useEffect(() => {
        if (workoutProgram) {
            const session = workoutProgram.sessions.find(
                (session) => session.session_id === Number(sessionId)
            );
            setSession(session);
        }
    }, [workoutProgram, sessionId]);

    const sessionDetail = workoutProgram?.sessionDetails.filter(
        (sessionDetail) => sessionDetail.session_id === Number(sessionId)
    );

    const unsortedExerciseGroups = sessionDetail?.reduce(
        (newArray, oldArray) => {
            const existingGroup = newArray.find(
                (group) => group[0].exercise_name === oldArray.exercise_name
            );
            if (existingGroup) {
                existingGroup.push(oldArray);
            } else {
                newArray.push([oldArray]);
            }
            return newArray;
        },
        []
    );

    // Sort the groups by exercise_no first, and then sort within each group by sets
    const exerciseGroups = unsortedExerciseGroups
        ?.sort((groupA, groupB) => {
            // Compare exercise_no of the first exercise in each group
            const exerciseNoA = groupA[0].exercise_no;
            const exerciseNoB = groupB[0].exercise_no;
            return exerciseNoA - exerciseNoB; // Sort by exercise_no
        })
        ?.map((group) => {
            // After sorting the groups by exercise_no, now sort each group by sets
            return group.sort((a, b) => a.sets - b.sets);
        });

    const exerciseGroupsJSX = exerciseGroups?.map((exerciseSetArray, index) => {
        return <Exercise key={index} exerciseSetArray={exerciseSetArray} />;
    });

    if (!workoutProgram) {
        return <div>No workout program available</div>;
    }

    return (

            <div className="bg-custom-off-white">
                <div className="p-5 w-2/4 max-w-3xl flex-col mx-auto mt-20 ">
                    <h1 className="text-4xl font-semibold mb-3">{session?.title}</h1>
                    <h2 className="text-1xl font-semibold mb-3">
                        {workoutProgram.program.title} | Week{" "}
                        {session?.week_of_training} | Session {session?.session_no}
                    </h2>
                    {exerciseGroupsJSX}
                    <button
                        className="bg-custom-dark text-white px-4 py-2 rounded mb-5"
                        onClick={() => navigate("/planner")}
                    >
                        Back to Planner
                    </button>
                </div>
            </div>

    );
};

export default SessionDetails;
