import React from "react";
import "../../styles/NavigationbarStyle.css";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "./../../assets/images/fitsense_logo2.png";

const Navigationbar = () => {
    return (
        <header>
            <Navbar expand="lg">
                <Container>
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
                            <Nav.Link as={Link} to="/trainer">
                                Get a Trainer
                            </Nav.Link>
                            <Nav.Link as={Link} to="/courses">
                                Courses
                            </Nav.Link>
                            <Nav.Link as={Link} to="/blog">
                                Blog
                            </Nav.Link>
                            <Nav.Link as={Link} to="/about">
                                About
                            </Nav.Link>
                            <Nav.Link as={Link} to="/contact">
                                Contact
                            </Nav.Link>
                            <Nav.Link as={Link} to="/">
                                <div className="cart">
                                    <i className="bi bi-cart fs-5"></i>
                                    <em className="roundpoint">2</em>
                                </div>
                            </Nav.Link>

                            <Button variant="outline-success" className="sign-up-btn">
                                Sign Up
                            </Button>

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

export default Navigationbar;
