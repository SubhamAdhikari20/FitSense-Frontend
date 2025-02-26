import React, { useState } from "react";
import { Col, Container, Row, Form, Button, FloatingLabel } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./../../styles/authentication_styles/LoginSectionStyle.css";
import { loginUser, loginTrainer, loginAdmin, getUserByEmail, getTrainerByEmail, getAdminByEmail } from './../../apis/Api.js';
import { useDispatch } from "react-redux";
import { loginSuccess } from './../../redux/reducers/userSlice.js';


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
        e.preventDefault();
        setLoading(true);
        setButtonDisabled(true);

        if (validateInputs()) {
            try {
                // Check in the "User" table
                let userResp = {};
                try {
                    userResp = await getUserByEmail({ email });
                } 
                catch (error) {
                    // If not found (404), ignore
                    if (error.response && error.response.status !== 404) {
                        console.error("Error checking user table", error);
                    }
                }
                if (userResp.data && userResp.data.user) {
                    const res = await loginUser({ email, password });
                    dispatch(loginSuccess(res.data));
                    alert(res.data.message || "Logged in successfully as user!");
                    navigate("/dashboard");
                    return;
                }

                // Check in "Trainer" table:
                let trainerResp = {};
                try {
                    trainerResp = await getTrainerByEmail({ email });
                } 
                catch (error) {
                    if (error.response && error.response.status !== 404) {
                        console.error("Error checking trainer table", error);
                    }
                }
                if (trainerResp.data && trainerResp.data.trainer) {
                    const res = await loginTrainer({ email, password });
                    dispatch(loginSuccess(res.data));
                    alert(res.data.message || "Logged in successfully as trainer!");
                    navigate("/dashboard");
                    return;
                }

                // Check in "Admin" table:
                let adminResp = {};
                try {
                    adminResp = await getAdminByEmail({ email });
                } 
                catch (error) {
                    if (error.response && error.response.status !== 404) {
                        console.error("Error checking admin table", error);
                    }
                }
                if (adminResp.data && adminResp.data.admin) {
                    const res = await loginAdmin({ email, password });
                    dispatch(loginSuccess(res.data));
                    alert(res.data.message || "Logged in successfully as admin!");
                    navigate("/dashboard");
                    return;
                }

                // If not found in any table:
                alert("Login failed. Email not found in our records.");

                /*
                const userResp = await getUserByEmail({ email });
                if (userResp.data && userResp.data.user) {
                    const res = await loginUser({ email, password });
                    dispatch(loginSuccess(res.data));
                    alert(res.data.message || "Logged in successfully!");
                    navigate("/dashboard");
                    return;
                }

                // Next, check in the "Trainer" table
                const trainerResp = await getTrainerByEmail({ email });
                if (trainerResp.data && trainerResp.data.trainer) {
                    const res = await loginTrainer({ email, password });
                    dispatch(loginSuccess(res.data));
                    alert(res.data.message || "Logged in successfully!");
                    navigate("/dashboard");
                    return;
                }

                // Finally, check in the "Admin" table
                const adminResp = await getAdminByEmail({ email });
                if (adminResp.data && adminResp.data.admin) {
                    const res = await loginAdmin({ email, password });
                    dispatch(loginSuccess(res.data));
                    alert(res.data.message || "Logged in successfully!");
                    navigate("/dashboard");
                    return;
                }

                // If email is not found in any table, alert failure.
                alert("Login failed. Email not found in our records.");
                */
            }
            catch (error) {
                alert(error?.response?.data?.error || "Login failed. Please, try again.");
                console.error(error);
            }
            finally {
                setLoading(false);
                setButtonDisabled(false);
            }

            /*
            await login({ email, password})
                .then((res) => {
                    dispatch(loginSuccess(res.data));
                    alert(res.data.message || "Logged in successfully!");           
                    navigate("/login")         
                })
                .catch((error) => {
                    alert(error?.response?.data?.error || "Login failed. Please, try again.");
                })
                .finally(() => {
                    setLoading(false);
                    setButtonDisabled(false);
                });
            */
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
