import React from "react";
import { Button } from "react-bootstrap";
import './../../styles/cards_styles/GetTrainersCardStyle.css';
import { Avatar } from "@mui/material";

const GetTrainersCard = ({ trainer, onBook, onCancel, isBooked }) => {
    const { id, fullName, email, phoneNumber, experience, profilePicture } = trainer;

    // trainer's name as an avatar
    const avatarLetter = fullName ? fullName.charAt(0).toUpperCase() : "U";

    return (
        <div className="get_trainers-card">
            <div className="get_trainers-card-img">
                <Avatar src={profilePicture} style={{ width: 250, height: 250 }}>
                    {avatarLetter}
                </Avatar>
                {/* <img src={profilePicture} alt="trainer" width={200} /> */}
            </div>

            <div className="get_trainers-card-info">
                <h1 className="get_trainers-card-title">{fullName}</h1>
                <p className="get_trainers-card-desc">Contact: {phoneNumber}</p>
                <p className="get_trainers-card-desc">Experience: {experience} years</p>
            </div>

            <div className="get_trainers-card-btns">
                {/* <button className="get_trainers-card-btn view-btn">View Profile</button> */}

                {/* <Button className="get_trainers-card-btn book-btn">Book Session</Button> */}


                {!isBooked && (
                    <Button className="get_trainers-card-btn book-btn" onClick={() => onBook(id)}>
                        Book Session
                    </Button>
                )}
                {isBooked && (
                    <Button className="get_trainers-card-btn cancel-book-btn" variant="danger" onClick={() => onCancel(id)}>
                        Cancel Booking
                    </Button>
                )}

            </div>
        </div>
    );
};

export default GetTrainersCard;
