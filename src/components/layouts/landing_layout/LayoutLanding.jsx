import React from "react";
import Navbar from "./NavbarLanding.jsx";
import Footer from "./FooterLanding.jsx";

const Layout = ({ children, showFooter = true, navbarStyle = "" }) => {
    return (
        <>
            <Navbar navbarStyle={navbarStyle} />
            <main>{children}</main>
            {showFooter && <Footer />}
        </>
    );
};

export default Layout;
