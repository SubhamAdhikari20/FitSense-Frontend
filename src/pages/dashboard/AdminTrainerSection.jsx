import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./../../styles/dashboard_styles/AdminTrainerSectionStyle.css";
import AddTrainerCard from './../../components/cards/AddTrainerCard.jsx';
import { registerTrainer, getAllTrainers, deleteTrainer } from './../../apis/Api.js';
import { useDispatch } from "react-redux";

const AdminTrainerSection = ({ currentUser }) => {
    // fetchAllTrainers();
    const dispatch = useDispatch();

    // Form fields
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [experience, setExperience] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Loading state for form submission
    const [loading, setLoading] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);

    // Loading state for form submission
    const [showTrainerPassword, setShowTrainerPassword] = useState(false);
    const [showTrainerConfirmPassword, setShowTrainerConfirmPassword] = useState(false);

    const toggleTrainerPasswordVisibility = () => {
        setShowTrainerPassword(!showTrainerPassword);
    };
    const toggleTrainerConfirmPasswordVisibility = () => {
        setShowTrainerConfirmPassword(!showTrainerConfirmPassword);
    };


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

        // if (experience.length <= 2) {
        //     alert("Experience must be 2 digits!");
        //     setLoading(false);
        //     setButtonDisabled(false);
        //     return false;
        // }

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


    // Trainers list state (fetched from database)
    const [trainers, setTrainers] = useState([]);

    const fetchAllTrainers = async () => {
        try {
            const response = await getAllTrainers();
            // Assuming your backend returns { getAllTrainers: [...] }
            if (response?.data?.trainers || []) {
                setTrainers(response.data.trainers);
            } 
            else {
                setTrainers([]);
            }
        } 
        catch (error) {
            console.error("Error fetching trainers:", error);
            alert("Error fetching trainers. Please try again later.");
        }

    };

    useEffect(() => {
        fetchAllTrainers();
    }, []);

    // Handler: Add a new trainer (example only)
    const handleAddTrainer = async (e) => {
        e.preventDefault();
        setLoading(true);
        setButtonDisabled(true);

        if (validateInputs()) {
            await registerTrainer({
                fullName: fullName,
                email: email,
                phoneNumber: phoneNumber,
                password: password,
                experience: experience
            })
                .then((res) => {
                    fetchAllTrainers();
                    alert(res.data.message || "Trainer Account created successfully!");

                })
                .catch((error) => {
                    console.error("Registration error response:", error.response);
                    alert(error?.response?.data?.error || "Registration failed. Please, try again.");
                })
                .finally(() => {
                    setLoading(false);
                    setButtonDisabled(false);
                });
        }

    };

    // Handle account Delete a trainer from the list
    const handleDeleteTrainer = async (trainerId) => {
        try {
            const response = await deleteTrainer({ trainerId });
            if (response.data && response.data.message) {
                alert(response.data.message);
                fetchAllTrainers();
            }
        }
        catch (error) {
            console.error("Failed to delete account:", error);
            alert(error?.response?.data?.error || "Failed to delete account. Please try again later.");
        }
        const filtered = trainers.filter((t) => t.email !== email);
        setTrainers(filtered);
    };

    // Add form reset function
    const resetForm = () => {
        setFullName("");
        setEmail("");
        setPhoneNumber("");
        setExperience("");
        setPassword("");
        setConfirmPassword("");
        setShowTrainerPassword(false);
        setShowTrainerConfirmPassword(false);

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
                        <Form className="trainer-form-wrapper" autoComplete="off">
                            <Form.Group className="mb-3" controlId="fullName">
                                <Form.Control
                                    type="text"
                                    placeholder="FullName"
                                    value={fullName}
                                    autoComplete="off"
                                    onChange={(e) => setFullName(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="email">
                                <Form.Control
                                    type="email"
                                    placeholder="Email"
                                    autoComplete="off"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="phoneNumber">
                                <Form.Control
                                    type="text"
                                    placeholder="Contact"
                                    autoComplete="off"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="experience">
                                <Form.Control
                                    type="number"
                                    placeholder="Experience"
                                    autoComplete="off"
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
                                            autoComplete="off"
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
                                            autoComplete="off"
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
                            <div style={{ display: "flex", gap: "15px" }}>

                                <Button className="add-trainer-btn " onClick={handleAddTrainer} disabled={buttonDisabled}>
                                    {loading ? "Adding Trainer..." : "Add Trainer"}
                                </Button>

                                <Button className="add-trainer-btn" style={{ backgroundColor: "aqua" }} disabled={buttonDisabled} onClick={resetForm}>
                                    Clear
                                </Button>
                            </div>
                        </Form>
                    </Col>

                    {/* RIGHT COLUMN: Trainer List */}
                    <Col xs={12} md={8} className="trainer-info-wrapper">
                        {/* List of Trainer Cards */}
                        {trainers.map((trainer) => (
                            <AddTrainerCard
                                key={trainer.id}
                                trainer={trainer}
                                onDelete={handleDeleteTrainer}
                            />
                        ))}
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default AdminTrainerSection;
