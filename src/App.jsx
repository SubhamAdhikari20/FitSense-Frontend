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
import TrainerDashboard from './pages/dashboard/TrainerDashboard.jsx';
import AdminDashboard from './pages/dashboard/AdminDashboard.jsx';
import Workouts from "./pages/dashboard/Workouts.jsx";
import UserDashboardSidebar from './components/layouts/dashboard_layout/UserDashboardSidebar.jsx';
import TrainerDashboardSidebar from './components/layouts/dashboard_layout/TrainerDashboardSidebar.jsx';
import AdminDashboardSidebar from './components/layouts/dashboard_layout/AdminDashboardSidebar.jsx';
import TrainerTrainee from './pages/dashboard/TrainerTrainee.jsx';
import AdminTrainer from './pages/dashboard/AdminTrainer.jsx';
import UserProfile from './pages/dashboard/UserProfile.jsx';
import TrainerProfile from './pages/dashboard/TrainerProfile.jsx';
import AdminProfile from "./pages/dashboard/AdminProfile.jsx";
import UserGetTrainers from './pages/dashboard/UserGetTrainers.jsx';
import TrainerAddWorkoutForUser from './pages/dashboard/TrainerAddWorkoutForUser.jsx';

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
                                <Route path="/" element={<Navigate to="/user/dashboard" />} />
                                <Route path="/user/dashboard" element={<Dashboard currentUser={currentUser}/>} />
                                <Route path="/user/workouts" element={<Workouts currentUser={currentUser} />} />
                                <Route path="/user/get-trainers" element={<UserGetTrainers />} />
                                <Route path="/user/my_profile" element={<UserProfile currentUser={currentUser} />} />
                            </Routes>
                        </div>
                    ) : currentUser.role === "trainer" ? (
                        <div className="dashboard-root">
                            <TrainerDashboardSidebar currentUser={currentUser} />
                            <Routes>
                                <Route path="/" element={<Navigate to="/trainer/dashboard" />} />
                                <Route path="/trainer/dashboard" element={<TrainerDashboard currentUser={currentUser}/>} />
                                <Route path="/trainer/trainees" element={<TrainerTrainee />} />
                                <Route path="/trainer/my_profile" element={<TrainerProfile currentUser={currentUser} />} />
                                <Route path="/trainer/add-workout/:id" element={<TrainerAddWorkoutForUser currentUser={currentUser} />} />
                            </Routes>
                        </div>
                    ) : (
                        // currentUser.role === "admin"
                        <div className="dashboard-root">
                            <AdminDashboardSidebar currentUser={currentUser} />
                            <Routes>
                                <Route path="/" element={<Navigate to="/admin/dashboard" />} />
                                <Route path="/admin/dashboard" element={<AdminDashboard currentUser={currentUser}/>} />
                                <Route path="/admin/add-trainers" element={<AdminTrainer />} />
                                <Route path="/admin/my_profile" element={<AdminProfile currentUser={currentUser} />} />
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


export default App;
