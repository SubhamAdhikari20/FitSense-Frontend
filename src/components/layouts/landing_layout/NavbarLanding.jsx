import React, { useEffect, useState } from "react";
import "./../../../styles/landing_styles/NavbarLandingStyle.css";
import { Container, Nav, Navbar, Button, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "./../../../assets/images/fitsense_logo2.png";

const NavbarLanding = ({ navbarStyle }) => {
    const [isSticky, setIsSticky] = useState(false);

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
        <header
            className={`${
                isSticky ? "header-navbar sticky" : "header-navbar"
            } ${navbarStyle}`}
        >
            <Navbar expand="lg">
                <Container className="navbar-container">
                    <Navbar.Brand href="#home">
                        <Link to="/" className="logo">
                            <img src={Logo} alt="Logo" className="img-fluid" />
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link as={Link} to="/">
                                Home
                            </Nav.Link>
                            <Nav.Link href="#trainer-section">
                                Get a Trainer
                            </Nav.Link>
                            <Nav.Link href="#courses-section">Courses</Nav.Link>
                            <Nav.Link href="#blog-section">Blog</Nav.Link>
                            <Nav.Link href="#about-section">About</Nav.Link>
                            <Nav.Link href="#contact-section">Contact</Nav.Link>
                            <Nav.Link as={Link} to="/">
                                <div className="cart">
                                    <i className="bi bi-cart fs-5"></i>
                                    <em className="roundpoint">2</em>
                                </div>
                            </Nav.Link>

                            <Link to="/login">
                                <Button
                                    variant="outline-success"
                                    className="sign-up-btn"
                                >
                                    Login
                                </Button>
                            </Link>

                            <Link to="/signup">
                                <Button
                                    variant="outline-success"
                                    className="sign-up-btn"
                                >
                                    Sign Up
                                </Button>
                            </Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>

        // <header>
        //     <nav id='navbar'>
        //         <div id="logo">
        //             <img src="/src/assets/fitsense_logo2.png" alt="fitsense.com" />

        //         </div>
        //         <ul>
        //             <li><a href="">Home</a></li>
        //             <li><a href="">Get a Trainer</a></li>
        //             <li><a href="">Courses</a></li>
        //             <li><a href="">Blog</a></li>
        //             <li><a href="">About</a></li>
        //             <li><a href="">Contact</a></li>
        //         </ul>

        //         <button className="sign-up-btn">Sign up</button>
        //     </nav>
        // </header>
    );
};

export default NavbarLanding;
