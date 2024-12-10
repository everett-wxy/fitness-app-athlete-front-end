import React from "react";

const ProgressBar = ({ completed, total }) => {
    const progressPercentage = total === 0 ? 0 : (completed / total) * 100;

    return (
        <div className="w-full bg-gray-200 rounded-full h-4 justify-self-end">
            <div
                className="bg-blue-500 h-4 rounded-full"
                style={{ width: `${progressPercentage}%` }}
            ></div>
        </div>
    );
};

export default ProgressBar;
