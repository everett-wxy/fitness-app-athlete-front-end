import React from "react";
import { useWorkOutProgramContext } from "../../context/WorkoutProgramContext";
import WeeklyScheduleDateHeader from "./WeeklyScheduleDateHeader";
import SessionList from "./SessionList";

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
            <h1 className="text-2xl font-semibold my-5">Weekly Schedule</h1>
            {datesOfWeek.map((date, index) => (
                <div key={index}>
                    <WeeklyScheduleDateHeader date={date} />
                    <SessionList
                        date={date}
                        sessions={workoutProgram.sessions}
                        resetDateToMidnight={resetDateToMidnight}
                    />
                </div>
            ))}
        </>
    );
};

export default WeeklySchedule;
