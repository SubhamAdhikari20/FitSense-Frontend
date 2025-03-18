import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import './../../styles/dashboard_styles/UserGetTrainersSectionStyle.css';
import { getAllTrainersByUser, getAllBookedTrainersByUser, bookTrainer, cancelTrainerBooking } from './../../apis/Api.js';
import GetTrainersCard from './../../components/cards/GetTrainersCard.jsx';

const UserGetTrainersSection = () => {
    const [trainers, setTrainers] = useState([]);
    const [bookedTrainers, setBookedTrainers] = useState([]);
    // const [isBooked, setIsBooked] = useState(false);

    // const [trainers, setTrainers] = useState({
    //     available: [],
    //     booked: []
    // });

    const fetchAllTrainers = async () => {
        try {
            const response = await getAllTrainersByUser();
            // Assuming your backend returns { getAllTrainers: [...] }
            if (response?.data?.trainers || []) {
                setTrainers(response.data.trainers);
            }
            else {
                setTrainers([]);
            }
        }
        catch (error) {
            console.error("Error fetching trainers:", error);
            alert("Error fetching trainers. Please try again later.");
        }

    };


    // Fetch bookings for current user
    const fetchBookedTrainers = async () => {
        try {
            const response = await getAllBookedTrainersByUser();
            // Assume the API returns an array of booking records.
            // Each booking record should have at least a `trainerId` field.
            const bookings = response?.data?.bookings || [];
            setBookedTrainers(bookings);

        } catch (error) {
            console.error("Error fetching booked trainers:", error);
            alert("Error fetching booked trainers. Please try again later.");
        }
    };

    // Refresh both trainers and booking data
    const refreshData = () => {
        fetchAllTrainers();
        fetchBookedTrainers();
    };


    useEffect(() => {
        refreshData();
    }, []);

    // Handle booking a trainer
    const handleBookTrainer = async (trainerId) => {
        if (!window.confirm("Are you sure you want to book the trainer?")) {
            return;
        }

        try {
            await bookTrainer({ trainerId });
            alert("Trainer booked successfully!");
            refreshData();

        } catch (error) {
            console.error("Error booking trainer:", error);
            alert("Failed to book trainer.");
        }
    };

    // Handle canceling a booking
    const handleCancelBooking = async (trainerId) => {
        if (!window.confirm("Are you sure you want to cancel the booked trainer?")) {
            return;
        }

        try {
            await cancelTrainerBooking(trainerId);
            alert("Booking cancelled successfully!");
            refreshData();
        } catch (error) {
            console.error("Error cancelling booking:", error);
            alert("Failed to cancel booking.");
        }
    };

    // filtering out those that are booked
    // const availableTrainers = trainers.filter(trainer => {
    //     return !bookedTrainers.some(booking => booking.trainerId === trainer.id);
    // });

    // Compute available trainers by filtering out those that are booked
    const availableTrainers = trainers.filter(trainer =>
        !bookedTrainers.some(booking => booking.trainerId === trainer.id)
    );

    return (
        <section className="get_trainers-section">
            <Container className="get_trainers-section-container">
                <h1 className="get_trainers-title">Get Trainers</h1>
                {/* <Row className="get_trainers-row--wrapper mb-5" >
                    <Col className="get_trainers-col">
                        <div className="get_trainers-card-wrapper">
                            {trainers.map((trainer) => (
                                <GetTrainersCard
                                    key={trainer.id}
                                    trainer={trainer}
                                    onBook={handleBookTrainer}
                                />
                            ))}
                        </div>
                    </Col>
                </Row> */}

                {/* Available Trainers Section */}
                <Row className="get_trainers-row--wrapper mb-5">
                    <Col className="get_trainers-col">
                        <h2 className="get_trainers-title">Available Trainers</h2>
                        <div className="get_trainers-card-wrapper">
                            {availableTrainers.length > 0 ? (
                                availableTrainers.map((trainer) => (
                                    <GetTrainersCard
                                        key={trainer.id}
                                        trainer={trainer}
                                        onBook={handleBookTrainer}
                                    />
                                ))
                            ) : (
                                <div>No available trainers.</div>
                            )}
                        </div>
                    </Col>
                </Row>

                {/* Booked Trainers Section */}
                <Row className="get_trainers-row--wrapper">
                    <Col className="get_trainers-col">
                        <h1 className="get_trainers-title">Booked Trainers</h1>
                        <div className="get_trainers-card-wrapper">
                            {bookedTrainers.length > 0 ? (
                                bookedTrainers.map((booking, index) => (
                                    // If the booking record contains trainer details, adjust accordingly.
                                    // Here, we assume booking has a trainerId and we look up details from allTrainers.
                                    (() => {
                                        const trainer = trainers.find(t => t.id === booking.trainerId);
                                        return trainer ? (
                                            <GetTrainersCard
                                                key={index}
                                                trainer={trainer}
                                                onCancel={handleCancelBooking}
                                                isBooked={true}
                                            />
                                        ) : null;
                                    })()
                                ))
                            ) : (
                                <div className="no-booked">No booked trainers.</div>
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default UserGetTrainersSection;
