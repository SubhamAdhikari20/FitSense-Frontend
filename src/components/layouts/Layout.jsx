import React from "react";
import Footer from "./Footer";
import Navigationbar from "./Navigationbar";
import './../../styles/LayoutStyle.css';

const Layout = ({ children }) => {
    return (
        <>
            <div className="banner-section-outer">
                <Navigationbar />
                <div>{children}</div>
            </div>

        {/* <Footer /> */}
        </>
    );
};

export default Layout;
