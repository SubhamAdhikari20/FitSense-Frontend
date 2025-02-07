import React, { useState } from "react";
import { Col, Container, Row, Form, Button, FloatingLabel } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./../../styles/authentication_styles/LoginSectionStyle.css";

const LoginSection = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <section className="login-section">
            <Container>
                <Row className="login-row1">
                    <Col className="login-row1-column1 mb-lg-0 col-md-12 col-sm-12 col-xs-12">
                        <div className="form-container">
                            <h3 className="text-center mb-4">
                                Login to FitSense
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
                                <Row>
                                    <Col className="password-floating-container">
                                        <FloatingLabel
                                            controlId="password"
                                            label="Password"
                                            className="mb-3 password-floating-label"
                                        >
                                            <Form.Control
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                placeholder="Password"
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

                                {/* Submit Button */}
                                {/* <div className="d-grid"> */}
                                <Button
                                    variant="dark"
                                    type="submit"
                                    className="btn-login"
                                >
                                    Login
                                </Button>
                                {/* </div> */}
                            </Form>

                            {/* Social Signup */}
                            <div className="text-center mt-4">
                                <p className="text-muted">Login With</p>
                                <div>
                                    <Button
                                        variant="outline-primary"
                                        className="social-btn"
                                    >
                                        <i class="bi bi-google"></i>
                                    </Button>
                                </div>
                            </div>

                            <p className="text-center mt-3">
                                Don' have an account?{" "}
                                <Link to="/signup">Sign up</Link>
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default LoginSection;
