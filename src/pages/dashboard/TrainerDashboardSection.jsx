import React, { useEffect, useState } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import './../../styles/dashboard_styles/DashboardSectionStyle.css';
import BMICard from "../../components/cards/BMICard.jsx";


const TrainerDashboardSection = ({ currentUser }) => {
    return (
        <section className="dashboard-section">
            <Container className="dashboard-section-container">
                <Row className="row-wrapper">
                    <h1>Dashboard</h1>
                    <Col className="col-flex-wrapper">
                        <BMICard currentUser={currentUser} />
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default TrainerDashboardSection;
