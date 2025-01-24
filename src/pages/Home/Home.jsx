import React from "react";
import "../../styles/HomeStyle.css";
import { useEffect } from "react";
import Typed from "typed.js";
import Layout from "../../components/layouts/Layout";
import HomeSection1 from "./HomeSection1";


const Home = () => {

    return (
        <>
            <Layout>
                <HomeSection1 />
            </Layout>
        </>
    );
};

export default Home;
