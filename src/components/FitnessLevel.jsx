import React from "react";

const FitnessLevel = ({ trainingPreferenceSubmit, handleChange, formData }) => {
    return (
        <>
            <h1 className="text-4xl font-medium">
                What is your current fitness level?
            </h1>
            <form className="flex flex-col" onSubmit={trainingPreferenceSubmit}>
                <div>
                    <input
                        type="radio"
                        name="startingFitnessLevel"
                        value="Beginner"
                        id="beginner"
                        checked={formData.startingFitnessLevel === "Beginner"}
                        onChange={handleChange}
                    />
                    <label htmlFor="beginner">Beginner</label>
                    <input
                        type="radio"
                        name="startingFitnessLevel"
                        value="Intermediate"
                        id="intermediate"
                        checked={
                            formData.startingFitnessLevel === "Intermediate"
                        }
                        onChange={handleChange}
                    />
                    <label htmlFor="intermediate">Intermediate</label>
                    <input
                        type="radio"
                        name="startingFitnessLevel"
                        value="Advanced"
                        id="advanced"
                        checked={formData.startingFitnessLevel === "Advanced"}
                        onChange={handleChange}
                    />
                    <label htmlFor="advanced">Advanced</label>
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

export default FitnessLevel;
