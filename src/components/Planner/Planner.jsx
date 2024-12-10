import React, { useState, useEffect } from "react";
import DateHeader from "./DateHeader";
import ScrollingDateSelector from "./ScrollingDateSelector";
import CurrentProgram from "./CurrentProgram";
import { useWorkOutProgramContext } from "../../context/WorkoutProgramContext";
import useWorkoutProgram from "../../hooks/useWorkoutProgram";

const Planner = () => {
    useWorkoutProgram();
    const { workoutProgram } = useWorkOutProgramContext();
    const currentDate = new Date(); 


    const [focusedDate, setFocusedDate] = useState(currentDate);
    const [headerFocusDate, setheaderFocusDate] = useState(focusedDate);

    const handleDateSelect = (selectedDate) => {
        setFocusedDate(selectedDate); 
        setheaderFocusDate(selectedDate);
    };

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
                <CurrentProgram headerFocusDate={headerFocusDate}/>
            </div>
        </div>
    );
};

export default Planner;
