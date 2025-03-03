import React from "react";
import "./../../styles/dashboard_styles/DashboardStyle.css";
import LayoutDashboard from "../../components/layouts/dashboard_layout/LayoutDashboard";
import DashboardSection from "./DashboardSection";


const Dashboard = ({ currentUser }) => {
    return (
        <>
            <LayoutDashboard>
                <DashboardSection currentUser={currentUser} />
            </LayoutDashboard>
        </>
    );
};

export default Dashboard;
