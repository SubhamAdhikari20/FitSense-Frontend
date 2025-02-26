import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, styled } from "styled-components";
import { lightTheme } from './utils/theme.js';
import { useSelector } from "react-redux";
import './App.css';
import Home from "./pages/landing/Home";
import SignUp from "./pages/authentication/SignUp";
import Login from "./pages/authentication/Login";
import ForgotPassword from "./pages/authentication/ForgotPassword.jsx";
import Dashboard from './pages/dashboard/Dashboard.jsx';
import Workouts from "./pages/dashboard/Workouts.jsx";
import UserDashboardSidebar from './components/layouts/dashboard_layout/UserDashboardSidebar.jsx';
import TrainerDashboardSidebar from './components/layouts/dashboard_layout/TrainerDashboardSidebar.jsx';
import AdminDashboardSidebar from './components/layouts/dashboard_layout/AdminDashboardSidebar.jsx';
import TrainerTrainee from './pages/dashboard/TrainerTrainee.jsx';
import AdminTrainer from './pages/dashboard/AdminTrainer.jsx';

function App() {
    const { currentUser } = useSelector((state) => state.user);

    return (
        <ThemeProvider theme={lightTheme}>
            <Router>
                {currentUser ? (
                    currentUser.role === "user" ? (
                        <div className="dashboard-root">
                            <UserDashboardSidebar currentUser={currentUser} />
                            <Routes>
                                <Route path="/" element={<Navigate to="/dashboard" />} />
                                <Route path="/dashboard" element={<Dashboard />} />
                                <Route path="/workouts" element={<Workouts />} />
                            </Routes>
                        </div>
                    ) : currentUser.role === "trainer" ? (
                        <div className="dashboard-root">
                            <TrainerDashboardSidebar currentUser={currentUser} />
                            <Routes>
                                <Route path="/" element={<Navigate to="/dashboard" />} />
                                <Route path="/dashboard" element={<Dashboard />} />
                                <Route path="/users" element={<TrainerTrainee />} />
                            </Routes>
                        </div>
                    ) : (
                        // currentUser.role === "admin"
                        <div className="dashboard-root">
                            <AdminDashboardSidebar currentUser={currentUser} />
                            <Routes>
                                <Route path="/" element={<Navigate to="/trainers" />} />
                                <Route path="/trainers" element={<AdminTrainer />} />
                            </Routes>
                        </div>
                    )
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
