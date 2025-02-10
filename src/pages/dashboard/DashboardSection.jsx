import React, { useEffect, useState } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import './../../styles/dashboard_styles/DashboardSectionStyle.css';
import { counts } from './../../utils/data';
import CountsCard from './../../components/cards/CountsCard.jsx';
import WeeklyStatCard from "../../components/cards/WeeklyStatCard.jsx";
import CategoryChartCard from "../../components/cards/CategoryChartCard.jsx";
import AddWorkoutCard from "../../components/cards/AddWorkoutCard.jsx";
import WorkoutCard from "../../components/cards/WorkoutCard.jsx";

const DashboardSection = () => {
    const data = {
        "totalCaloriesBurnt": 13500,
        "totalWorkouts": 6,
        "avgCaloriesBurntPerWorkout": 2250,
        "totalWeeksCaloriesBurnt": {
            "weeks": [
                "17th",
                "18th",
                "19th",
                "20th",
                "21th",
                "22th",
                "23th"
            ],

            "caloriesBurned": [
                10500,
                0,
                0,
                0,
                0,
                0,
                13500
            ]
        },

        "pieChartData": [
            {
                "id": 0,
                "value": 6000,
                "label": "Legs"
            },

            {
                "id": 1,
                "value": 1500,
                "label": "Back"
            },

            {
                "id": 2,
                "value": 3750,
                "label": "Shoulder"
            },

            {
                "id": 3,
                "value": 2250,
                "label": "ABS"
            }
        ]
    }



    return (
        <>
            <section className="dashboard-section">
                <Container className="dashboard-section-container">
                    <Row className="row-wrapper">
                        <h1>Dashboard</h1>

                        {/* {counts.map((item) => (
                            <Col >
                                <CountsCard item={item} data={data} />
                            </Col>

                        ))} */}

                        <Col className="col-flex-wrapper">
                            {counts.map((item) => (
                                <CountsCard item={item} data={data} />
                            ))}
                        </Col>

                    </Row>

                    <Row className="row-wrapper">
                        <Col className="col-flex-wrapper">
                            <WeeklyStatCard data={data} />
                            <CategoryChartCard data={data} />
                            <AddWorkoutCard data={data} />
                        </Col>
                    </Row>

                    <Row className="row-wrapper">
                        <h1>Todays Workouts</h1>

                        <Col className="col-section">
                            <div className="card-wrapper">
                                <WorkoutCard />
                                <WorkoutCard />
                                <WorkoutCard />
                                <WorkoutCard />
                                <WorkoutCard />
                                <WorkoutCard />
                                <WorkoutCard />
                                <WorkoutCard />
                            </div>

                        </Col>
                    </Row>

                </Container>
            </section>
        </>
    );
};



const Wrapper = styled.div`
    flex: 1;
    max-width: 1400px;
    display: flex;
    flex-direction: column;
    gap: 22px;
    @media (max-width: 600px) {
        gap: 12px;
    }
`;
const Title = styled.div`
    padding: 0px 16px;
    font-size: 22px;
    color: ${({ theme }) => theme.text_primary};
    font-weight: 500;
`;
const FlexWrap = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 22px;
    padding: 0px 16px;
    @media (max-width: 600px) {
        gap: 12px;
    }
`;
const Section = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0px 16px;
    gap: 22px;
    padding: 0px 16px;
    @media (max-width: 600px) {
        gap: 12px;
    }
`;
const CardWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    margin-bottom: 100px;
    @media (max-width: 600px) {
        gap: 12px;
    }
`;




export default DashboardSection;
