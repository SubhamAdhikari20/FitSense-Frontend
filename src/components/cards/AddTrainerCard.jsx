import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import './../../styles/cards_styles/AddTrainerCardStyle.css';
import { Avatar } from "@mui/material";

const AddTrainerCard = ({ trainer, onDelete }) => {
    const { fullName, email, phoneNumber, experience, profilePicture } = trainer;

    // trainer's name as an avatar
    const avatarLetter = fullName ? fullName.charAt(0).toUpperCase() : "U";

    return (
        <div className="trainer-card">
            <div className="trainer-card-body">
                <div className="avatar-container ">
                    <Avatar src={profilePicture} style={{ width: 50, height: 50 }}>
                        {avatarLetter}
                    </Avatar>
                </div>
                <div className="trainer-card-text">
                    <h1 className="mb-1">{fullName}</h1>
                    <p className="mb-0">{email}</p>
                    <p className="mb-0">{phoneNumber}</p>
                    <p className="mb-0">{experience} years</p>
                </div>
            </div>
            <Button variant="link" className="delete-btn" onClick={onDelete}>
                <div className="delete-icon">
                    <i className="bi bi-trash-fill" aria-hidden="true"></i>
                </div>
            </Button>
        </div>
    );
};

export default AddTrainerCard;
