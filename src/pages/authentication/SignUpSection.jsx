import React, { useState } from "react";
import { Col, Container, Row, Form, Button, FloatingLabel } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./../../styles/authentication_styles/SignUpSectionStyle.css";
import Dropdown1 from "./../../components/buttons/Dropdown1.jsx";
import { useDispatch } from "react-redux";
import { loginSuccess } from './../../redux/reducers/userSlice.js';
import { registerUser } from './../../apis/Api.js';

const SignUpSection = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [countryCode, setCountryCode] = useState(""); // Default country code

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const navigate = useNavigate();

    // Form data state
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [agreeToTerms, setAgreeToTerms] = useState(false);

    const validateInputs = () => {
        // Frontend validation
        if (!fullName || !email || !phoneNumber || !password || !confirmPassword) {
            alert("Please fill in all fields!!!");
            setLoading(false);
            setButtonDisabled(false);
            return false;
        }

        if (password !== confirmPassword) {
            alert("Passwords and Confirm Password don't match!!");
            setLoading(false);
            setButtonDisabled(false);
            return false;
        }

        if (!agreeToTerms) {
            alert("You must agree to the terms");
            setLoading(false);
            setButtonDisabled(false);
            return false;
        }

        // if (!/^\S+@\S+\.\S+$/.test(email)) {
        //     alert("Please enter a valid email address");
        //     setLoading(false);
        //     setButtonDisabled(false);
        //     return false;
        // }

        // if (!/^\d+$/.test(phoneNumber)) {
        //     alert("Mobile number must contain only digits");
        //     setLoading(false);
        //     setButtonDisabled(false);
        //     return false;
        // }

        // if (countryCode === "+977" && phoneNumber.length !== 10) {
        //     alert("Nepali numbers must be 10 digits");
        //     setLoading(false);
        //     setButtonDisabled(false);
        //     return false;
        // }

        // if (password.length < 8) {
        //     alert("Password must be at least 8 characters");
        //     setLoading(false);
        //     setButtonDisabled(false);
        //     return false;
        // }

        // if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password)) {
        //     alert("Password must contain 8+ characters with uppercase, lowercase, and number");
        //     setLoading(false);
        //     setButtonDisabled(false);
        //     return false;
        // }

        return true;
    };

    const handelSignUp = async (e) => {
        e.preventDefault(); // Prevent form from refreshing the page
        setLoading(true);
        setButtonDisabled(true);

        if (validateInputs()) {
            await registerUser({
                fullName,
                email,
                phoneNumber,
                password,
            })
                .then((res) => {
                    dispatch(loginSuccess(res.data));
                    alert("Account created successfully!");
                    navigate("/dashboard");
                })
                .catch((error) => {
                    alert(error?.response?.data?.error || "Registration failed. Please try again.");
                })
                .finally(() => {
                    setLoading(false);
                    setButtonDisabled(false);
                });
        }


        /*
        if (validateInputs()) {
            const response = await registerUser({
                fullName: fullName,
                email: email,
                phoneNumber: phoneNumber,
                password: password,
            });

            try {
                dispatch(loginSuccess(response.data));
                alert("Account created successfully!");
                navigate("/dashboard");
            }

            catch (error) {
                alert(error.res.data.message);
            }

            finally {
                setLoading(false);
                setButtonDisabled(false);
            }
        }
        */

    };

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
                                <FloatingLabel
                                    controlId="fullName"
                                    label="Full name"
                                    className="mb-3"
                                >
                                    <Form.Control
                                        type="text"
                                        placeholder="Full name"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                    />
                                </FloatingLabel>

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

                                {/* Mobile Number */}
                                <Row>
                                    <Col md={4}>
                                        <div className="country-code-wrapper  mb-3">
                                            <Dropdown1
                                                options={countryOptions}
                                                onSelect={handleCountrySelect}
                                                className="country-code-dropdown"

                                            >
                                                Select
                                            </Dropdown1>
                                        </div>

                                    </Col>

                                    <Col md={8}>
                                        <FloatingLabel
                                            controlId="phoneNumber"
                                            label="Mobile Number"
                                            className="mb-3"
                                        >
                                            <Form.Control
                                                type="text"
                                                placeholder="Mobile Number"
                                                value={phoneNumber}
                                                onChange={(e) => setPhoneNumber(e.target.value)}
                                            />
                                        </FloatingLabel>
                                    </Col>
                                </Row>

                                {/* Password */}
                                <Row className="mb-3">
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
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
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
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
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

                                {/* Terms and Conditions */}
                                <Form.Group className="mb-4" controlId="terms">
                                    <Form.Check
                                        type="checkbox"
                                        label={
                                            <>
                                                I have read and agree to FITTR's{" "}
                                                <Link to="#!">
                                                    Terms of Use
                                                </Link>{" "}
                                                and{" "}
                                                <Link to="#!">
                                                    Privacy Policy
                                                </Link>
                                                .
                                            </>
                                        }
                                        checked={agreeToTerms}
                                        onChange={(e) => setAgreeToTerms(e.target.checked)}
                                    />
                                </Form.Group>

                                {/* Sign Up Button */}
                                {/* <div className="d-grid"> */}
                                <Button
                                    variant="dark"
                                    type="submit"
                                    className="btn-sign-up"
                                    disabled={buttonDisabled}
                                    onClick={handelSignUp}
                                >
                                    {loading ? "Signing Up..." : "Sign Up"}
                                </Button>
                                {/* </div> */}
                            </Form>

                            {/* Social Signup */}
                            {/* <div className="text-center mt-3">
                                <p className="text-muted mb-2">Sign Up With</p>
                                <div>
                                    <Button
                                        variant="outline-primary"
                                        className="social-btn"
                                    >
                                        <i class="bi bi-google"></i>
                                    </Button>
                                </div>
                            </div> */}

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
