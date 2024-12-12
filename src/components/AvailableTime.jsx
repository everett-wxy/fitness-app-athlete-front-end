import React from "react";

const AvailableTime = ({
    trainingPreferenceSubmit,
    handleChange,
    formData,
}) => {
    return (
        <>
            <h1 className="text-4xl font-semibold  mt-10">
                How much time can you train per week?
            </h1>
            <form className="flex flex-col space-y-5" onSubmit={trainingPreferenceSubmit}>
                <div className="flex flex-col space-y-5">
                    <label
                        htmlFor="daysToTrain"
                        className="font-semibold"
                    >
                        How many days per week can you train?
                    </label>
                    <input
                        type="range"
                        id="availableDaysToTrain"
                        name="availableDaysToTrain"
                        min="1"
                        max="7"
                        value={formData.availableDaysToTrain}
                        onChange={handleChange}
                        className="my-2"
                    />
                    <span>{formData.availableDaysToTrain} Day(s)</span>
                </div>
                <div className="flex flex-col space-y-4">
                    <label
                        htmlFor="trainingTime"
                        className="font-semibold"
                    >
                        How long will your training sessions be?
                    </label>
                    <input
                        type="range"
                        id="trainingTimeSlider"
                        name="availableTimetoTrain"
                        min="15"
                        max="60"
                        step="15"
                        value={formData.availableTimetoTrain}
                        onChange={handleChange}
                        className="my-2"
                    />
                     <div className="flex justify-between">
                        <span>15 mins</span>
                        <span>30 mins</span>
                        <span>45 mins</span>
                        <span>60 mins</span>
                    </div>
                    <span>Selected: {formData.availableTimetoTrain} mins</span>
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

export default AvailableTime;
