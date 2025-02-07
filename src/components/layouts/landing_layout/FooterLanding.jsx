import React, { useEffect, useState } from "react";
import { Col, Container, Row, Figure, Button } from "react-bootstrap";
import Logo from "./../../../assets/images/fitsense_logo2.png";
import { Link } from "react-router-dom";
import "./../../../styles/landing_styles/FooterLandingStyle.css";

const Footer = () => {
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const footerElement = document.querySelector(".footer-row2");

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsSticky(!entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        if (footerElement) {
            observer.observe(footerElement);
        }

        return () => {
            if (footerElement) {
                observer.unobserve(footerElement);
            }
        };
    }, []);

    return (
        <footer className="footer-section">
            <Container>
                <Row className="footer-row1">
                    <Col className="mb-4 mb-lg-0 col-lg-3 col-md-4 col-sm-6 col-xs-12">
                        <div className="footer-row1-column1 footer-column-items">
                            <Link to="/" target="_blank">
                                <Figure className="logo-img mb-0">
                                    <Figure.Image alt="171x180" src={Logo} />
                                </Figure>
                            </Link>
                        </div>
                    </Col>

                    <Col className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                        <div class="footer-row1-column2 footer-column-items">
                            <h3>Quick Links</h3>

                            <ul>
                                <li>
                                    <Link to="/">Home</Link>
                                </li>

                                <li>
                                    <Link to="/trainer">Get a Trainer</Link>
                                </li>

                                <li>
                                    <Link to="/courses">Courses</Link>
                                </li>

                                <li>
                                    <Link to="/blog">Blog</Link>
                                </li>

                                <li>
                                    <Link to="/about">About</Link>
                                </li>

                                <li>
                                    <Link to="/contact">Contact</Link>
                                </li>
                            </ul>
                        </div>
                    </Col>

                    <Col className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                        <div class="footer-row1-column3 footer-column-items">
                            <h3>Quick Links</h3>

                            <ul>
                                <li>
                                    <i class="fa-solid fa-caret-right"></i>
                                    <Link to="/">Home</Link>
                                </li>

                                <li>
                                    <Link to="/trainer">Get a Trainer</Link>
                                </li>

                                <li>
                                    <Link to="/courses">Courses</Link>
                                </li>

                                <li>
                                    <Link to="/blog">Blog</Link>
                                </li>

                                <li>
                                    <Link to="/about">About</Link>
                                </li>

                                <li>
                                    <Link to="/contact">Contact</Link>
                                </li>
                            </ul>
                        </div>
                    </Col>

                    <Col className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                        <div class="footer-row1-column4 footer-column-items">
                            <h3>Quick Links</h3>

                            <ul>
                                <li>
                                    <i class="fa-solid fa-caret-right"></i>
                                    <Link to="/">Home</Link>
                                </li>

                                <li>
                                    <Link to="/trainer">Get a Trainer</Link>
                                </li>

                                <li>
                                    <Link to="/courses">Courses</Link>
                                </li>

                                <li>
                                    <Link to="/blog">Blog</Link>
                                </li>

                                <li>
                                    <Link to="/about">About</Link>
                                </li>

                                <li>
                                    <Link to="/contact">Contact</Link>
                                </li>
                            </ul>
                        </div>
                    </Col>
                </Row>

                <Row
                    className={isSticky ? "footer-row2 sticky" : "footer-row2"}
                >
                    <Col className="footer-row2-colom1 col-xl-12">
                        <p>&copy; 2024 Subham Adhikari. All rights reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
