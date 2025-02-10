import React from "react";
import LayoutDashboard from "../../components/layouts/dashboard_layout/LayoutDashboard";
import WorkoutsSection from "./WorkoutsSection";

const Workouts = () => {
    return (
        <>
            <LayoutDashboard>
                <WorkoutsSection />
            </LayoutDashboard>
        </>
    );

};

export default Workouts;
