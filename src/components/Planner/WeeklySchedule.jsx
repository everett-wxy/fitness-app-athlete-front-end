import React, { useState, useEffect } from "react";
import SessionModule from "./SessionModule";

const WeeklySchedule = ({ datesOfWeek }) => {
    // Map through the datesOfWeek array and display these content
    const datesOfWeekJSX = datesOfWeek.map((date, index) => {
        const dayOfWeek = date.toLocaleString("default", { weekday: "long" });

        // Get month name (e.g., "January", "February", etc.)
        const month = date.toLocaleString("default", { month: "long" });

        // Get day of the month (e.g., 1, 2, 3, ...)
        const dayOfMonth = date.getDate();

        return (
            <div key={index}>
                <p>
                    {dayOfWeek}, {month} {dayOfMonth}
                </p>
            </div>
        );
    });

    return (
        <div>
            <h1 className="text-2xl font-semibold mt-5">Weekly Schedule</h1>
            {!datesOfWeek && datesOfWeek.length > 0 ? (
                <p>no data available</p>
            ) : (
                datesOfWeekJSX
            )}
            <SessionModule />
        </div>
    );
};

export default WeeklySchedule;
