import React from 'react';
import { Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import './../../styles/cards_styles/BMICardStyle.css';

const BMICard = ({currentUser}) => {
    // const { currentUser } = useSelector(state => state.user);
    const bmi = currentUser?.bmi;
    
    return (
        <Card className="dashboard-card">
            <Card.Body>
                <Card.Title>Your BMI</Card.Title>
                <Card.Text className="bmi-value">
                    {bmi || '--'}
                </Card.Text>
                <Card.Text className="bmi-category">
                    {getBMICategory(bmi)}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

// Helper function to determine BMI category
const getBMICategory = (bmi) => {
    if (!bmi) return 'N/A';
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal weight';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
};

export default BMICard
