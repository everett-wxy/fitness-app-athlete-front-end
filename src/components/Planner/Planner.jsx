import React, { useState, useEffect } from "react";
import DateHeader from "./DateHeader";
import ScrollingDateSelector from "./ScrollingDateSelector";

const Planner = () => {
    const currentDate = new Date(); // current date e.g, Mon Dec 09 2024 00:18:38 GMT+0800 (Singapore Standard Time)

    const [focusedDate, setFocusedDate] = useState(currentDate);
    const [headerFocusDate, setheaderFocusDate] = useState(focusedDate);

    const handleDateSelect = (selectedDate) => {
        setFocusedDate(selectedDate); 
        setheaderFocusDate(selectedDate);
    };

    console.log("Focused Date:", focusedDate); // Check focusedDate here
    

    return (
        <div className="flex justify-center">
            <div className="w-3/4 flex flex-col">
                <div className="marginTop h-24 w-24"></div>
                <DateHeader
                    headerFocusDate={headerFocusDate}
                />
                <ScrollingDateSelector
                    headerFocusDate={headerFocusDate}
                    setheaderFocusDate={setheaderFocusDate}
                    onDateSelect={handleDateSelect}
                    focusedDate={focusedDate}
                />
            </div>
        </div>
    );
};

export default Planner;
