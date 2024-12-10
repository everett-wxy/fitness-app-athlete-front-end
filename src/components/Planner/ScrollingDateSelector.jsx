import React, { useState, useEffect } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const ScrollingDateSelector = ({
    headerFocusDate,
    setheaderFocusDate,
    onDateSelect,
    focusedDate
}) => {
    const [weekDates, setWeekDates] = useState([]);

    const getHeaderWeekDates = (focusedDateForHeader) => {
        const dayOfWeek = focusedDateForHeader.getDay();
        const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

        // creating new instance of date object to get date for monday of current week
        const monday = new Date(focusedDateForHeader);
        monday.setDate(focusedDateForHeader.getDate() + diffToMonday);

        const weekDates = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(monday);
            date.setDate(monday.getDate() + i);
            weekDates.push(date);
        }

        return weekDates;
    };

    useEffect(() => {
        setWeekDates(getHeaderWeekDates(headerFocusDate));
    }, [headerFocusDate]);

    const handleArrowLeft = () => {
        const newDate = new Date(headerFocusDate);
        newDate.setDate(headerFocusDate.getDate() - 7); // subtracting 7 days to get previous week
        setheaderFocusDate(newDate);
    };

    const handleArrowRight = () => {
        const newDate = new Date(headerFocusDate);
        newDate.setDate(headerFocusDate.getDate() + 7); // Move to next week
        setheaderFocusDate(newDate);
    };

    const handleDateClick = (selectedDate) => {
        onDateSelect(selectedDate); // Call the callback function to update the focusedDate
    };

    const dayInitials = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const datesOfWeek = weekDates.map((date, index) => {
        // Check if the current date matches the focusedDate
        const isSelected = date.toDateString() === focusedDate.toDateString();

        return (
            <div
                key={index}
                className={`flex flex-col items-center w-12 h-12 cursor-pointer ${isSelected ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => handleDateClick(date)}
            >
                <p>{date.getDate()}</p>
                <p>{dayInitials[index]}</p>
            </div>
        );
    });

    return (
            <div className="flex justify-between items-center my-5">
                <FaArrowLeft onClick={handleArrowLeft} />
                {datesOfWeek}
                <FaArrowRight onClick={handleArrowRight} />
            </div>
    );
};

export default ScrollingDateSelector;
