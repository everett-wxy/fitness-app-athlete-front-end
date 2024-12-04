import React from "react";

const AvailableTime = ({ trainingPreferenceSubmit, handleChange, formData }) => {
    return (
        <>
            <h1 className="text-4xl font-medium">
                How much time can you train per week?
            </h1>
            <form className="flex flex-col" onSubmit={trainingPreferenceSubmit}>
                <div className="my-4">
                    <label
                        htmlFor="daysToTrain"
                        className="text-xl font-medium"
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
                <div className="my-4">
                    <label
                        htmlFor="trainingTime"
                        className="text-xl font-medium"
                    >
                        How long will your training sessions be?
                    </label>
                    <input
                        type="radio"
                        name="availableTimetoTrain"
                        value="15-30 mins"
                        id="15-30mins"
                        checked={formData.availableTimetoTrain === "15-30 mins"}
                        onChange={handleChange}
                    />
                    <label htmlFor="15-30mins">15-30 mins</label>

                    <input
                        type="radio"
                        name="availableTimetoTrain"
                        value="45 mins"
                        id="45mins"
                        checked={formData.availableTimetoTrain === "45 mins"}
                        onChange={handleChange}
                    />
                    <label htmlFor="45mins">45 mins</label>

                    <input
                        type="radio"
                        name="availableTimetoTrain"
                        value="60 mins"
                        id="60mins"
                        checked={formData.availableTimetoTrain === "60 mins"}
                        onChange={handleChange}
                    />
                    <label htmlFor="60mins">60 mins</label>
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

export default AvailableTime;
