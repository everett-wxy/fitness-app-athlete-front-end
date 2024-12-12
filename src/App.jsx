import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { WorkoutProgramProvider } from "./context/WorkoutProgramContext.jsx";
import Login from "./components/Login.jsx";
import AccountCreation from "./components/AccountCreation.jsx";
import WorkoutProgram from "./components/WorkoutProgram/WorkoutProgram.jsx";
import Planner from "./components/Planner/Planner.jsx";
import SessionDetails from "./components/WorkoutSession/SessionDetails.jsx";
import Navigation from "./components/Navigation/Navigation.jsx";
import Users from "./components/Users/Users.jsx";

function App() {
    return (
        <WorkoutProgramProvider>
            <Router>
                <AppContent />
            </Router>
        </WorkoutProgramProvider>
    );
}

const AppContent = () => {
    const location = useLocation();

    return (
        <div className="flex flex-col h-screen">
            {location.pathname !== "/" && <Navigation />}
            <Routes>
                <Route path="/register" element={<AccountCreation />} />
                <Route path="/" element={<Login />} />
                <Route path="/workoutProgram" element={<WorkoutProgram />} />
                <Route path="/planner" element={<Planner />} />
                <Route
                    path="/session-details/:sessionId"
                    element={<SessionDetails />}
                />
                <Route path="/users" element={<Users />} />
            </Routes>
        </div>
    );
};

export default App;
