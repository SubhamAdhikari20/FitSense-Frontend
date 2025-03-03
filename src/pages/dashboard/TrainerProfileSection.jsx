import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button, Form, Modal } from "react-bootstrap";
import { Avatar } from '@mui/material';
import './../../styles/dashboard_styles/UserProfileSectionStyle.css';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { uploadTrainerProfilePicture, deleteTrainer, updateTrainerProfileDetails } from './../../apis/Api.js';
import { updateProfilePictureSuccess, logout, deleteUserSuccess, updateUserDetails } from './../../redux/reducers/userSlice.js';


const TrainerProfileSection = ({ currentUser }) => {
    // Form state
    const [fullName, setFullName] = useState(currentUser?.fullName || "");
    const [email, setEmail] = useState(currentUser?.email || "");
    const [experience, setExperience] = useState(currentUser?.experience || "");
    const [phoneNumber, setPhoneNumber] = useState(currentUser?.phone || "");
    const [gender, setGender] = useState(currentUser?.gender || "");
    const [age, setAge] = useState(currentUser?.age || "");
    const [weight, setWeight] = useState(currentUser?.weight || "");
    const [height_ft, setHeight_ft] = useState(currentUser?.height || "");
    const [height_in, setHeight_in] = useState(currentUser?.height || "");
    const [profilePicture, setProfileImage] = useState(currentUser?.profilePicture || null);
    const [selectedFile, setSelectedFile] = useState(null);

    // Loading state for form submission
    const [loading, setLoading] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);

    // Update form fields when currentUser changes
    useEffect(() => {
        if (currentUser) {
            setFullName(currentUser.fullName || "");
            setEmail(currentUser.email || "");
            setPhoneNumber(currentUser.phoneNumber || "");
            setGender(currentUser.gender || "");
            setAge(currentUser.age || "");
            setWeight(currentUser.weight || "");
            setHeight_ft(currentUser.height_ft || "");
            setHeight_in(currentUser.height_in || "");
            setProfileImage(currentUser.profilePicture || null);
        }
    }, [currentUser]);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [showConfirmDelete, setShowConfirmDelete] = useState(false);

    // Handle image upload
    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
            setSelectedFile(file);
        }
    };

    const handleUploadImage = async () => {
        if (!selectedFile) {
            alert('Please select a file first!');
            return;
        }

        const uploadData = new FormData();
        uploadData.append('profilePicture', selectedFile);
        uploadData.append('id', currentUser.id);

        try {
            // Call your API to upload the image (Cloudinary will return a URL)
            if (!window.confirm("Are you sure you want to upload your profile picture?")) {
                return;
            }
            const response = await uploadTrainerProfilePicture(uploadData);
            console.log("Upload response:", response.data);

            if (response.data && response.data.profilePicture) {
                // Notify parent component to update the user's profile picture in state
                dispatch(updateProfilePictureSuccess(response.data.profilePicture));
                setSelectedFile(null);
                alert('Profile picture updated successfully!');
            }
        }
        catch (error) {
            console.error("Image upload failed", error);
            alert("Image upload failed. Please try again.");
        }
    }

    const handleRemoveImage = () => {
        setProfileImage(null);
        setSelectedFile(null);
    };

    const validateInputs = () => {
        // Frontend validation
        if (!fullName || !email || !phoneNumber || !gender || !age || !weight || !height_ft || !height_in) {
            alert("Please, insert all details!!!");
            setLoading(false);
            setButtonDisabled(false);
            return false;
        }

        if (!/^\S+@\S+\.\S+$/.test(email)) {
            alert("Please, enter a valid email address!");
            setLoading(false);
            setButtonDisabled(false);
            return false;
        }

        if (!/^\d+$/.test(phoneNumber)) {
            alert("Mobile number must contain only digits!");
            setLoading(false);
            setButtonDisabled(false);
            return false;
        }

        if (phoneNumber.length !== 10) {
            alert("Nepali numbers must be 10 digits!");
            setLoading(false);
            setButtonDisabled(false);
            return false;
        }

        if (age === "Select Gneder") {
            alert("Please, selet a category!!");
            setLoading(false);
            setButtonDisabled(false);
            return false;
        }

        if (!/^\d+$/.test(age)) {
            alert("Age should contain only digits!");
            setLoading(false);
            setButtonDisabled(false);
            return false;
        }

        if (!/^\d+$/.test(height_ft)) {
            alert("Height(ft) should contain only digits!");
            setLoading(false);
            setButtonDisabled(false);
            return false;
        }

        if (!/^\d+$/.test(height_in)) {
            alert("Height(in) should contain only digits!");
            setLoading(false);
            setButtonDisabled(false);
            return false;
        }

        if (!/^\d+$/.test(weight) && !/^\d+(\.\d+)?$/.test(weight)) {
            alert("Weight should contain digits and a number with up to 2 decimal places!!");
            setLoading(false);
            setButtonDisabled(false);
            return false;
        }

        return true;
    };

    // Handle Update Details
    const handleUpdateProfileDetails = async (e) => {
        e.preventDefault();
        // Prompt the user to confirm update
        
        setLoading(true);
        setButtonDisabled(true);

        if (validateInputs()) {
            try {
                if (!window.confirm("Are you sure you want to update your profile details?")) {
                    return;
                }
                
                const response = await updateTrainerProfileDetails({
                    id: currentUser.id,
                    fullName,
                    email,
                    phoneNumber,
                    experience,
                    gender,
                    age,
                    weight,
                    height_ft,
                    height_in
                });

                if (response.data?.user) {
                    dispatch(updateUserDetails(response.data.user));
                }

                alert(response.data.message || "Profile Details updated successfully!");
            }
            catch (error) {
                console.error("Operation error:", error);
                alert(error?.response?.data?.error || "Update failed!");
            } finally {
                setLoading(false);
                setButtonDisabled(false);
            }
        }
    }


    // Handle clear fields
    const handleClearFields = () => {
        setFullName("");
        setEmail("");
        setPhoneNumber("");
        setGender("");
        setAge("");
        setWeight("");
        setHeight_ft("");
        setHeight_in("");
        if (currentUser.profilePicture !== profilePicture) {
            setProfileImage(null);
        }
    };

    /*
    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Add submission logic
        const formData = {
            fullName,
            email,
            phoneNumber,
            gender,
            age,
            weight,
            height_ft,
            height_in
        };
        console.log('Form data:', formData);
    };
    */

    // Handle account deletion
    const handleDeleteAccount = async () => {
        try {
            const response = await deleteTrainer({ id: currentUser.id });
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
                // navigate("/login");
            }
            else {
                console.error("Failed to delete account:", error);
                alert("Failed to delete account. Please try again later.");
            }
        }
    };

    return (
        <section className="user-profile-section">
            <h1 className="profile-title">My Profile</h1>
            <Container fluid className="profile-container">
                <Row className="profile-container-row">
                    <Col xs={12} md={8} lg={6} className="profile-container-row-col1">
                        <div className="profile-image-section">
                            <div className="profile-image-container">
                                <Avatar
                                    sx={{
                                        width: 200,
                                        height: 200,
                                        bgcolor: '#ff6f61',
                                        fontSize: '3.5rem'
                                    }}
                                    src={profilePicture}
                                    className="avatar"
                                >
                                    {fullName[0]?.toUpperCase() || 'U'}
                                </Avatar>
                            </div>

                            <div className="image-buttons mt-3 mb-3">
                                <input
                                    type="file"
                                    id="profile-upload"
                                    hidden
                                    onChange={handleFileSelect}
                                    accept="image/*"
                                />
                                <label htmlFor="profile-upload" className="change-picture-button">
                                    Change Profile Picture
                                </label>
                                {profilePicture && (
                                    <Button
                                        variant="outline-danger"
                                        className="remove-btn"
                                        onClick={handleRemoveImage}
                                    >
                                        Remove
                                    </Button>
                                )}
                            </div>

                            <Button
                                variant="outline-danger"
                                className="upload-image-button"
                                onClick={handleUploadImage}
                                disabled={!selectedFile}
                            >
                                {/* Upload Image */}
                                {selectedFile ? 'Upload Image' : 'Select Image to Upload'}
                            </Button>
                        </div>
                    </Col>

                    <Col className="profile-container-row-col2">
                        <Form className="profile-form-wrapper">
                            <Form.Group className="mb-3" controlId="fullName">
                                <Form.Label>
                                    Name
                                </Form.Label>

                                <Form.Control
                                    type="text"
                                    placeholder="Enter your Name"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                />
                            </Form.Group>
                            <Row className="mb-3">
                                <Col >
                                    <Form.Group className="mb-0" controlId="email">
                                        <Form.Label>
                                            Email
                                        </Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </Form.Group>

                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col md={6}>
                                    <Form.Group className="mb-0" controlId="phoneNumber">

                                        <Form.Label>
                                            Contact
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter your phone number"
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-0" controlId="experience">
                                        <Form.Label>
                                            Experience
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Experience"
                                            value={experience}
                                            onChange={(e) => setExperience(e.target.value)}
                                        />
                                    </Form.Group>

                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col md={6}>
                                    <Form.Group controlId="gender">
                                        <Form.Label>
                                            Gender
                                        </Form.Label>
                                        <Form.Select
                                            value={gender}
                                            onChange={(e) => setGender(e.target.value)}
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="age">
                                        <Form.Label>
                                            Age
                                        </Form.Label>

                                        <Form.Control
                                            type="number"
                                            placeholder="Enter your age"
                                            value={age}
                                            onChange={(e) => setAge(e.target.value)}
                                        />

                                    </Form.Group>
                                </Col>

                            </Row>

                            <Row className="mb-4">
                                <Col md={4}>
                                    <Form.Group controlId="weight">
                                        <Form.Label>
                                            Weight
                                        </Form.Label>

                                        <Form.Control
                                            type="text"
                                            placeholder="Weight (kg)"
                                            value={weight}
                                            onChange={(e) => setWeight(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group controlId="height">
                                        <Form.Label>
                                            Height (ft)
                                        </Form.Label>

                                        <Form.Control
                                            type="number"
                                            placeholder="Height (feet)"
                                            autoComplete="off"
                                            value={height_ft}
                                            onChange={(e) => setHeight_ft(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group controlId="height">
                                        <Form.Label>
                                            Height (in)
                                        </Form.Label>

                                        <Form.Control
                                            type="number"
                                            placeholder="Height (in)"
                                            autoComplete="off"
                                            value={height_in}
                                            onChange={(e) => setHeight_in(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <div className="form-buttons">
                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="update-button"
                                    disabled={buttonDisabled}
                                    onClick={handleUpdateProfileDetails}
                                >
                                    {loading ? "Updating....." : "Update Details"}
                                </Button>
                                <Button
                                    variant="secondary"
                                    onClick={handleClearFields}
                                    className="clear-button"
                                >
                                    Clear Fields
                                </Button>
                            </div>
                        </Form>

                    </Col>

                    <Col className="profile-container-row-col3">
                        <div className="delete-account-section">
                            <Button
                                variant="danger"
                                onClick={() => setShowConfirmDelete(true)}
                                className="delete-button"
                            >
                                Delete Account
                            </Button>
                        </div>

                    </Col>
                </Row>
            </Container>

            {/* Confirmation Modal for Deletion */}
            <ConfirmDeleteModal
                show={showConfirmDelete}
                onClose={() => setShowConfirmDelete(false)}
                onConfirm={() => {
                    handleDeleteAccount();
                    setShowConfirmDelete(false);
                }}
            />


        </section>
    );
};

export default TrainerProfileSection;


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