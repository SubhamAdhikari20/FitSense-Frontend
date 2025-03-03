import React from 'react';
import TrainerDashboardSection from './TrainerDashboardSection.jsx';
import LayoutDashboard from './../../components/layouts/dashboard_layout/LayoutDashboard.jsx';

const TrainerDashboard = ({currentUser}) => {
    return (
        <>
            <LayoutDashboard>
                <TrainerDashboardSection currentUser = {currentUser}/>
            </LayoutDashboard>
        </>
    );
};

export default TrainerDashboard
