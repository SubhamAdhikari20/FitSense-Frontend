import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
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

    const navigate = useNavigate();

    // Form fields
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [experience, setExperience] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const validateInputs = () => {
        // Frontend validation
        if (!fullName || !email || !phoneNumber || !experience || !password || !confirmPassword) {
            alert("Please, insert all details!!!");
            setLoading(false);
            setButtonDisabled(false);
            return false;
        }

        if (password !== confirmPassword) {
            alert("Passwords and Confirm Password don't match!");
            setLoading(false);
            setButtonDisabled(false);
            return false;
        }

        if (!/^\S+@\S+\.\S+$/.test(email)) {
            alert("Please enter a valid email address!");
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

        if (!/^\d+$/.test(experience)) {
            alert("Experience must contain only digits!");
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

        if (experience.length !== 2) {
            alert("Experience must be 2 digits!");
            setLoading(false);
            setButtonDisabled(false);
            return false;
        }

        if (password.length < 8) {
            alert("Password must be at least 8 characters!");
            setLoading(false);
            setButtonDisabled(false);
            return false;
        }

        // if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password)) {
        //     alert("Password must contain 8+ characters with uppercase, lowercase, and number");
        //     setLoading(false);
        //     setButtonDisabled(false);
        //     return false;
        // }

        return true;
    };



    // Example
    const [trainers, setTrainers] = useState([
        {
            id: 1,
            name: "Subham Adhikari",
            email: "subhamadhikari20@gmail.com",
            phoneNumber: "9864989898",
            experience: "2 years",
        },
        {
            id: 2,
            name: "Ayush Adhikari",
            email: "ayushadhikari00@gmail.com",
            phoneNumber: "986498888",
            experience: "2 years",
        },
        {
            id: 3,
            name: "Ayush Adhikari",
            email: "ayushadhikari00@gmail.com",
            phoneNumber: "986498888",
            experience: "2 years",
        },
        {
            id: 4,
            name: "Ayush Adhikari",
            email: "ayushadhikari00@gmail.com",
            phoneNumber: "986498888",
            experience: "2 years",
        },
        {
            id: 5,
            name: "Ayush Adhikari",
            email: "ayushadhikari00@gmail.com",
            phoneNumber: "986498888",
            experience: "2 years",
        },
        {
            id: 6,
            name: "Ayush Adhikari",
            email: "ayushadhikari00@gmail.com",
            phoneNumber: "986498888",
            experience: "2 years",
        },
        {
            id: 7,
            name: "Ayush Adhikari",
            email: "ayushadhikari00@gmail.com",
            phoneNumber: "986498888",
            experience: "2 years",
        },

    ]);

    // Handler: Add a new trainer (example only)
    const handleAddTrainer = async (e) => {
        e.preventDefault();

        if (validateInputs()) {
            await registerTrainer({
                fullName: fullName,
                email: email,
                phoneNumber: phoneNumber,
                password: password,
                experience: experience
            })
                .then((res) => {
                    alert(res.data.message || "Trainer Account created successfully!");
                    
                })
                .catch((error) => {
                    console.error("Registration error response:", error.response);
                    alert(error?.response?.data?.error || "Registration failed. Please try again.");
                })
        }

        const newTrainer = {
            fullName,
            email,
            phoneNumber,
            experience,
        };

        setTrainers([...trainers, newTrainer]);

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

                            <Form.Group className="mb-3" controlId="phoneNumber">
                                <Form.Control
                                    type="text"
                                    placeholder="Contact"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="experience">
                                <Form.Control
                                    type="number"
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
