import React from 'react';
import AdminDashboardSection from './AdminDashboardSection.jsx';
import LayoutDashboard from './../../components/layouts/dashboard_layout/LayoutDashboard.jsx';

const AdminDashboard = ({ currentUser }) => {
    return (
        <>
            <LayoutDashboard>
                <AdminDashboardSection currentUser={currentUser} />
            </LayoutDashboard>
        </>
    );
};

export default AdminDashboard;
