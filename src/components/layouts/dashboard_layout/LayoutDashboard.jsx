import React from 'react';
import Navbar from './NavbarDashboard.jsx';
import Footer from './FooterDashboard.jsx';


const LayoutDashboard = ({ children, navbarStyle = "" }) => {
    return (
        <>
            <Navbar navbarStyle={navbarStyle} />
            <main>{children}</main>
            <Footer />
        </>
    )
}

export default LayoutDashboard
