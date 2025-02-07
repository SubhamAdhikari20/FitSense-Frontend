import React from "react";
import { useEffect, useState } from "react";
import { Col, Container, Row, Carousel, Figure, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./../../styles/landing_styles/HomeSection2Style.css";

const HomeSection2 = () => {
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        // <section className="home-section2">
        //     <Container className="home-section2-container">
        //         <Row>
        //             <Col
        //                 lg={12}
        //                 className="mb-5 mb-lg-0 col-md-12 col-sm-12 col-xs-12 row1-column1"
        //             >
        //                 <h1>How FitSense assists you</h1>
        //             </Col>
        //         </Row>
        //         <Row>
        //             <Col>
        //                 <Carousel
        //                     activeIndex={index}
        //                     onSelect={handleSelect}
        //                     interval={2500}
        //                     pause="hover"
        //                     controls={false}
        //                     className="slider"
        //                 >
        //                     <Carousel.Item>
        //                         <div className="text-slide">
        //                             <div className="line mb-0"></div>
        //                             <h3>Elevate Thyself</h3>
        //                             <h3>Live a</h3>
        //                             <p>Best Life</p>
        //                         </div>
        //                     </Carousel.Item>
        //                     <Carousel.Item>
        //                         <div className="text-slide">
        //                             <div className="line mb-0"></div>
        //                             <h3>Elevate Thyself</h3>
        //                             <h3>Live a</h3>
        //                             <p>Quality Life</p>
        //                         </div>
        //                     </Carousel.Item>
        //                     <Carousel.Item>
        //                         <div className="text-slide">
        //                             <div className="line mb-0"></div>
        //                             <h3>Elevate Thyself</h3>
        //                             <h3>Live a</h3>
        //                             <p>Healthy Life</p>
        //                         </div>
        //                     </Carousel.Item>
        //                 </Carousel>
        //             </Col>

        //         </Row>
        //     </Container>
        // </section>
        <section className="home-section2">
            <Container className="home-section2-container">
                {/* Section Title */}
                <Row>
                    <Col lg={12} className="text-center row1-column1 mb-5">
                        <h1>How FitSense assists you</h1>
                    </Col>
                </Row>

                {/* Features Carousel */}
                <Carousel
                    activeIndex={index}
                    onSelect={handleSelect}
                    className="feature-carousel"
                    indicators={false}
                >
                    <Carousel.Item>
                        <Row className="feature-row">
                            <Col
                                xs={12}
                                sm={6}
                                md={6}
                                lg={3}
                                className="feature-card"
                            >
                                <div className="feature-icon flex-muscle">
                                    <Figure className="video-img mb-0">
                                        <Figure.Image alt="171x180" />
                                    </Figure>
                                </div>

                                <h4>Flex Muscle</h4>
                                <p>
                                    Improve strength and endurance with
                                    professional guidance.
                                </p>
                            </Col>

                            <Col
                                xs={12}
                                sm={6}
                                md={6}
                                lg={3}
                                className="feature-card"
                            >
                                <div className="feature-icon powerful-vitamins">
                                    <Figure className="video-img mb-0">
                                        <Figure.Image alt="171x180" />
                                    </Figure>
                                </div>
                                <h4>Powerful Vitamins</h4>
                                <p>
                                    Get personalized nutrition plans to boost
                                    your performance.
                                </p>
                            </Col>

                            <Col
                                xs={12}
                                sm={6}
                                md={6}
                                lg={3}
                                className="feature-card"
                            >
                                <div className="feature-icon abdominal-sessions">
                                    <Figure className="video-img mb-0">
                                        <Figure.Image alt="171x180" />
                                    </Figure>
                                </div>
                                <h4>Abdominal Sessions</h4>
                                <p>
                                    Strengthen your core with expert abdominal
                                    workouts.
                                </p>
                            </Col>

                            <Col
                                xs={12}
                                sm={6}
                                md={6}
                                lg={3}
                                className="feature-card"
                            >
                                <div className="feature-icon weight-lifting">
                                    <Figure className="video-img mb-0">
                                        <Figure.Image alt="171x180" />
                                    </Figure>
                                </div>
                                <h4>Weight Lifting</h4>
                                <p>
                                    Improve muscle growth with guided
                                    weight-lifting techniques.
                                </p>
                            </Col>
                        </Row>
                    </Carousel.Item>
                </Carousel>
            </Container>
        </section>
    );
};

export default HomeSection2;
