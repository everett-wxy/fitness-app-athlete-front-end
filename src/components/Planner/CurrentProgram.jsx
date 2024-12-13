import React, { useState, useEffect } from "react";
import { useWorkOutProgramContext } from "../../context/WorkoutProgramContext";
import useWorkoutProgram from "../../hooks/useWorkoutProgram";
import ProgressBar from "./ProgressBar";

const CurrentProgram = ({ displayDate }) => {
    useWorkoutProgram();
    const { workoutProgram } = useWorkOutProgramContext();

    const imgLink =
        "https://images.unsplash.com/photo-1506197061617-7f5c0b093236?q=80&w=2018&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

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
            date.setHours(0, 0, 0, 0);
            return date;
        };

        for (const session of sessions) {
            const sessionDate = new Date(session.session_date);
            const sessionWeekMonday = getMondayOfWeek(sessionDate);
            let convertedDisplayDate = resetDateToMidnight(displayDate);
            let convertedSessionWeekMonday =
                resetDateToMidnight(sessionWeekMonday);

            // Compare weeks
            if (
                convertedDisplayDate.getTime() ===
                convertedSessionWeekMonday.getTime()
            ) {
                return session.week_of_training; // Return the matched week_of_training
            }
        }

        return null; // Return null if no match is found
    };

    const weekOfTraining = workoutProgram?.sessions
        ? getWeekOfTraining(displayDate, workoutProgram.sessions)
        : null;

    return (
        <>
            <h1 className="text-3xl font-semibold mt-6 text-custom-dark">
                Current Program
            </h1>

            <div className="mt-6 flex flex-col md:flex-row bg-gray-100 rounded-lg shadow-lg p-3">
                {!workoutProgram ||
                !workoutProgram.program ||
                !weekOfTraining ? (
                    <p className="text-center text-gray-600 text-lg">
                        No workout program scheduled for this week. Please
                        generate one.
                    </p>
                ) : (
                    <>
                        <img
                            src={imgLink}
                            alt="gym image"
                            className="w-32 h-32 object-cover rounded-lg shadow-md border-2 border-gray-300"
                        />
                        <div className="ml-3     flex flex-col justify-between flex-grow p-2">
                            <h2 className="text-lg font-semibold text-gray-900">
                                {workoutProgram.program.title} | Week{" "}
                                {weekOfTraining}
                            </h2>
                            <div className="flex flex-col mt-4">
                                <p className="text-gray-700 text-lg mb-2">
                                    {completedSessions}/{totalSessions} workout
                                    sessions completed
                                </p>
                                <ProgressBar
                                    completed={completedSessions}
                                    total={totalSessions}
                                    className="mt-2"
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
