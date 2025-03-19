import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import './../../styles/dashboard_styles/TrainerTraineeSectionStyle.css';
import GetTraineeCard from './../../components/cards/GetTraineeCard.jsx';
import { getAllTrainees } from './../../apis/Api.js';


const TrainerTraineeSection = () => {
    const [trainees, setTrainees] = useState([]);
    const navigate = useNavigate();

    // Fetch all trainees (users who booked the current trainer)
    const fetchAllTrainees = async () => {
        try {
            const response = await getAllTrainees();
            const fetchedTrainees = response?.data?.trainees || [];

            setTrainees(fetchedTrainees);
        } catch (error) {
            console.error("Error fetching trainees:", error);
            alert("Error fetching trainees. Please try again later.");
        }
    };

    const refreshData = () => {
        fetchAllTrainees();
    };


    useEffect(() => {
        refreshData();
    }, []);

    // When the "Add Workout" button is clicked, navigate to a new route
    const handleAddWorkout = (trainee) => {
        navigate(`/trainer/add-workout/${trainee.id}`, { state: { trainee } });
    };

    return (
        <section className="get_trainees-section">
            <Container className="get_trainees-section-container">
                <h1 className="get_trainees-section-title">Trainees</h1>
                <Row className="get_trainers-row--wrapper">
                    <Col className="get_trainers-col">
                        <div className="get_trainers-card-wrapper">
                            {trainees.length > 0 ? (
                                trainees.map((trainee) => (
                                    <GetTraineeCard
                                        key={trainee.id}
                                        trainee={trainee}
                                        onAddWorkout={handleAddWorkout}
                                    />
                                ))
                            ) : (
                                <div>No available trainees.</div>
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default TrainerTraineeSection;
