import React from "react";
import { Col, Container, Row, Carousel, Figure, Button } from "react-bootstrap";
import Typed from "typed.js";
import { useEffect, useState } from "react";
import "./../../styles/landing_styles/HomeSection1Style.css";
import Video_img from "./../../assets/images/video_play_img.png";
import { Link, useNavigate } from "react-router-dom";
import Bg from './../../assets/images/bg1.jpg';

const HomeSection1 = () => {
    const navigate = useNavigate();
    

    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <section className="hero_section">
            <Container>
                {/* <img src={Bg} className="bg_outer" /> */}
                <Row>
                    <Col
                        lg={12}
                        className="mb-5 mb-lg-0 col-md-12 col-sm-12 col-xs-12 column1"
                    >
                        <Carousel
                            activeIndex={index}
                            onSelect={handleSelect}
                            interval={2500}
                            pause="hover"
                            controls={false}
                            className="slider"
                        >
                            <Carousel.Item>
                                <div className="text-slide">
                                    <div className="line mb-0"></div>
                                    <h3>Elevate Thyself</h3>
                                    <h3>Live a</h3>
                                    <p>Best Life</p>
                                </div>
                            </Carousel.Item>
                            <Carousel.Item>
                                <div className="text-slide">
                                    <div className="line mb-0"></div>
                                    <h3>Elevate Thyself</h3>
                                    <h3>Live a</h3>
                                    <p>Quality Life</p>
                                </div>
                            </Carousel.Item>
                            <Carousel.Item>
                                <div className="text-slide">
                                    <div className="line mb-0"></div>
                                    <h3>Elevate Thyself</h3>
                                    <h3>Live a</h3>
                                    <p>Healthy Life</p>
                                </div>
                            </Carousel.Item>
                        </Carousel>

                        {/* <div className="position:relative">
                            <div>
                                <h1>
                                    Elevate Thyself Live
                                </h1>

                                <h1>
                                    Live
                                </h1>

                                <h1 id="element" style={{ display: "inline-block" }}></h1>
                            </div> */}

                        {/* <div className="badge_text">
                                <h4 className="h4_xs">Only</h4>
                            </div> */}

                        {/* </div> */}
                    </Col>

                    <Col className="p-0 column2">
                        <div className="banner-video position-relative">
                            <Link
                                to="https://video-previews.elements.envatousercontent.com/h264-video-previews/9b19c081-53dc-4345-a05e-0c9a4a52f3e6/26111213.mp4"
                                target="_blank"
                                className="video-link"
                            >
                                <Figure className="video-img mb-0">
                                    <Figure.Image
                                        alt="171x180"
                                        src={Video_img}
                                    />
                                </Figure>
                            </Link>
                        </div>
                    </Col>

                    {/* <Col lg={5} className="hero_name text-center">
                        <div className="">

                        </div>
                    </Col> */}
                </Row>

                <Row>
                    <Col className="row2-column1">
                        <Button variant="secondary" className="get-started-btn" onClick={navigate("/login")}>
                            Get Started
                        </Button>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default HomeSection1;
