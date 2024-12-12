import React, { useState, useEffect } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const ScrollingDateSelector = ({
    displayDate,
    setDisplayDate,
    updateFocusedDate,
    focusedDate,
    datesOfWeek,
}) => {
    // getting output to display dates and day initials
    const dayInitials = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const datesOfWeekDisplayJSX = datesOfWeek.map((date, index) => {
        // Check if the current date matches the focusedDate
        const isSelected = date.toDateString() === focusedDate.toDateString();

        return (
            <div
                key={index}
                className={`flex flex-col items-center w-12 h-12 cursor-pointer ${isSelected ? "bg-custom-accent text-white" : "bg-gray-200"}`}
                onClick={() => handleDateClick(date)}
            >
                <p>{date.getDate()}</p>
                <p>{dayInitials[index]}</p>
            </div>
        );
    });

    // arrows to move to previous and next week
    const handleArrowLeft = () => {
        const newDate = new Date(displayDate);
        newDate.setDate(displayDate.getDate() - 7); // subtracting 7 days to get previous week
        setDisplayDate(newDate);
    };

    const handleArrowRight = () => {
        const newDate = new Date(displayDate);
        newDate.setDate(displayDate.getDate() + 7); // Move to next week
        setDisplayDate(newDate);
    };

    // update the focused date when a date is clicked
    const handleDateClick = (selectedDate) => {
        updateFocusedDate(selectedDate); // Call the callback function to update the focusedDate
    };

    return (
        <div className="flex justify-between items-center my-5">
            <FaArrowLeft onClick={handleArrowLeft} />
            {datesOfWeekDisplayJSX}
            <FaArrowRight onClick={handleArrowRight} />
        </div>
    );
};

export default ScrollingDateSelector;
