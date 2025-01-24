import React from "react";
import Layout from "../../components/layouts/Layout";
import SignUpSection from "./SignUpSection";
import Navigationbar from "./../../components/layouts/Navigationbar";
import "./../../styles/SignUpStyle.css";

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
