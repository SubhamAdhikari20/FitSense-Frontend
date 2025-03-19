import React from "react";
import { Button } from "react-bootstrap";
import './../../styles/cards_styles/GetTraineeCardStyle.css';
import { Avatar } from "@mui/material";


const GetTraineeCard = ({ trainee, onAddWorkout }) => {
    const { id, fullName, phoneNumber, email, profilePicture } = trainee;
    const avatarLetter = fullName ? fullName.charAt(0).toUpperCase() : "U";

    return (
        <div className="get_trainees-card">
            <div className="get_trainees-card-img">
                <Avatar src={profilePicture} style={{ width: 250, height: 250 }}>
                    {avatarLetter}
                </Avatar>
                {/* <img src={profilePicture} alt="trainer" width={200} /> */}
            </div>

            <div className="get_trainees-card-info">
                <h1 className="get_trainees-card-title">{fullName}</h1>
                <p className="get_trainees-card-desc">Contact: {phoneNumber}</p>
                <p className="get_trainees-card-desc">Email: {email}</p>
            </div>

            <div className="get_trainees-card-btns">
                <Button className="get_trainees-card-btn book-btn" onClick={() => onAddWorkout(trainee)}>
                    Add Workout
                </Button>

            </div>
        </div>
    )
}

export default GetTraineeCard
