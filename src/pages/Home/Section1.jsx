import React from "react"
import { Col, Container, Row } from 'react-bootstrap'
import Bg from './../../assets/images/bg1.jpg';
import Typed from "typed.js";
import { useEffect } from "react";
import "./../../styles/Section1Style.css";

const Section1 = () => {
    useEffect(() => {
        // Initialize Typed.js
        const typed = new Typed("#element", {
            strings: ["Best Life", "Quality Life", "Healthy Life"],
            typeSpeed: 50,
            backSpeed: 25,
            loop: true, // Keep the typing effect looping
        });

        // Cleanup function to destroy Typed instance when component unmounts
        return () => {
            typed.destroy();
        };
    }, []);


    return (
        <section className="hero_section">
            <Container>
                {/* <img src={Bg} className="bg_outer" /> */}
                <Row>
                    <Col lg={7} className="mb-5 mb-lg-0">
                        <div className="position:relative">
                            <div>
                                <h1>
                                    Elevate Thyself Live
                                </h1>

                                <h1>
                                    Live
                                </h1>

                                <h1 id="element" style={{ display: "inline-block" }}></h1>
                            </div>

                            {/* <div className="badge_text">
                                <h4 className="h4_xs">Only</h4>
                            </div> */}

                        </div>
                    </Col>

                    <Col lg={5} className="hero_name text-center">
                        <div className="">
                                
                        </div>
                    </Col>

                </Row>
            </Container>
        </section>
    )
}

export default Section1