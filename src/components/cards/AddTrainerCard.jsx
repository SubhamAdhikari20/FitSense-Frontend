import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import './../../styles/cards_styles/AddTrainerCardStyle.css';

const AddTrainerCard = ({ trainer, onDelete }) => {
    const { name, email, contact, experience } = trainer;

    // trainer's name as an avatar
    const avatarLetter = name ? name.charAt(0).toUpperCase() : "U";

    return (
        <div className="trainer-card">
            <div className="trainer-card-body">
                <div className="trainer-card-avatar">{avatarLetter}</div>
                <div className="trainer-card-text">
                    <h1 className="mb-1">{name}</h1>
                    <p className="mb-0">{email}</p>
                    <p className="mb-0">{contact}</p>
                    <p className="mb-0">{experience}</p>
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
