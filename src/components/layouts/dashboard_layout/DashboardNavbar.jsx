import React from "react";


const DashboardNavbar = () => {
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
                                Dashboard
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
    );
};

export default DashboardNavbar;
