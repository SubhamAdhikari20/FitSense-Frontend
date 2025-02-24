import React from 'react';
import './../../../styles/dashboard_styles/LayoutDashboardStyle.css';
import Navbar from './NavbarDashboard.jsx';

const LayoutDashboard = ({ children, navbarStyle = "" }) => {
    return (
        <>
            {/* <Navbar navbarStyle={navbarStyle} /> */}
            <main className="dashboard-layout">{children}</main>
        </>
    )
}

export default LayoutDashboard
