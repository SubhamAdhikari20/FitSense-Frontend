import React from 'react';
import LayoutDashboard from "../../components/layouts/dashboard_layout/LayoutDashboard";
import UserGetTrainersSection from './UserGetTrainersSection.jsx';


const UserGetTrainers = () => {
    return (
        <>
            <LayoutDashboard>
                <UserGetTrainersSection />
            </LayoutDashboard>
        </>
    );
};

export default UserGetTrainers;
