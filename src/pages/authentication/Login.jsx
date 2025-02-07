import React from "react";
import Layout from "./../../components/layouts/landing_layout/LayoutLanding.jsx";
import LoginSection from "./LoginSection.jsx";
import "./../../styles/authentication_styles/LoginStyle.css";

const Login = () => {
    return (
        <div>
            <Layout showFooter={false} navbarStyle="login-navbar">
                <LoginSection />
            </Layout>
        </div>
    );
};

export default Login;
