import React, { useState, useRef } from "react";
import { Modal, Button, Container, Row, Col } from "react-bootstrap";
import "./../../styles/dashboard_styles/MyProfileStyle.css";
import { Avatar } from "@mui/material";
import { uploadUserProfilePicture, deleteUser } from './../../apis/Api.js';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfilePictureSuccess, logout, deleteUserSuccess } from './../../redux/reducers/userSlice.js';

const MyProfile = ({ currentUser, show, handleClose }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    // const [selectedFile, setSelectedFile] = useState(null);

    // Trigger hidden file input when user clicks on avatar or text
    const handleClick = () => {
        fileInputRef.current.click();
    };

    // Handle file selection, then upload to backend
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) {
            return
        }
        // setSelectedFile(file);

        const formData = new FormData();
        formData.append("profilePicture", file);
        formData.append("email", currentUser.email);

        try {
            // Call your API to upload the image (Cloudinary will return a URL)
            const response = await uploadUserProfilePicture(formData);
            console.log("Upload response:", response.data);

            if (response.data && response.data.profilePicture) {
                // Notify parent component to update the user's profile picture in state
                dispatch(updateProfilePictureSuccess(response.data.profilePicture));
            }
        }
        catch (error) {
            console.error("Image upload failed", error);
            alert("Image upload failed. Please try again.");
        }
    };

    // Handle account deletion
    const handleDeleteAccount = async () => {
        try {
            const response = await deleteUser({ email: currentUser.email });
            console.log("Delete response:", response.data);
            if (response.data && response.data.message) {
                alert(response.data.message);
                dispatch(deleteUserSuccess());
                navigate("/login");
            }
        }
        catch (error) {
            if (error.response && error.response.status === 401) {
                // Token expired
                alert("Session expired. Please log in again.");
                dispatch(logout());
                navigate("/login");
            } 
            else {
                console.error("Failed to delete account:", error);
                alert("Failed to delete account. Please try again later.");
            }
        }
    };

    return (
        <>

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
                                    src={currentUser?.profilePicture}
                                    style={{ cursor: "pointer", width: 60, height: 60 }}
                                    onClick={handleClick}
                                >
                                    {currentUser?.fullName ? currentUser.fullName[0] : "U"}
                                </Avatar>
                                {/* Hidden file input */}
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    style={{ display: "none" }}
                                    onChange={handleImageUpload}
                                />
                                <p onClick={handleClick}>Change Profile Picture</p>
                            </Col>

                        </Row>

                        <Row className="profile-row">
                            <Col className="profile-details">
                                <h1>Name</h1>
                                <p>{currentUser?.fullName}</p>
                            </Col>
                        </Row>

                        {/* Email */}
                        <Row className="profile-row">
                            <Col className="profile-details">
                                <h1>Email Address</h1>
                                <p>{currentUser?.email}</p>
                            </Col>
                        </Row>

                        {/* Phone */}
                        <Row className="profile-row">
                            <Col className="profile-details">
                                <h1>Contact</h1>
                                <p>{currentUser?.phoneNumber}</p>
                            </Col>
                        </Row>

                        {/* Delete Button */}
                        <Row className="delete-button-container">
                            <Col className="text-center">
                                <Button variant="danger" className="delete-button" onClick={() => setShowConfirmDelete(true)}>
                                    Delete Account
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>

            {/* Confirmation Modal for Deletion */}
            <ConfirmDeleteModal
                show={showConfirmDelete}
                onClose={() => setShowConfirmDelete(false)}
                onConfirm={() => {
                    handleDeleteAccount();
                    setShowConfirmDelete(false);
                }}
            />
        </>
    );
};

export default MyProfile;



// ConfirmDeleteModel
const ConfirmDeleteModal = ({ show, onClose, onConfirm }) => {
    return (
        <Modal show={show} onHide={onClose} centered className="confirm-delete-modal">
            <Modal.Header closeButton>
                <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete your account?</Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={onClose}
                    style={{
                        textTransform: "none",
                        backgroundColor: "#6c757d",
                        color: "#fff",
                        border: "none",
                        padding: "10px 20px",
                    }}
                >
                    Cancel
                </Button>
                <Button
                    variant="primary"
                    onClick={onConfirm}
                    style={{
                        textTransform: "none",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        border: "none",
                        padding: "10px 20px",
                    }}
                >
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
};