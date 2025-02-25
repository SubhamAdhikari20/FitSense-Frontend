import React from "react";
import { Modal, Button, Container, Row, Col } from "react-bootstrap";
import "./../../styles/dashboard_styles/MyProfileStyle.css";
import { Avatar } from "@mui/material";

const MyProfile = ({ currentUser, show, handleClose }) => {
    return (
        <Modal show={show} onHide={handleClose} centered size="md">
            {/* Modal Header with built-in close button */}
            <Modal.Header closeButton className="profile-modal-header">
                <Modal.Title className="profile-header">My Profile</Modal.Title>
            </Modal.Header>

            <Modal.Body className="profile-modal-body">
                <Container>
                    {/* User Name */}
                    <Row className="profile-row">
                        <Col className="profile-img">
                            <Avatar
                                src={currentUser?.img}
                                style={{ cursor: "pointer", width: 60, height: 60 }}
                            >
                                {currentUser?.fullName ? currentUser.fullName[0] : "U"}
                            </Avatar>

                            <p>Change Profile Picture</p>
                        </Col>

                    </Row>

                    <Row className="profile-row">
                        <Col className="profile-details">
                            <h1>Name</h1>
                            <p>Subham Adhikari</p>
                        </Col>
                    </Row>

                    {/* Email */}
                    <Row className="profile-row">
                        <Col className="profile-details">
                            <h1>Email Address</h1>
                            <p>subhamadhikari20@gmail.com</p>
                        </Col>
                    </Row>

                    {/* Phone */}
                    <Row className="profile-row">
                        <Col className="profile-details">
                            <h1>Contact</h1>
                            <p>9845562387</p>
                        </Col>
                    </Row>

                    {/* Delete Button */}
                    <Row className="delete-button-container">
                        <Col className="text-center">
                            <Button variant="danger" className="delete-button">
                                Delete Account
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
    );
};

export default MyProfile;
