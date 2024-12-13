import React from "react";
import { useWorkOutProgramContext } from "../../context/WorkoutProgramContext";
import WeeklyScheduleDateHeader from "./WeeklyScheduleDateHeader";
import SessionList from "./SessionList";
import RestModule from "./RestModule";

const WeeklySchedule = ({ datesOfWeek }) => {
    const { workoutProgram } = useWorkOutProgramContext();

    if (!workoutProgram || !datesOfWeek || datesOfWeek.length === 0) {
        return (
            <p>No workout program or data available. Please generate one.</p>
        );
    }

    const resetDateToMidnight = (date) => {
        date.setHours(0, 0, 0, 0);
        return date;
    };


    return (
        <>
            <h1 className="text-3xl font-semibold mt-8">Weekly Schedule</h1>
            {datesOfWeek.map((date, index) => (
                <div key={index}>
                    <WeeklyScheduleDateHeader date={date} />
                    <SessionList
                        date={date}
                        sessions={workoutProgram.sessions}
                        resetDateToMidnight={resetDateToMidnight}
                    />
                    <RestModule key={index} date={date} sessions={workoutProgram.sessions} resetDateToMidnight={resetDateToMidnight}/>
                </div>
            ))}
        </>
    );
};

export default WeeklySchedule;
