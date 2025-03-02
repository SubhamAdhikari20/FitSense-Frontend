import React from "react";
import LayoutDashboard from "../../components/layouts/dashboard_layout/LayoutDashboard";
import WorkoutsSection from "./WorkoutsSection";

const Workouts = ({currentUser}) => {
    return (
        <>
            <LayoutDashboard>
                <WorkoutsSection currentUser={currentUser}/>
            </LayoutDashboard>
        </>
    );

};

export default Workouts;
