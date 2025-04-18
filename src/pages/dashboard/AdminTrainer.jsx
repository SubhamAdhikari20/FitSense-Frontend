import React from "react";
import LayoutDashboard from "../../components/layouts/dashboard_layout/LayoutDashboard";
import AdminTrainerSection from './AdminTrainerSection.jsx';

const AdminTrainer = () => {
    return (
        <>
            <LayoutDashboard>
                <AdminTrainerSection />
            </LayoutDashboard>
        </>
    );
};

export default AdminTrainer;
