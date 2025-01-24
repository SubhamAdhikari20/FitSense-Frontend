import React, { useState } from "react";
import { Col, Container, Row, Form, Button, FloatingLabel } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./../../styles/SignUpSectionStyle.css";

const SignUpSection = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <section className="sign-up-section">
            <Container>
                <Row className="signup-row1">
                    <Col className="signup-row1-column1 mb-lg-0 col-md-12 col-sm-12 col-xs-12">
                        <div className="form-container">
                            <h3 className="text-center mb-4">
                                Start your FitSense Journey
                            </h3>
                            <Form>
                                {/* Full Name */}
                                <FloatingLabel controlId="fullName" label="Full name" className="mb-3">
                                    <Form.Control type="text" placeholder="Full name" />
                                </FloatingLabel>

                                {/* Email Address */}
                                <FloatingLabel controlId="email" label="Email address" className="mb-3">
                                    <Form.Control type="email" placeholder="Email address" />
                                </FloatingLabel>

                                {/* Mobile Number */}
                                <Row>
                                    <Col md={4}>
                                        <FloatingLabel controlId="countryCode" label="Country Code*" className="mb-3">
                                            <Form.Select >
                                                {/* <option>+91</option>
                                                <option>+1</option>
                                                <option>+44</option>
                                                <option>+61</option> */}
                                            </Form.Select>
                                        </FloatingLabel>
                                    </Col>
                                    <Col md={8}>
                                        <FloatingLabel controlId="mobileNumber" label="Mobile Number" className="mb-3">
                                            <Form.Control type="text" placeholder="Mobile number" />
                                        </FloatingLabel>
                                    </Col>
                                </Row>

                                {/* Password */}
                                <FloatingLabel controlId="password" label="Password" className="mb-3">
                                    <Form.Control type={showPassword ? "text" : "password"} placeholder="Password" />
                                    <Button
                                        variant="link"
                                        className="toggle-password-btn"
                                        onClick={togglePasswordVisibility}
                                    >
                                        <i className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
                                    </Button>
                                </FloatingLabel>

                                {/* Terms and Conditions */}
                                <Form.Group className="mb-4" controlId="terms">
                                    <Form.Check
                                        type="checkbox"
                                        label={
                                            <>
                                                I have read and agree to FITTR's{" "}
                                                <Link href="#!">Terms of Use</Link>{" "}
                                                and{" "}
                                                <Link href="#!">Privacy Policy</Link>.
                                            </>
                                        }
                                    />
                                </Form.Group>

                                {/* Submit Button */}
                                {/* <div className="d-grid"> */}
                                    <Button variant="dark" type="submit" className="btn-sign-up">
                                        Sign Up
                                    </Button>
                                {/* </div> */}
                            </Form>

                            {/* Social Signup */}
                            <div className="text-center mt-4">
                                <p className="text-muted">Sign Up With</p>
                                <div>
                                    <Button variant="outline-primary" className="social-btn">
                                        <i class="bi bi-google"></i>
                                    </Button>
                                    
                                </div>
                            </div>

                            <p className="text-center mt-3">
                                Already have an account?{" "}
                                <Link to="/login">Login</Link>
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default SignUpSection;
