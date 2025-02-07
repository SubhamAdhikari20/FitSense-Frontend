import React from "react";
import { useEffect, useState } from "react";
import { Col, Container, Row, Carousel, Figure, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./../../styles/landing_styles/AboutStyle.css";

const About = () => {
    return (
        <section id="about-section" className="about-section">
            <Container className="about-container">
                <Row>
                    <Col md={6} className="text-content row1-column1"> {/* Adjust column size for responsiveness */}
                        <h2>ABOUT</h2>
                        <h1>WELCOME TO THE<br />XTREME FITNESS</h1>
                        <p>
                            Euis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur ex
                            sint occaecat cupidatat non proident, sunt in cular aui officia deserunt mollit anim laborum.
                        </p>
                    </Col>
                </Row>

                <Row className="stats">
                    <Col xs={6} md={3} className="stat"> {/* Responsive stat boxes */}
                        <div className="stat-number">600K+</div>
                        <div className="stat-label">WORKING HOURS</div>
                    </Col>
                    <Col xs={6} md={3} className="stat">
                        <div className="stat-number">790+</div>
                        <div className="stat-label">SUCCESS PROGRAM</div>
                    </Col>
                    <Col xs={6} md={3} className="stat">
                        <div className="stat-number">2560+</div>
                        <div className="stat-label">HAPPY CLIENTS</div>
                    </Col>
                    <Col xs={6} md={3} className="stat">
                        <div className="stat-number">830+</div>
                        <div className="stat-label">PERFECT BODIES</div>
                    </Col>
                </Row>
                <button className="read-more-button">Read more</button>
                <Row>

                    <Col md={6} className="image-container"> {/* Container for the image */}
                        {/* You would place your image component or tag here */}
                        {/* Example: <img src="/path/to/your/image.jpg" alt="Xtreme Fitness" className="about-us-image" /> */}
                    </Col>
                </Row>
            </Container>

        </section>
    );
};

export default About;
