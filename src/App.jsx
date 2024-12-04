import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login.jsx";
import AccountCreation from "./components/AccountCreation.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<AccountCreation />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
}

export default App;
