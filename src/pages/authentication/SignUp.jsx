import React from "react";
import "./../../styles/landing_styles/LayoutLandingStyle.css";
import "./../../styles/authentication_styles/SignUpStyle.css";
import SignUpSection from "./SignUpSection.jsx";
import Layout from "./../../components/layouts/landing_layout/LayoutLanding.jsx";

const SignUp = () => {
    return (
        <>
            {/* <Navigationbar />
            <SignUpSection /> */}
            <Layout showFooter={false} navbarStyle="signup-navbar">
                <SignUpSection />
            </Layout>
        </>
    );
};

export default SignUp;
