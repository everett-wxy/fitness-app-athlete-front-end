import React, { useState, useEffect } from "react";
import { useWorkOutProgramContext } from "../../context/WorkoutProgramContext";
import useWorkoutProgram from "../../hooks/useWorkoutProgram";
import ProgressBar from "./ProgressBar";

const CurrentProgram = ({ displayDate }) => {

    useWorkoutProgram();
    const { workoutProgram } = useWorkOutProgramContext();

    const imgLink =
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

    const totalSessions = workoutProgram?.sessions?.length;
    const completedSessions = workoutProgram?.sessions?.filter(
        (session) => session.completed
    ).length;

    // function to getWeekOfTraining 
    const getWeekOfTraining = (displayDate, sessions) => {

        const getMondayOfWeek = (date) => {
            const dayOfWeek = date.getDay();
            const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
            const monday = new Date(date);
            monday.setDate(date.getDate() + diff);
            return monday;
        };

        const resetDateToMidnight = (date) => {
            date.setHours(0,0,0,0);
            return date; 
        }

        for (const session of sessions) {
            const sessionDate = new Date(session.session_date);
            const sessionWeekMonday = getMondayOfWeek(sessionDate);
            let convertedDisplayDate = resetDateToMidnight(displayDate);
            let convertedSessionWeekMonday = resetDateToMidnight(sessionWeekMonday);
            
            // Compare weeks
            if (convertedDisplayDate.getTime() === convertedSessionWeekMonday.getTime()) {
                return session.week_of_training; // Return the matched week_of_training
            }
        }

        return null; // Return null if no match is found

    }

    const weekOfTraining = workoutProgram?.sessions ? getWeekOfTraining(displayDate, workoutProgram.sessions) : null;

    return (
        <>
            <h1 className="text-2xl font-semibold mt-5">Current Program</h1>
            <div className="mt-5 flex border border-black">
                {!workoutProgram || !workoutProgram.program || !weekOfTraining ? (
                    <p>No workout program scheduled for this week. Please generate one.</p>
                ) : (
                    <>
                        <img
                            src={imgLink}
                            alt="gym image"
                            style={{
                                width: "175px",
                                height: "175px",
                                objectFit: "cover",
                            }}
                        />
                        <div className="ml-5 flex flex-col justify-between">
                            <h2 className="text-2xl font-semibold mt-5">
                                {workoutProgram.program.title} | Week{" "}
                                {weekOfTraining}
                            </h2>
                            <div className="flex flex-col mb-5">
                                <p className="">
                                    {completedSessions}/{totalSessions} workout
                                    sessions
                                </p>
                                <ProgressBar
                                    completed={completedSessions}
                                    total={totalSessions}
                                />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default CurrentProgram;
