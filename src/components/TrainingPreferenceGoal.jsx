import React from "react";

const TrainingPreferenceGoal = ({trainingPreferenceSubmit, handleChange, formData}) => {
    return (
        <>
            <h1 className="text-4xl font-medium">
                What is your training goal?
            </h1>
            <form className="flex flex-col" onSubmit={trainingPreferenceSubmit}>
                <div>
                    <input
                        type="radio"
                        name="trainingGoal"
                        value="Overall Fitness"
                        id="OverallFitness"
                        checked={formData.trainingGoal === "Overall Fitness"}
                        onChange={handleChange}
                    />
                    <label htmlFor="OverallFitness">Overall Fitness</label>
                    <input
                        type="radio"
                        name="trainingGoal"
                        value="Build Strength"
                        id="BuildStrength"
                        checked={formData.trainingGoal === "Build Strength"}
                        onChange={handleChange}
                    />
                    <label htmlFor="BuildStrength">Build Strength</label>
                    <input
                        type="radio"
                        name="trainingGoal"
                        value="Build Muscle"
                        id="BuildMuscle"
                        checked={formData.trainingGoal === "Build Muscle"}
                        onChange={handleChange}
                    />
                    <label htmlFor="BuildMuscle">Build Muscle</label>
                    <input
                        type="radio"
                        name="trainingGoal"
                        value="Prepare for 10K"
                        id="PrepareFor10K"
                        checked={formData.trainingGoal === "Prepare for 10K"}
                        onChange={handleChange}
                    />
                    <label htmlFor="PrepareFor10K">Prepare for 10K</label>
                </div>
                <button
                    className="border border-black rounded-md p-1 my-2"
                    type="submit"
                >
                    continue
                </button>
            </form>
        </>
    );
};

export default TrainingPreferenceGoal;
