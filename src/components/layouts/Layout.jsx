import React from "react";
import Footer from './Footer.jsx';
import Navigationbar from "./Navigationbar";
import './../../styles/LayoutStyle.css';

const Layout = ({ children, showFooter = true, navbarStyle = "" }) => {
    return (
        <>
            <Navigationbar navbarStyle={navbarStyle} />
            <main>{children}</main>
            {showFooter && <Footer />}
        </>
    );
};

export default Layout;
