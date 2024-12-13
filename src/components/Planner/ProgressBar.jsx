import React from "react";

const ProgressBar = ({ completed, total }) => {
    const progressPercentage = total === 0 ? 0 : (completed / total) * 100;

    return (
        <div className="w-full bg-white rounded-full h-4 justify-self-end">
            <div
                className="bg-custom-accent h-4 rounded-full"
                style={{ width: `${progressPercentage}%` }}
            ></div>
        </div>
    );
};

export default ProgressBar;
