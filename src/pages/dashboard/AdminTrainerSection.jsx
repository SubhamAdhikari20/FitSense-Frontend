import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import "./../../styles/dashboard_styles/AdminTrainerSectionStyle.css";
import AddTrainerCard from './../../components/cards/AddTrainerCard.jsx';

const AdminTrainerSection = () => {
    const [showTrainerPassword, setShowTrainerPassword] = useState(false);
    const [showTrainerConfirmPassword, setShowTrainerConfirmPassword] =
        useState(false);

    const toggleTrainerPasswordVisibility = () => {
        setShowTrainerPassword(!showTrainerPassword);
    };
    const toggleTrainerConfirmPasswordVisibility = () => {
        setShowTrainerConfirmPassword(!showTrainerConfirmPassword);
    };

    // Form fields
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [experience, setExperience] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Example
    const [trainers, setTrainers] = useState([
        {
            id: 1,
            name: "Subham Adhikari",
            email: "subhamadhikari20@gmail.com",
            contact: "9864989898",
            experience: "2 years",
        },
        {
            id: 2,
            name: "Ayush Adhikari",
            email: "ayushadhikari00@gmail.com",
            contact: "986498888",
            experience: "2 years",
        },
        {
            id: 3,
            name: "Ayush Adhikari",
            email: "ayushadhikari00@gmail.com",
            contact: "986498888",
            experience: "2 years",
        },
        {
            id: 4,
            name: "Ayush Adhikari",
            email: "ayushadhikari00@gmail.com",
            contact: "986498888",
            experience: "2 years",
        },
        {
            id: 5,
            name: "Ayush Adhikari",
            email: "ayushadhikari00@gmail.com",
            contact: "986498888",
            experience: "2 years",
        },
        {
            id: 6,
            name: "Ayush Adhikari",
            email: "ayushadhikari00@gmail.com",
            contact: "986498888",
            experience: "2 years",
        },
        {
            id: 7,
            name: "Ayush Adhikari",
            email: "ayushadhikari00@gmail.com",
            contact: "986498888",
            experience: "2 years",
        },

    ]);

    // Handler: Add a new trainer (example only)
    const handleAddTrainer = () => {
        if (!fullName || !email || !contact || !experience || !password || !confirmPassword) {
            alert("Please fill all fields!");
            return;
        }
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const newTrainer = {
            id: trainers.length + 1,
            fullName,
            email,
            contact,
            experience,
        };

        setTrainers([...trainers, newTrainer]);

        // Clear form fields
        // setFullName("");
        // setEmail("");
        // setContact("");
        // setExperience("");
        // setPassword("");
        // setConfirmPassword("");
    };

    // Handler: Delete a trainer from the list
    const handleDeleteTrainer = (id) => {
        const filtered = trainers.filter((t) => t.id !== id);
        setTrainers(filtered);
    };


    return (
        <section className="trainer-section">
            {/* Title */}
            <h1 className="page-title">Trainer Details</h1>

            <Container fluid className="trainer-container mt-3">
                <Row className="mb-4">
                    <Col>
                        <div className="total-trainer-box">
                            <span>Total Trainer: </span>
                            <span className="trainer-count">{trainers.length}</span>
                        </div>
                    </Col>
                </Row>

                <Row>
                    {/* LEFT COLUMN: Trainer Form */}
                    <Col xs={12} md={4} className="mb-4">
                        <Form className="trainer-form-wrapper">
                            <Form.Group className="mb-3" controlId="fullName">
                                <Form.Control
                                    type="text"
                                    placeholder="Name"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="email">
                                <Form.Control
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="contact">
                                <Form.Control
                                    type="text"
                                    placeholder="Contact"
                                    value={contact}
                                    onChange={(e) => setContact(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="experience">
                                <Form.Control
                                    type="text"
                                    placeholder="Experience"
                                    value={experience}
                                    onChange={(e) => setExperience(e.target.value)}
                                />
                            </Form.Group>

                            <Row className="mb-3">
                                <Col className="trainer-password-container">
                                    <Form.Group className="password-group" controlId="password">
                                        <Form.Control
                                            type={
                                                showTrainerPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            placeholder="Password"
                                            autoComplete="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Button
                                        variant="link"
                                        className="toggle-password-btn"
                                        onClick={toggleTrainerPasswordVisibility}
                                    >
                                        <i
                                            className={
                                                showTrainerPassword
                                                    ? "bi bi-eye-slash"
                                                    : "bi bi-eye"
                                            }
                                        ></i>
                                    </Button>
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col className="trainer-password-container">
                                    <Form.Group
                                        className="password-group"
                                        controlId="confirmPassword"
                                    >
                                        <Form.Control
                                            type={
                                                showTrainerConfirmPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            placeholder="Confirm Password"
                                            autoComplete="confirm-password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Button
                                        variant="link"
                                        className="toggle-password-btn"
                                        onClick={toggleTrainerConfirmPasswordVisibility}
                                    >
                                        <i
                                            className={
                                                showTrainerConfirmPassword
                                                    ? "bi bi-eye-slash"
                                                    : "bi bi-eye"
                                            }
                                        ></i>
                                    </Button>
                                </Col>
                            </Row>

                            <Button className="add-trainer-btn ">
                                Add Trainer
                            </Button>
                        </Form>
                    </Col>

                    {/* RIGHT COLUMN: Trainer List */}
                    <Col xs={12} md={8} className="trainer-info-wrapper">
                        {/* List of Trainer Cards */}
                        {trainers.map((trainer) => (
                            <AddTrainerCard
                                key={trainer.id}
                                trainer={trainer}
                                onDelete={() => handleDeleteTrainer(trainer.id)}
                            />
                        ))}
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default AdminTrainerSection;
