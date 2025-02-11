import React, { useState } from 'react';
import { Col, Container, Row, Form, Button, FloatingLabel } from "react-bootstrap";
import { Link } from "react-router-dom";
import './../../styles/authentication_styles/ForgotPasswordSectionStyle.css';

const ForgotPasswordSection = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
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
                                >
                                    Reset
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
