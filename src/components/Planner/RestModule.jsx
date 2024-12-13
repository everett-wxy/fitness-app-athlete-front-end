import React from "react";

const RestModule = ({ date, sessions, resetDateToMidnight }) => {
    if (!sessions || sessions.length === 0) {
        return <div>No sessions</div>;
    }


    // Normalize `date` to midnight for accurate comparison
    const inputDate = new Date(date);
    inputDate.setHours(0, 0, 0, 0);

    // Check if it's a training day
    const isTrainingDay = sessions.some((session) => {
        const sessionDate = new Date(session.session_date);
        sessionDate.setHours(0, 0, 0, 0); // Normalize session date to midnight
        return sessionDate.getTime() === inputDate.getTime();
    });

    if (isTrainingDay) {
        return null;
    }

    const restDayImage =
        "https://images.unsplash.com/photo-1493548578639-b0c241186eb0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

    return (
        <div className="flex border border-gray-300 rounded-lg shadow-md">
            <img
                src={restDayImage}
                style={{ width: 130, height: 130, objectFit: "cover" }}
            />
            <div className="p-5 flex flex-col justify-between gap-3">
                <p className="text-1xl font-semibold text-custom-grey mb-2">Rest Day</p>
                <p className="text-gray-600 text-sm">
                    Take this time to recover and recharge.<br />
                    Hydrate well, eat nutritious meals, and relax.
                </p>
            </div>
        </div>
    );
};

export default RestModule;
