import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Container, Nav, Navbar, Button, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "./../../../assets/images/fitsense_logo2.png";
import './../../../styles/dashboard_styles/NavbarDashboardStyle.css';
import styled from "styled-components";
import { MenuRounded } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { logout } from './../../../redux/reducers/userSlice.js';

const NavbarDashboard = ({ currentUser }) => {
    const [isSticky, setIsSticky] = useState(false);
    const [isOpen, setisOpen] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 3) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);


    return (
        <header className={`${isSticky ? "dashboard-header-navbar sticky" : "dashboard-header-navbar"}`}>
            <Navbar expand="lg">
                <Container className="navbar-container">

                    <Navbar.Brand href="#home">
                        <Link to="/" className="logo">
                            <img src={Logo} alt="Logo" className="img-fluid" />
                        </Link>
                    </Navbar.Brand>

                    <Nav className="nav-items">
                        <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
                        <Nav.Link as={Link} to="/trainers">Get a traner</Nav.Link>
                        <Nav.Link as={Link} to="/workouts">Workouts</Nav.Link>
                        <Nav.Link as={Link} to="/blogs">Blogs</Nav.Link>
                    </Nav>

                    {/* Mobile Menu */}
                    <div className="mobile-icon" onClick={() => setisOpen(!isOpen)}>
                        <MenuRounded sx={{ color: "inherit" }} />
                    </div>

                    <div>
                        <ul className={`mobile-menu ${isOpen ? "open" : ""}`}>
                            <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
                            <Nav.Link as={Link} to="/trainers">Get a Trainer</Nav.Link>
                            <Nav.Link as={Link} to="/workouts">Workouts</Nav.Link>
                            <Nav.Link as={Link} to="/blogs">Blogs</Nav.Link>
                        </ul>
                    </div>

                    <div className={`user-container`}>
                        <Avatar src={currentUser?.img}>{currentUser?.name[0]}</Avatar>
                        <div className="logout-btn" onClick={() => dispatch(logout())}>
                            Logout
                        </div>
                    </div>

                </Container>
            </Navbar>
        </header>
    );
};

export default NavbarDashboard;
