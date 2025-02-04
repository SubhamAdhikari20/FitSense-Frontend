import React from "react";
import "../../styles/HomeStyle.css";
import { useEffect } from "react";
import Typed from "typed.js";
import Layout from "../../components/layouts/Layout";
import HomeSection1 from "./HomeSection1";
import HomeSection2 from "./HomeSection2";
import About from "../About";


const Home = () => {

    return (
        <>
            <Layout>
                <HomeSection1 />
                <HomeSection2 />
                <About/>
            </Layout>
        </>
    );
};

export default Home;
