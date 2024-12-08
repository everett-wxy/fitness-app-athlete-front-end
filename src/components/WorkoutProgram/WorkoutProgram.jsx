import React from "react";
import { useWorkOutProgramContext } from "../../context/WorkoutProgramContext";

const WorkoutProgram = () => {
    const { workoutProgram } = useWorkOutProgramContext();
    console.log("Workout Program in Component:", workoutProgram);

    return (
        <div>
            {workoutProgram ? (
                workoutProgram.map((week, index) => (
                    <div key={index}>
                        <h3>Week {week.week}</h3>
                        {week.workouts.map((workout, i) => (
                            <div key={i}>
                                <h4>Day {workout.day}</h4>
                                {Object.entries(workout.workout).map(
                                    ([muscleGroup, details], j) => (
                                        <p key={j}>
                                            {muscleGroup}: {details.exercise} -{" "}
                                            {details.sets} sets of{" "}
                                            {details.reps} reps at{" "}
                                            {details.liftingWeights}kg
                                        </p>
                                    )
                                )}
                            </div>
                        ))}
                    </div>
                ))
            ) : (
                <p>No workout program available. Please generate one.</p>
            )}
        </div>
    );
};

export default WorkoutProgram;
