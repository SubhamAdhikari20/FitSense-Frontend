import React from 'react';
import LayoutDashboard from "../../components/layouts/dashboard_layout/LayoutDashboard";
import AdminProfileSection from './AdminProfileSection.jsx';

const AdminProfile = ({ currentUser }) => {
    return (
        <>
            <LayoutDashboard>
                <AdminProfileSection currentUser={currentUser} />
            </LayoutDashboard>
        </>
    )
}

export default AdminProfile;
