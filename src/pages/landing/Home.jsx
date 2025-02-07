import React from "react";
import { useEffect } from "react";
import Typed from "typed.js";
import "./../../styles/landing_styles/HomeStyle.css";
import Layout from "./../../components/layouts/landing_layout/LayoutLanding.jsx";
import HomeSection1 from "./HomeSection1.jsx";
import HomeSection2 from "./HomeSection2.jsx";
import About from "./About.jsx";

const Home = () => {
    return (
        <>
            <Layout>
                <HomeSection1 />
                <HomeSection2 />
                <About />
            </Layout>
        </>
    );
};

export default Home;
