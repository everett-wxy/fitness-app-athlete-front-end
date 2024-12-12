import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";

const ExerciseSet = ({ set }) => {
    if (!set) {
        return (
            <div className="text-center text-gray-500">
                No workout program available
            </div>
        );
    }

    const {
        sets,
        reps: defaultReps,
        weight: defaultWeight,
        exercise_name,
        session_id,
        completed: initialCompleted,
    } = set;

    const fetchData = useFetch();

    const [reps, setReps] = useState(defaultReps);
    const [weight, setWeight] = useState(defaultWeight);
    const [isCompleted, setIsCompleted] = useState(initialCompleted);

    const handleRepsChange = (e) => {
        setReps(e.target.value);
    };

    const handleWeightChange = (e) => {
        setWeight(e.target.value);
    };

    const handleCompleteSet = async () => {
        setIsCompleted(true); // Mark as completed locally first
        await updateSessionDetailsInDatabase();
        await checkIfAllSetsCompleted();
    };


    const updateSessionDetailsInDatabase = async () => {
        const body = {
            session_id,
            exercise_name,
            reps,
            weight,
            sets,
            completed: true,
        };

        const { ok, msg, data } = await fetchData(
            "/session-details/patch",
            "PATCH",
            body,
            true
        );

        if (ok) {
            console.log("Session updated successfully", data);
        } else {
            console.error("Error updating session", msg);
        }
    };

    const checkIfAllSetsCompleted = async () => {
        const { ok , msg, data} = await fetchData(
            "/session/checkCompletion",
            "POST",
            { session_id },
            true
        );

        if (ok) {
            console.log(msg);
        } else {
            console.error("Error checking session completion", msg);
        }

    };
    
    return (
        <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md mb-4">
            {/* Sets */}
            <div className="flex-1 text-center font-medium text-gray-700">
                <span className="block text-lg text-blue-600">Sets</span>
                {sets}
            </div>

            {/* Reps Input */}
            <div className="flex-1">
                <label className="block text-center text-sm text-gray-500">
                    Reps
                </label>
                <input
                    type="number"
                    value={reps}
                    onChange={handleRepsChange}
                    className={`w-full border ${
                        isCompleted ? "bg-gray-200" : "bg-white"
                    } p-2 rounded-md focus:ring-2 focus:ring-blue-400`}
                    disabled={isCompleted} // Disable input if set is completed
                />
            </div>

            {/* Weight Input */}
            <div className="flex-1">
                <label className="block text-center text-sm text-gray-500">
                    Weight (kg)
                </label>
                <input
                    type="number"
                    value={weight}
                    onChange={handleWeightChange}
                    className={`w-full border ${
                        isCompleted ? "bg-gray-200" : "bg-white"
                    } p-2 rounded-md focus:ring-2 focus:ring-blue-400`}
                    disabled={isCompleted} // Disable input if set is completed
                />
            </div>

            {/* Complete Button */}
            <div className="ml-4">
                <button
                    onClick={handleCompleteSet}
                    className={`px-4 py-2 rounded-md text-white font-semibold ${
                        isCompleted
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
                    }`}
                    disabled={isCompleted} // Disable the button if already completed
                >
                    {isCompleted ? "Set Completed" : "Complete Set"}
                </button>
            </div>
        </div>
    );
};

export default ExerciseSet;
