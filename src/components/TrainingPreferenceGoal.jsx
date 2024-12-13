import React from "react";

const TrainingPreferenceGoal = ({
    trainingPreferenceSubmit,
    handleChange,
    formData,
}) => {
    return (
        <>
            <h1 className="text-4xl font-semibold  mt-10">
                What is your training goal?
            </h1>
            <form
                className="flex flex-col space-y-4"
                onSubmit={trainingPreferenceSubmit}
            >
                <div className="space-y-4">
                    <div className="flex items-center">
                        <input
                            type="radio"
                            name="trainingGoal"
                            value="Overall Fitness"
                            id="OverallFitness"
                            checked={
                                formData.trainingGoal === "Overall Fitness"
                            }
                            onChange={handleChange}
                            className="form-radio text-blue-600 h-5 w-5"
                            disabled
                        />
                        <label
                            htmlFor="OverallFitness"
                            className="ml-2 text-lg"
                        >
                            Overall Fitness
                        </label>
                    </div>

                    <div className="flex items-center">
                        <input
                            type="radio"
                            name="trainingGoal"
                            value="Build Strength"
                            id="BuildStrength"
                            checked={formData.trainingGoal === "Build Strength"}
                            onChange={handleChange}
                            className="form-radio text-blue-600 h-5 w-5"
                            disabled
                        />
                        <label htmlFor="BuildStrength" className="ml-2 text-lg">
                            Build Strength
                        </label>
                    </div>

                    <div className="flex items-center">
                        <input
                            type="radio"
                            name="trainingGoal"
                            value="Build Muscle"
                            id="BuildMuscle"
                            checked={formData.trainingGoal === "Build Muscle"}
                            onChange={handleChange}
                            className="form-radio text-blue-600 h-5 w-5"
                        />
                        <label htmlFor="BuildMuscle" className="ml-2 text-lg">
                            Build Muscle
                        </label>
                    </div>

                    <div className="flex items-center">
                        <input
                            type="radio"
                            name="trainingGoal"
                            value="Prepare for 10K"
                            id="PrepareFor10K"
                            checked={
                                formData.trainingGoal === "Prepare for 10K"
                            }
                            onChange={handleChange}
                            className="form-radio text-blue-600 h-5 w-5"
                            disabled
                        />
                        <label htmlFor="PrepareFor10K" className="ml-2 text-lg">
                            Prepare for 10K
                        </label>
                    </div>
                </div>

                <button
                    className="bg-custom-grey text-custom-off-white-two rounded-md p-1 hover:bg-custom-dark"
                    type="submit"
                >
                    continue
                </button>
            </form>
        </>
    );
};

export default TrainingPreferenceGoal;
