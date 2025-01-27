import React from "react";
import Layout from "../../components/layouts/Layout";
import LoginSection from "./LoginSection";
import './../../styles/LoginStyle.css';

const Login = () => {
    return (
        <div>
            <Layout showFooter={false} navbarStyle="login-navbar">
                <LoginSection/>
            </Layout>
        </div>
    );
};

export default Login;
