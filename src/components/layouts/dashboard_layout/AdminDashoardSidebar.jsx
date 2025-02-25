import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Container, Nav, Navbar, Button, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./../../../assets/images/fitsense_logo2.png";
import "./../../../styles/dashboard_styles/UserSidebarDashboardStyle.css";
import { MenuRounded, CloseRounded } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { logout } from "./../../../redux/reducers/userSlice.js";
import MyProfile from './../../../pages/dashboard/MyProfile.jsx';

const AdminDashboardSidebar = ({ currentUser }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isSticky, setIsSticky] = useState(false);
    // mobile menu open/close
    const [isOpen, setIsOpen] = useState(false);
    // Logout confirmation modal
    const [showModal, setShowModal] = useState(false);

    // Actual logout action
    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

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
        <>
            <header className={`${isSticky ? "dashboard-header-navbar sticky" : "dashboard-header-navbar sidebar"}`}>
                <Container className="sidebar-container">
                    {/* Logo / Brand */}
                    <Navbar.Brand className="sidebar-brand">
                        <Link to="/dashboard">
                            <img src={Logo} alt="Logo" className="sidebar-logo" />
                        </Link>
                    </Navbar.Brand>

                    <div className={`menu-container ${isOpen ? "open" : ""}`}>
                        <div className="menu-close-icon" onClick={() => setIsOpen(!isOpen)}>
                            <CloseRounded sx={{ color: "inherit" }} />
                        </div>

                        {/* Nav Items (Desktop) */}
                        <Nav className="flex-column sidebar-nav">
                            <Nav.Link as={Link} to="/admin-dashboard" className="nav-item-custom">
                                Dashboard
                            </Nav.Link>

                            <Nav.Link as={Link} to="/add-trainers" className="nav-item-custom">
                                Trainer
                            </Nav.Link>

                            {/* <Nav.Link as={Link} to="/workouts" className="nav-item-custom">
                                Workouts
                            </Nav.Link>

                            <Nav.Link as={Link} to="/blogs" className="nav-item-custom">
                                Blogs
                            </Nav.Link> */}
                        </Nav>

                        {/* Bottom Section: Avatar & Popup Menu */}
                        <div className="sidebar-bottom">
                            <div className="user-container">
                                {/* Pass a function that sets the parent’s modal to show */}
                                <UserMenu
                                    currentUser={currentUser}
                                    onLogoutClick={() => setShowModal(true)}
                                />
                            </div>
                        </div>

                    </div>


                    {/* Hamburger Icon (Mobile Only) */}
                    <div className="hamburger-icon" onClick={() => setIsOpen(!isOpen)}>
                        <MenuRounded sx={{ color: "inherit" }} />
                    </div>

                </Container>

                {/* The Logout Confirmation Modal */}
                <LogoutModal
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    onLogout={handleLogout}
                />
            </header>
        </>
    );
};

export default AdminDashboardSidebar;

/*LOGOUT MODAL COMPONENT*/
const LogoutModal = ({ show, onClose, onLogout }) => {
    return (
        <Modal show={show} onHide={onClose} centered className="logout-box">
            <Modal.Header closeButton>
                <Modal.Title>Confirm Logout</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to logout?</Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={onClose}
                    style={{
                        textTransform: "none",
                        backgroundColor: "#6c757d",
                        color: "#fff",
                        border: "none",
                        padding: "10px 20px",
                    }}
                >
                    Cancel
                </Button>
                <Button
                    variant="primary"
                    onClick={onLogout}
                    style={{
                        textTransform: "none",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        border: "none",
                        padding: "10px 20px",
                    }}
                >
                    Logout
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

/* USER MENU COMPONENT (Avatar Popup)*/
const UserMenu = ({ currentUser, onLogoutClick }) => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => setOpen(!open);

    // Show My Profile
    const [myProfileShow, setmyProfileShow] = useState(false);

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
                    <div className="popup-link" onClick={() => setmyProfileShow(true)}>
                        My Profile
                    </div>
                    <div className="popup-link logout-btn" onClick={onLogoutClick}>
                        Logout
                    </div>
                </div>
            )}
            <MyProfile show={myProfileShow} handleClose={() => setmyProfileShow(false)} currentUser={currentUser}/>
        </div>
    );
};
