import React, { useState, useEffect } from "react";
import DateHeader from "./DateHeader";
import ScrollingDateSelector from "./ScrollingDateSelector";
import CurrentProgram from "./CurrentProgram";
import { useWorkOutProgramContext } from "../../context/WorkoutProgramContext";
import useWorkoutProgram from "../../hooks/useWorkoutProgram";
import WeeklySchedule from "./WeeklySchedule";

const Planner = () => {
    useWorkoutProgram();
    const { workoutProgram } = useWorkOutProgramContext();
    

    const getMondayOfCurrentWeek = (date) => {
        // get the day of the week for the current date in numbers, 0 represents Sunday, 1 represents Monday
        const dayOfWeekAsNumber = date.getDay();

        // figure out how many days to subtract to get to Monday of that same week
        const diffToMonday =
            dayOfWeekAsNumber === 0 ? -6 : 1 - dayOfWeekAsNumber;

        // getting date for monday of the current week
        const monday = new Date(date);
        monday.setDate(date.getDate() + diffToMonday); // getDate() returns the day of the month (1-31)

        return monday;
    };

    const updateFocusedDate = (selectedDate) => {
        setFocusedDate(selectedDate);
    };

    // function to update dates of current week for display
    const updatesDatesOfWeek = (displayDate) => {
        // getting the dates for the week in an array
        const datesOfCurrentWeek = [];

        for (let i = 0; i < 7; i++) {
            const date = new Date(displayDate);
            date.setDate(displayDate.getDate() + i);
            datesOfCurrentWeek.push(date);
        }

        setDatesOfWeek(datesOfCurrentWeek);
    };

    const currentDate = new Date();
    const [focusedDate, setFocusedDate] = useState(currentDate);
    const [displayDate, setDisplayDate] = useState(
        getMondayOfCurrentWeek(currentDate)
    ); // displayDate is set to monday of the current week of focusedDate
    const [datesOfWeek, setDatesOfWeek] = useState([]);

    // update displayDate whenever focusedDate changes and on initial render
    useEffect(() => {
        const mondayOfCurrentWeek = getMondayOfCurrentWeek(focusedDate);
        setDisplayDate(mondayOfCurrentWeek);
    }, [focusedDate]);

    // set value for state 'datesOfWeek' whenever 'displayDate' changes
    useEffect(() => {
        updatesDatesOfWeek(displayDate);
    }, [displayDate]);

    return (
        <div className="flex justify-center bg-custom-off-white-two min-h-screen overflow-auto">
            <div className="w-2/4 max-w-3xl flex flex-col mt-20 bg-custom-off-white-two">
                <div className="marginTop h-5 w-24"></div>
                <DateHeader displayDate={displayDate} />
                <ScrollingDateSelector
                    displayDate={displayDate}
                    setDisplayDate={setDisplayDate}
                    updateFocusedDate={updateFocusedDate}
                    focusedDate={focusedDate}
                    datesOfWeek={datesOfWeek}
                    setDatesOfWeek={setDatesOfWeek}
                />
                <CurrentProgram displayDate={displayDate} />
                <WeeklySchedule datesOfWeek={datesOfWeek}/>
            </div>
        </div>
    );
};

export default Planner;
