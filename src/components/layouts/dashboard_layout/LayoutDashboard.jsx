import React from 'react';
import Navbar from './NavbarDashboard.jsx';



const LayoutDashboard = ({ children, navbarStyle = "" }) => {
    return (
        <>
            {/* <Navbar navbarStyle={navbarStyle} /> */}
            <main>{children}</main>
        </>
    )
}

export default LayoutDashboard
