import React from 'react';
import LayoutDashboard from "../../components/layouts/dashboard_layout/LayoutDashboard";
import UserProfileSection from './UserProfileSection.jsx';

const UserProfile = ({ currentUser }) => {
    return (
        <>
            <LayoutDashboard>
                <UserProfileSection currentUser={currentUser}/>
            </LayoutDashboard>
        </>
    );
};

export default UserProfile;
