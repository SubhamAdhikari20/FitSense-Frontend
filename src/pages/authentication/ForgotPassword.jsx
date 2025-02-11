import React from "react";
import LayoutLanding from "./../../components/layouts/landing_layout/LayoutLanding.jsx";
import ForgotPasswordSection from './ForgotPasswordSection.jsx';
import './../../styles/authentication_styles/ForgotPasswordStyle.css';

const ForgotPassword = () => {
    return (
        <>
            <LayoutLanding showFooter={false} navbarStyle="forget-password-navbar">
                <ForgotPasswordSection/>
            </LayoutLanding>
        </>
    );
};

export default ForgotPassword;
