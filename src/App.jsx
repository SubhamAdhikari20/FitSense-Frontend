import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import SignUp from "./pages/authentication/SignUp";
import Login from "./pages/authentication/Login";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />

                    {/* <Route path="/" element={<SignUp />} /> */}

                </Routes>
            </Router>
        </>
    );
}

export default App;
