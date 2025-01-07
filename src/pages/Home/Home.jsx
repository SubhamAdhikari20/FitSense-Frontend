import React from "react";
import "../../styles/HomeStyle.css";
import Navbar from "../../components/layouts/Navigationbar";
import { useEffect } from "react";
import Typed from "typed.js";
import Layout from "../../components/layouts/Layout";
import Section1 from "./Section1";

const Home = () => {
    // useEffect(() => {
    //     // Initialize Typed.js
    //     const typed = new Typed("#element", {
    //         strings: ["Best Life", "Quality Life", "Healthy Life"],
    //         typeSpeed: 50,
    //         backSpeed: 25,

    //         loop: true, // Keep the typing effect looping
    //     });

    //     // Cleanup function to destroy Typed instance when component unmounts
    //     return () => {
    //         typed.destroy();
    //     };
    // }, []);

    return (
        <>
            <Layout>
                {/* Home Section Hero Banner*/}
                <Section1/>      

            </Layout>

            {/* <main>
                <section id="home" className="section">
                    <div className="left-intro">
                        <p>Elevate Thyself</p>
                        <p>Live a</p>
                        <p style= {{display: "inline-block"}}>I'm a passionate</p>  
                        <p id="element" style={{ display: "inline-block" }}></p>

                        <div className="buttons">
                            <a href="#about">
                                <button className="btn">Explore</button>
                            </a>

                            <a href="#about">
                                <button className="btn">Download Resume</button>
                            </a>
                        </div>
                    </div>

                    <div className="right-intro">
                        <img src="images/developer.png" alt="DEveloper" />
                    </div>
                </section>
            </main> */}

        </>
    );
};

export default Home;
