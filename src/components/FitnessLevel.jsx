import React from "react";

const FitnessLevel = ({ trainingPreferenceSubmit, handleChange, formData }) => {
    return (
        <>
            <h1 className="text-4xl font-semibold  mt-10">
                What is your current fitness level?
            </h1>
            <form
                className="flex flex-col space-y-4"
                onSubmit={trainingPreferenceSubmit}
            >
                <div className="space-y-4">
                    <div className="flex items-center">
                        <input
                            type="radio"
                            name="startingFitnessLevel"
                            value="Beginner"
                            id="beginner"
                            checked={
                                formData.startingFitnessLevel === "Beginner"
                            }
                            onChange={handleChange}
                            className="form-radio text-blue-600 h-5 w-5"
                        />
                        <label htmlFor="beginner" className="ml-2 text-lg">
                            Beginner
                        </label>
                    </div>

                    <div className="flex items-center">
                        <input
                            type="radio"
                            name="startingFitnessLevel"
                            value="Intermediate"
                            id="intermediate"
                            checked={
                                formData.startingFitnessLevel === "Intermediate"
                            }
                            onChange={handleChange}
                            className="form-radio text-blue-600 h-5 w-5"
                        />
                        <label htmlFor="intermediate" className="ml-2 text-lg">
                            Intermediate
                        </label>
                    </div>

                    <div className="flex items-center">
                        <input
                            type="radio"
                            name="startingFitnessLevel"
                            value="Advanced"
                            id="advanced"
                            checked={
                                formData.startingFitnessLevel === "Advanced"
                            }
                            onChange={handleChange}
                            className="form-radio text-blue-600 h-5 w-5"
                        />
                        <label htmlFor="advanced" className="ml-2 text-lg">
                            Advanced
                        </label>
                    </div>
                </div>

                <button
                    className="bg-custom-grey text-custom-off-white-two rounded-md p-1 hover:bg-custom-dark "
                    type="submit"
                >
                    continue
                </button>
            </form>
        </>
    );
};

export default FitnessLevel;
