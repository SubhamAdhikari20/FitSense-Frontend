import React from "react";
import LayoutLanding from "./../../components/layouts/landing_layout/LayoutLanding.jsx";
import LoginSection from "./LoginSection.jsx";
import "./../../styles/authentication_styles/LoginStyle.css";

const Login = () => {
    return (
        <>
            <LayoutLanding showFooter={false} navbarStyle="login-navbar">
                <LoginSection />
            </LayoutLanding>
        </>
    );
};

export default Login;
