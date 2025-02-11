import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import {lightTheme} from './utils/theme.js';
import Home from "./pages/landing/Home";
import SignUp from "./pages/authentication/SignUp";
import Login from "./pages/authentication/Login";
import ForgotPassword from "./pages/authentication/ForgotPassword.jsx";
import Dashboard from './pages/dashboard/Dashboard.jsx';
import Workouts from "./pages/dashboard/Workouts.jsx";


function App() {
    return (
        <ThemeProvider theme={lightTheme}>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    {/* <Route path="/" element={<SignUp />} /> */}

                    {/* <Route path="/" element={<Dashboard />} />
                    <Route path="/workouts" element={<Workouts/>} /> */}


                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
