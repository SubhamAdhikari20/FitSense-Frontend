import React, { useState } from "react";
import { Col, Container, Row, Form, Button, FloatingLabel } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./../../styles/SignUpSectionStyle.css";
import Dropdown1 from './../../components/buttons/Dropdown1.jsx';

const SignUpSection = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [countryCode, setCountryCode] = useState("+91"); // Default country code

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    // Form data state
    // const[fullName, setFirstName] = useState("")
    // const[email, setEmail] = useState("")
    // const[mobileNumber, setMobileNumber] = useState("")
    // const[password, setPassword] = useState("")
    // const[agreeToTerms, setAgreeToTerms] = useState("")

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        mobileNumber: "",
        password: "",
        agreeToTerms: false
    });


    const countryOptions = [
        // { label: "IN +91", value: "+91" },
        // { label: "AF +93", value: "+93" },
        // { label: "AL +355", value: "+355" },
        // { label: "DZ +213", value: "+213" },
        // { label: "AS +1684", value: "+1684" },
        // { label: "AD +376", value: "+376" },
        // { label: "AO +244", value: "+244" },
        { label: "NP +977", value: "+977" },
    ];

    const handleCountrySelect = (selectedValue) => {
        setCountryCode(selectedValue);
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
                                        <div className="country-code-wrapper  mb-3">
                                            <Dropdown1 options={countryOptions} onSelect={handleCountrySelect} className="country-code-dropdown">
                                                Select
                                            </Dropdown1>
                                        </div>

                                        {/* <FloatingLabel controlId="countryCode" label="Country Code" className="mb-3">
                                                <Form.Select className="">
                                                <option value="+91">IN +91</option>
                                                <option value="+93">AF +93</option>
                                                <option value="+355">AL +355</option>
                                                <option value="+213">DZ +213</option>
                                                <option value="+1684">AS +1684</option>
                                                <option value="+376">AD +376</option>
                                                <option value="+244">AO +244</option>
                                                </Form.Select>
                                                
                                                </FloatingLabel> */}
                                    </Col>

                                    <Col md={8}>
                                        <FloatingLabel controlId="mobileNumber" label="Mobile Number" className="mb-3">
                                            <Form.Control type="text" placeholder="Mobile number" />
                                        </FloatingLabel>
                                    </Col>
                                </Row>

                                {/* Password */}
                                <Row>
                                    <Col className="password-floating-container">
                                        <FloatingLabel controlId="password" label="Password" className="mb-3 password-floating-label">
                                            <Form.Control type={showPassword ? "text" : "password"} placeholder="Password" autoComplete="new-password"/>
                                        </FloatingLabel>
                                        
                                        <Button
                                            variant="link"
                                            className="toggle-password-btn"
                                            onClick={togglePasswordVisibility}
                                        >
                                            <i className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
                                        </Button>

                                    </Col>

                                </Row>


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
                            <div className="text-center mt-3">
                                <p className="text-muted mb-2">Sign Up With</p>
                                <div>
                                    <Button variant="outline-primary" className="social-btn">
                                        <i class="bi bi-google"></i>
                                    </Button>

                                </div>
                            </div>

                            <p className="text-center mt-2 mb-0">
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
