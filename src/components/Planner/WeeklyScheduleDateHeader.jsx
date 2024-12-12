import React from "react";

const WeeklyScheduleDateHeader = ({ date }) => {
    const dayOfWeek = date.toLocaleString("default", { weekday: "long" });
    const month = date.toLocaleString("default", { month: "long" });
    const dayOfMonth = date.getDate();

    return (
        <h1 className="text-2xl font-semibold my-5">
            {dayOfWeek}, {month} {dayOfMonth}
        </h1>
    );
};

export default WeeklyScheduleDateHeader;
