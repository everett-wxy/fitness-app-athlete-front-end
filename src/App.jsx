import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { WorkoutProgramProvider } from "./context/WorkoutProgramContext.jsx";
import Login from "./components/Login.jsx";
import AccountCreation from "./components/AccountCreation.jsx";
import WorkoutProgram from "./components/WorkoutProgram/WorkoutProgram.jsx";
import Planner from "./components/Planner/Planner.jsx";

function App() {
    return (
        <WorkoutProgramProvider>
            <Router>
                <Routes>
                    <Route path="/register" element={<AccountCreation />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/workoutProgram"
                        element={<WorkoutProgram />}
                    />
                    <Route path="/planner" element={<Planner />} />'
                </Routes>
            </Router>
        </WorkoutProgramProvider>
    );
}

export default App;
