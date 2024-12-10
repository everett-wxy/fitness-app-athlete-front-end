import React from "react";
import SessionModule from "./sessionModule";

const SessionList = ({ date, sessions, resetDateToMidnight }) => {
    if (!sessions || sessions.length === 0) {
        return <div>No sessions</div>;
    }

    const convertedDate = resetDateToMidnight(date);

    const sessionModules = sessions.map((session, index) => {
        const sessionDate = resetDateToMidnight(new Date(session.session_date));

        if (convertedDate.getTime() === sessionDate.getTime()) {
            return <SessionModule key={index} session={session} />;
        }

        return null;
    });

    return (
        <>
            <>{sessionModules}</>
        </>
    );
};

export default SessionList;
