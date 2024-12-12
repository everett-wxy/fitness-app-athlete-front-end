import React from "react";
import { useWorkOutProgramContext } from "../../context/WorkoutProgramContext";
import { useNavigate } from "react-router-dom";
import useWorkoutProgram from "../../hooks/useWorkoutProgram";

const WorkoutProgram = () => {
    const { workoutProgram } = useWorkOutProgramContext();
    const navigate = useNavigate();

    useWorkoutProgram();

    return (
        <div className="bg-custom-off-white-two rounded-lg shadow-md">
            {workoutProgram ? (
                <div className="max-w-3xl w-2/4 mx-auto mt-32">
                    {/* Program Details */}
                    <h2 className="text-4xl font-semibold text-custom-dark mb-2">
                        {workoutProgram.program.title}
                    </h2>
                    <p className="text-gray-700 mb-4">
                        {workoutProgram.program.description}
                    </p>
                    <p className="text-sm text-gray-600 mb-6">
                        <strong className="font-semibold">
                            Program Length:
                        </strong>{" "}
                        {workoutProgram.program.length} weeks |{" "}
                        <strong className="font-semibold">Frequency:</strong>{" "}
                        {workoutProgram.program.frequency} sessions / week
                    </p>

                    {/* Sessions */}
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                        Sessions:
                    </h3>
                    <ul className="space-y-6">
                        {workoutProgram.sessions.map((session) => (
                            <li
                                key={session.session_id}
                                className="p-4 bg-white rounded-lg shadow-md border border-gray-200"
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <strong className="text-custom-accent text-lg">
                                        {session.title}
                                    </strong>
                                    <span
                                        className={`text-sm font-medium ${
                                            session.completed
                                                ? "text-green-600"
                                                : "text-custom-dark-two"
                                        }`}
                                    >
                                        {session.completed
                                            ? "Completed"
                                            : "Incomplete"}
                                    </span>
                                </div>
                                <p className="text-gray-600">
                                    <strong>Week:</strong>{" "}
                                    {session.week_of_training},{" "}
                                    <strong>Session:</strong>{" "}
                                    {session.session_no} |{" "}
                                    <strong>Date:</strong>{" "}
                                    {new Date(
                                        session.session_date
                                    ).toLocaleDateString()}{" "}
                                    | <strong>Duration:</strong>{" "}
                                    {session.length} mins
                                </p>

                                {/* Session Details */}
                                <ul className="mt-4 space-y-2">
                                    {/* extract value and store in array  */}
                                    {Object.values(
                                        workoutProgram.sessionDetails
                                            .filter(
                                                (detail) =>
                                                    detail.session_id ===
                                                    session.session_id
                                            )
                                            .reduce(
                                                (groupedExercises, detail) => {
                                                    // Group by exercise name
                                                    if (
                                                        !groupedExercises[
                                                            detail.exercise_name
                                                        ]
                                                    ) {
                                                        groupedExercises[
                                                            detail.exercise_name
                                                        ] = {
                                                            exercise_name:
                                                                detail.exercise_name,
                                                            completed:
                                                                detail.completed,
                                                            sets: [],
                                                        };
                                                    }
                                                    // Push set details into the exercise group
                                                    groupedExercises[
                                                        detail.exercise_name
                                                    ].sets.push({
                                                        reps: detail.reps,
                                                        weight: detail.weight,
                                                    });
                                                    return groupedExercises;
                                                },
                                                {}
                                            )
                                    ).map((exercise, idx) => (
                                        <li
                                            key={idx}
                                            className="p-3 bg-gray-50 rounded-lg border border-gray-300"
                                        >
                                            <div className="flex justify-between items-center">
                                                <span className="font-semibold text-gray-800">
                                                    {exercise.exercise_name}
                                                </span>
                                                <span
                                                    className={`text-sm ${
                                                        exercise.completed
                                                            ? "text-green-600"
                                                            : "text-custom-dark-two"
                                                    }`}
                                                >
                                                    {exercise.completed
                                                        ? "Completed"
                                                        : "Incomplete"}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600">
                                                {exercise.sets
                                                    .map(
                                                        (set, i) =>
                                                            `${set.reps} reps @ ${set.weight} kg${
                                                                i <
                                                                exercise.sets
                                                                    .length -
                                                                    1
                                                                    ? ", "
                                                                    : ""
                                                            }`
                                                    )
                                                    .join("")}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>

                    {/* Navigate to Planner */}
                    <div className="mt-6 text-right">
                        <button
                            className="px-4 py-2 bg-custom-grey text-white rounded-lg hover:bg-custom-dark"
                            onClick={() => navigate("/planner")}
                        >
                            Go to Planner
                        </button>
                    </div>
                </div>
            ) : (
                <p className="text-center text-gray-600">
                    No workout program available. Please generate one.
                </p>
            )}
        </div>
    );
};

export default WorkoutProgram;
