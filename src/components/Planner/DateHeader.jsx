import React from "react";

const DateHeader = ({ displayDate }) => {
    if (!displayDate) {
        return <h1>Loading...</h1>; // Fallback while `displayDate` is undefined
    }
    
    const month = displayDate.toLocaleString("default", { month: "long" });
    const year = displayDate.getFullYear();

    return (
        
        <>
            <h1 className="text-5xl font-bold my-5">
                {month}, {year}
            </h1>
        </>
    );
};

export default DateHeader;
