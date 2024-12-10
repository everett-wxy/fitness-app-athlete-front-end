import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useWorkOutProgramContext } from "../../context/WorkoutProgramContext";

const SessionDetails = () => {
    const { state } = useLocation(); // Retrieve session data from state
    const { sessionId } = useParams(); // Get session ID from URL
    const { workoutProgram } = useWorkOutProgramContext();
    
    console.log(state?.session); // Logs the session data passed from the previous page

    // Find session details for the given session_id
    const sessionDetails = workoutProgram.sessionDetails.filter(
        (detail) => detail.session_id === parseInt(sessionId)
    );

    // Manage updates for sets, reps, and weights
    const [updatedDetails, setUpdatedDetails] = useState(sessionDetails);

    const handleUpdate = (index, field, value) => {
        const updated = [...updatedDetails];
        updated[index][field] = value;
        setUpdatedDetails(updated);
    };

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-5">
                {state?.session?.title} - {state?.session?.length} minutes
            </h1>
            <div>
                {updatedDetails.map((exercise, index) => (
                    <div key={exercise.id} className="mb-3">
                        <p className="font-semibold">{exercise.exercise_name}</p>
                        <div className="flex space-x-3">
                            <input
                                type="number"
                                value={exercise.sets}
                                onChange={(e) =>
                                    handleUpdate(index, "sets", e.target.value)
                                }
                                className="border p-2"
                                placeholder="Sets"
                            />
                            <input
                                type="number"
                                value={exercise.reps}
                                onChange={(e) =>
                                    handleUpdate(index, "reps", e.target.value)
                                }
                                className="border p-2"
                                placeholder="Reps"
                            />
                            <input
                                type="number"
                                value={exercise.weight}
                                onChange={(e) =>
                                    handleUpdate(index, "weight", e.target.value)
                                }
                                className="border p-2"
                                placeholder="Weight"
                            />
                        </div>
                    </div>
                ))}
            </div>
            <button
                onClick={() => console.log("Updated Details", updatedDetails)}
                className="bg-green-500 text-white px-3 py-1 mt-5 rounded-md"
            >
                Save Progress
            </button>
        </div>
    );
};

export default SessionDetails;
