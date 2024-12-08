import React from "react";

const DateHeader = ({ headerFocusDate }) => {
    const month = headerFocusDate.toLocaleString("default", { month: "long" });
    const year = headerFocusDate.getFullYear();

    return (
        <>
            <h1 className="text-2xl font-semibold">
                {month}, {year}
            </h1>
        </>
    );
};

export default DateHeader;
