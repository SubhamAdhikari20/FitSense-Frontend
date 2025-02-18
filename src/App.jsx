import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { ThemeProvider, styled } from "styled-components";
import { lightTheme } from './utils/theme.js';
import { useSelector } from "react-redux";
import Home from "./pages/landing/Home";
import SignUp from "./pages/authentication/SignUp";
import Login from "./pages/authentication/Login";
import ForgotPassword from "./pages/authentication/ForgotPassword.jsx";
import Dashboard from './pages/dashboard/Dashboard.jsx';
import Workouts from "./pages/dashboard/Workouts.jsx";
import NavbarDashboard from './components/layouts/dashboard_layout/NavbarDashboard.jsx';


function App() {
    const { currentUser } = useSelector((state) => state.user);

    return (
        <ThemeProvider theme={lightTheme}>
            <Router>

                {currentUser ? (
                    <>
                        <NavbarDashboard currentUser={currentUser} />
                        <Routes>
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/workouts" element={<Workouts />} />
                        </Routes>
                    </>
                ) : (
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/forgot_password" element={<ForgotPassword />} />
                    </Routes>
                )}

            </Router>
        </ThemeProvider>
    );
}




const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text_primary};
    overflow-x: hidden;
    overflow-y: hidden;
    transition: all 0.2s ease;
`;

export default App;
