import React from "react";
import LayoutDashboard from "../../components/layouts/dashboard_layout/LayoutDashboard";
import TrainerTraineeSection from './TrainerTraineeSection.jsx';

const TrainerTrainee = () => {
    return (
        <>
            <LayoutDashboard>
                <TrainerTraineeSection />
            </LayoutDashboard>
        </>
    );
};

export default TrainerTrainee;
