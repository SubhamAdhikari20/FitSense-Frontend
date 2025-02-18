import React, { useState } from "react";
import { Col, Container, Row, Form, Button, FloatingLabel } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./../../styles/authentication_styles/LoginSectionStyle.css";
import { useDispatch } from "react-redux";
import { loginSuccess } from './../../redux/reducers/userSlice.js';
import { loginUser } from './../../apis/Api.js';


const LoginSection = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const navigate = useNavigate();

    // Form data state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const validateInputs = () => {
        // Frontend validation
        if (!email || !password) {
            alert("Please fill in all fields!!!");
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

        return true;
    };

    const handelLogin = async (e) => {
        e.preventDefault(); // Prevent form from refreshing the page
        setLoading(true);
        setButtonDisabled(true);

        if (validateInputs()) {
            await loginUser({ email, password})
                .then((res) => {
                    dispatch(loginSuccess(res.data));
                    alert(res.data.message || "Logged in successfully!");
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
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </FloatingLabel>

                                {/* Password */}
                                <Row className="mb-2">
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

                                <p className="forgot-password">
                                    <Link to="/forgot_password">Forgot Password?</Link>
                                </p>

                                {/* Login Button */}
                                <Button
                                    variant="dark"
                                    type="submit"
                                    className="btn-login"
                                    disabled={buttonDisabled}
                                    onClick={handelLogin}
                                >
                                    {loading ? "Logging..." : "Login"}
                                </Button>
                            </Form>

                            {/* Social Signup */}
                            {/* <div className="text-center mt-4">
                                <p className="text-muted">Login With</p>
                                <div>
                                    <Button
                                        variant="outline-primary"
                                        className="social-btn"
                                    >
                                        <i class="bi bi-google"></i>
                                    </Button>
                                </div>
                            </div> */}

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
