import React, { useEffect, useState } from 'react';
import LayoutDashboard from "../../components/layouts/dashboard_layout/LayoutDashboard";
import TrainerAddWorkoutForUserSection from "./TrainerAddWorkoutForUserSection";
import { useLocation, useParams } from "react-router-dom";
import { getUserById } from './../../apis/Api.js';

const TrainerAddWorkoutForUser = ({ currentUser }) => {
    const { state } = useLocation();
    // const trainee = state?.trainee;
    const { id } = useParams(); // trainee id from URL
    const [trainee, setTrainee] = useState(state?.trainee);

    useEffect(() => {
        // If trainee is not passed via state, fetch using the id
        if (!trainee && id) {
            getUserById(id)
                .then(response => {
                    // Assuming the API returns { trainee: { ... } }
                    setTrainee(response.data.trainee);
                })
                .catch(err => {
                    console.error("Error fetching trainee:", err);
                });
        }
    }, [id, trainee]);

    if (!trainee) {
        return <div>Loading trainee details...</div>;
    }

    return (
        <>
            <LayoutDashboard>
                <TrainerAddWorkoutForUserSection currentUser={currentUser} trainee={trainee} />
            </LayoutDashboard>
        </>
    );
};

export default TrainerAddWorkoutForUser;
