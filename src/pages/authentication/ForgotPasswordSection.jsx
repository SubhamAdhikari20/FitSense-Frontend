import React, { useState } from 'react';
import { Col, Container, Row, Form, Button, FloatingLabel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './../../styles/authentication_styles/ForgotPasswordSectionStyle.css';
import { resetPasswordUser, resetPasswordTrainer, resetPasswordAdmin, getUserByEmail, getTrainerByEmail, getAdminByEmail } from '../../apis/Api.js';

const ForgotPasswordSection = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const [loading, setLoading] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const navigate = useNavigate();

    // Forgot Form data state
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const validateInputs = () => {
        // Frontend validation
        if (!email || !newPassword || !confirmNewPassword) {
            alert("Please, fill all fields!!!");
            setLoading(false);
            setButtonDisabled(false);
            return false;
        }

        if (newPassword !== confirmNewPassword) {
            alert("New Password and Confirm Password don't match!");
            setLoading(false);
            setButtonDisabled(false);
            return false;
        }

        if (!/^\S+@\S+\.\S+$/.test(email)) {
            alert("Please enter a valid email address");
            setLoading(false);
            setButtonDisabled(false);
            return false;
        }

        if (newPassword.length < 8) {
            alert("Password must be at least 8 characters!");
            setLoading(false);
            setButtonDisabled(false);
            return false;
        }

        return true;
    };

    /*
    const handleResetPassword = async (e) => {
        e.preventDefault(); 
        setLoading(true);
        setButtonDisabled(true);

        if (validateInputs()) {
            await resetPasswordUser({ email, newPassword })
                .then((res) => {
                    alert(res.data.message || "Reset successful");
                    navigate("/login");
                })
                .catch((error) => {
                    alert(error?.response?.data?.error || "Reset Paswword failed. Please, try again.");
                })
                .finally(() => {
                    setLoading(false);
                    setButtonDisabled(false);
                });
        }
    }
    */

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        setButtonDisabled(true);

        if (!validateInputs()) {
            setLoading(false);
            setButtonDisabled(false);
            return;
        }

        try {
            // Check in User table
            let userFound = false;
            try {
                const userResp = await getUserByEmail({ email });
                if (userResp.data?.user) {
                    await resetPasswordUser({ email, newPassword });
                    alert("Password reset successful for user!");
                    navigate("/login");
                    userFound = true;
                    return;
                }
            } catch (userError) {
                if (userError.response?.status !== 404) {
                    console.error("User reset error:", userError);
                    throw new Error("Error resetting user password");
                }
            }

            // Check in Trainer table
            try {
                const trainerResp = await getTrainerByEmail({ email });
                if (trainerResp.data?.trainer) {
                    await resetPasswordTrainer({ email, newPassword });
                    alert("Password reset successful for trainer!");
                    navigate("/login");
                    userFound = true;
                    return;
                }
            } catch (trainerError) {
                if (trainerError.response?.status !== 404) {
                    console.error("Trainer reset error:", trainerError);
                    throw new Error("Error resetting trainer password");
                }
            }

            // Check in Admin table
            try {
                const adminResp = await getAdminByEmail({ email });
                if (adminResp.data?.admin) {
                    await resetPasswordAdmin({ email, newPassword });
                    alert("Password reset successful for admin!");
                    navigate("/login");
                    userFound = true;
                    return;
                }
            } catch (adminError) {
                if (adminError.response?.status !== 404) {
                    console.error("Admin reset error:", adminError);
                    throw new Error("Error resetting admin password");
                }
            }

            if (!userFound) {
                alert("Email not found in our system");
            }
        } catch (error) {
            alert(error.message || "Password reset failed. Please try again.");
            console.error("Reset error:", error);
        } finally {
            setLoading(false);
            setButtonDisabled(false);
        }
    };


    return (
        <section className="forgot-password-section">
            <Container>
                <Row className="forgot-password-row1">
                    <Col className="forgot-password-row1-column1 mb-lg-0 col-md-12 col-sm-12 col-xs-12">
                        <div className="form-container">
                            <h3 className="text-center mb-4">
                                Forgot your Password?
                            </h3>

                            <Form>
                                {/* Email Address */}
                                <FloatingLabel
                                    controlId="email"
                                    label="Email address"
                                    className="mb-3"
                                >
                                    <Form.Control
                                        type="email"
                                        placeholder="Email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </FloatingLabel>



                                {/* Password */}
                                <Row className="mb-3">
                                    <Col className="password-floating-container">
                                        <FloatingLabel
                                            controlId="new-password"
                                            label="New Password"
                                            className="mb-3 password-floating-label"
                                        >
                                            <Form.Control
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                placeholder="New Password"
                                                autoComplete="new-password"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                            />
                                        </FloatingLabel>

                                        <Button
                                            variant="link"
                                            className="toggle-password-btn"
                                            onClick={togglePasswordVisibility}
                                        >
                                            <i
                                                className={
                                                    showPassword
                                                        ? "bi bi-eye-slash"
                                                        : "bi bi-eye"
                                                }
                                            ></i>
                                        </Button>
                                    </Col>
                                </Row>

                                {/* Confrim Password */}
                                <Row className="mb-4">
                                    <Col className="confirm-password-floating-container">
                                        <FloatingLabel
                                            controlId="confirm-password"
                                            label="Confirm Password"
                                            className="mb-3 password-floating-label"
                                        >
                                            <Form.Control
                                                type={
                                                    showConfirmPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                placeholder="Confirm Password"
                                                autoComplete="confirm-password"
                                                value={confirmNewPassword}
                                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                                            />
                                        </FloatingLabel>

                                        <Button
                                            variant="link"
                                            className="toggle-password-btn"
                                            onClick={toggleConfirmPasswordVisibility}
                                        >
                                            <i
                                                className={
                                                    showConfirmPassword
                                                        ? "bi bi-eye-slash"
                                                        : "bi bi-eye"
                                                }
                                            ></i>
                                        </Button>
                                    </Col>
                                </Row>

                                {/* Reset Button */}
                                <Button
                                    variant="dark"
                                    type="submit"
                                    className="btn-reset"
                                    disabled={buttonDisabled}
                                    onClick={handleResetPassword}
                                >
                                    {loading ? "Reseting..." : "Reset"}
                                </Button>
                                {/* </div> */}
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>

        </section>
    );
};

export default ForgotPasswordSection;
