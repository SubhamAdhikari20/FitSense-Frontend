import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Container, Nav, Navbar, Button, Row, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./../../../assets/images/fitsense_logo2.png";
import './../../../styles/dashboard_styles/NavbarDashboardStyle.css';
import { MenuRounded } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { logout } from './../../../redux/reducers/userSlice.js';

const NavbarDashboard = ({ currentUser }) => {
    const [isSticky, setIsSticky] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

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

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <aside className={`${isSticky ? "dashboard-header-navbar sticky" : "dashboard-header-navbar sidebar"}`}>
            <Container className="sidebar-container">
                {/* Logo / Brand */}
                <Navbar.Brand className="sidebar-brand">
                    <Link to="/dashboard" >
                        <img src={Logo} alt="Logo" className="sidebar-logo" />
                    </Link>
                </Navbar.Brand>

                {/* Nav Items (Desktop) */}
                <Nav className="flex-column sidebar-nav d-none d-md-flex">
                    <Nav.Link as={Link} to="/dashboard" className="nav-item-custom">
                        Dashboard
                    </Nav.Link>
                    <Nav.Link as={Link} to="/trainers" className="nav-item-custom">
                        Get a Trainer
                    </Nav.Link>
                    <Nav.Link as={Link} to="/workouts" className="nav-item-custom">
                        Workouts
                    </Nav.Link>
                    <Nav.Link as={Link} to="/blogs" className="nav-item-custom">
                        Blogs
                    </Nav.Link>
                </Nav>

                {/* Bottom Section: Avatar & Popup Menu */}
                <div className="sidebar-bottom d-none d-md-flex">
                    <div className="user-container">
                        <UserMenu currentUser={currentUser}/>
                    </div>
                </div>

                <div className="mobile-icon d-md-none" onClick={() => setIsOpen(!isOpen)}>
                    <MenuRounded sx={{ color: "inherit" }} />
                </div>

                <div>
                    <ul className={`mobile-menu ${isOpen ? "open" : ""}`}>
                        <Nav className="flex-column">
                            <Nav.Link
                                as={Link}
                                to="/"
                                onClick={() => setIsOpen(false)}
                                className="nav-item-custom"
                            >
                                Dashboard
                            </Nav.Link>

                            <Nav.Link
                                as={Link}
                                to="/trainers"
                                onClick={() => setIsOpen(false)}
                                className="nav-item-custom"
                            >
                                Get a Trainer
                            </Nav.Link>

                            <Nav.Link
                                as={Link}
                                to="/workouts"
                                onClick={() => setIsOpen(false)}
                                className="nav-item-custom"
                            >
                                Workouts
                            </Nav.Link>

                            <Nav.Link
                                as={Link}
                                to="/blogs"
                                onClick={() => setIsOpen(false)}
                                className="nav-item-custom"
                            >
                                Blogs
                            </Nav.Link>
                        </Nav>

                    </ul>
                </div>
            </Container>

            <LogoutModal show={showModal} onClose={() => setShowModal(false)} onLogout={handleLogout} />
        </aside>




        // <header className={`${isSticky ? "dashboard-header-navbar sticky" : "dashboard-header-navbar"}`}>
        //     <Navbar expand="lg">
        //         <Container className="navbar-container">

        //             <Navbar.Brand href="#home">
        //                 <Link to="/dashboard" className="logo">
        //                     <img src={Logo} alt="Logo" className="img-fluid" />
        //                 </Link>
        //             </Navbar.Brand>

        //             <Nav className="nav-items">
        //                 <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
        //                 <Nav.Link as={Link} to="/trainers">Get a traner</Nav.Link>
        //                 <Nav.Link as={Link} to="/workouts">Workouts</Nav.Link>
        //                 <Nav.Link as={Link} to="/blogs">Blogs</Nav.Link>
        //             </Nav>

        //             {/* Mobile Menu */}
        //             <div className="mobile-icon" onClick={() => setIsOpen(!isOpen)}>
        //                 <MenuRounded sx={{ color: "inherit" }} />
        //             </div>

        //             <div>
        //                 <ul className={`mobile-menu ${isOpen ? "open" : ""}`}>
        //                     <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
        //                     <Nav.Link as={Link} to="/trainers">Get a Trainer</Nav.Link>
        //                     <Nav.Link as={Link} to="/workouts">Workouts</Nav.Link>
        //                     <Nav.Link as={Link} to="/blogs">Blogs</Nav.Link>
        //                 </ul>
        //             </div>

        //             <div className={`user-container`}>
        //                 <Avatar src={currentUser?.img}>
        //                     {currentUser?.fullName ? currentUser.fullName[0] : "U"}
        //                 </Avatar>

        //                 <div className="logout-btn" onClick={() => setShowModal(true)}>
        //                     Logout
        //                 </div>
        //             </div>

        //         </Container>
        //     </Navbar>

        //     {/* Reusable Logout Modal Component */}
        //     <LogoutModal show={showModal} onClose={() => setShowModal(false)} onLogout={handleLogout} />

        // </header>
    );
};


// LogoutModal Component
const LogoutModal = ({ show, onClose, onLogout }) => {
    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Logout</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to logout?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose} style={{ textTransform: "none", backgroundColor: "#6c757d", color: "#fff", border: "none", padding: "10px 20px" }}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={onLogout} style={{ textTransform: "none", backgroundColor: "#007bff", color: "#fff", border: "none", padding: "10px 20px" }}>
                    Logout
                </Button>
            </Modal.Footer>
        </Modal>
    );
};


const UserMenu = ({ currentUser, isShowModel }) => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);
    const [showModal, setShowModal] = useState(false);

    // Toggle popup
    const toggleMenu = () => setOpen(!open);

    // Close popup if clicked outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="user-menu" ref={menuRef}>
            <Avatar
                src={currentUser?.img}
                onClick={toggleMenu}
                style={{ cursor: "pointer", width: 60, height: 60 }}
            >
                {currentUser?.fullName ? currentUser.fullName[0] : "U"}
            </Avatar>

            {open && (
                <div className="profile-popup">
                    <Link to="/profile" className="popup-link">
                        My Profile
                    </Link>
                    <div className="popup-link logout-btn" onClick={() => setShowModal(true)}>
                        Logout
                    </div>
                </div>
            )}
        </div>
    );
};


export default NavbarDashboard;

