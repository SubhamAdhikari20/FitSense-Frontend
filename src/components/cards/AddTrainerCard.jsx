import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import './../../styles/cards_styles/AddTrainerCardStyle.css';
import { Avatar } from "@mui/material";

const AddTrainerCard = ({ trainer, onDelete }) => {
    const { id, fullName, email, phoneNumber, experience, profilePicture } = trainer;

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
                    <h1 className="mb-1" style={{ fontWeight: "400", color: "red" }}>
                        <span style={{ fontWeight: "600", color: "black" }}>Name: </span>{fullName}
                    </h1>

                    <p className="mb-0" style={{ fontWeight: "400" }}>
                        <span style={{ fontWeight: "500", fontSize: "inherit" }}>Email: </span>{email}
                    </p>

                    <p className="mb-0" style={{ fontWeight: "400" }}>
                        <span style={{ fontWeight: "500", fontSize: "inherit" }}>Contact: </span>{phoneNumber}
                    </p>

                    <p className="mb-0" style={{ fontWeight: "400" }}>
                        <span style={{ fontWeight: "500", fontSize: "inherit" }}>Experirnce: </span>{experience} years
                    </p>
                </div>
            </div>
            <Button variant="link" className="delete-btn" onClick={() => onDelete(id)}>
                <div className="delete-icon">
                    <i className="bi bi-trash-fill" aria-hidden="true"></i>
                </div>
            </Button>
        </div>
    );
};

export default AddTrainerCard;
