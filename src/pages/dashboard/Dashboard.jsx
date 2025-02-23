import React from "react";
import "./../../styles/dashboard_styles/DashboardStyle.css";
import LayoutDashboard from "../../components/layouts/dashboard_layout/LayoutDashboard";
import DashboardSection from "./DashboardSection";


const Dashboard = () => {
    return (
        <>
            <LayoutDashboard>
                <DashboardSection/>
            </LayoutDashboard>
        </>
    );
};

export default Dashboard;
