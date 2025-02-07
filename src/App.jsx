import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/landing/Home";
import SignUp from "./pages/authentication/SignUp";
import Login from "./pages/authentication/Login";
import { ThemeProvider } from "styled-components";
import {lightTheme} from './utils/theme.js';

function App() {
    return (
        <ThemeProvider theme={lightTheme}>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />

                    {/* <Route path="/" element={<SignUp />} /> */}

                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
