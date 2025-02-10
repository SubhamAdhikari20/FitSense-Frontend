import React, { useState } from "react";
import styled from "styled-components";
import './../../styles/cards_styles/AddWorkoutCardStyle.css';
import Button from './../buttons/Button.jsx';
import TextInput from './../input_fields/TextInput.jsx';

const AddWorkoutCard = ({ workout, setWorkout, addNewWorkout, buttonLoading }) => {
    return (
        <div className="add-workout-card">
            <div className="add-workout-title">Add New Workout</div>
            <TextInput
                label="Workout"
                textArea
                rows={10}
                placeholder={
`Enter in this format:
#Category
-Workout Name
-Sets
-Reps
-Weight
-Duration`
}

                value={workout}
                handelChange={(e) => setWorkout(e.target.value)}
            />
            <Button
                text="Add Workout"
                small
                onClick={() => addNewWorkout()}
                isLoading={buttonLoading}
                isDisabled={buttonLoading}
            />
        </div>




//         <Card>
//             <Title>Add New Workout</Title>
//             <TextInput
//                 label="Workout"
//                 textArea
//                 rows={10}
//                 placeholder={
// `Enter in this format:
// #Category
// -Workout Name
// -Sets
// -Reps
// -Weight
// -Duration`}

//                 value={workout}
//                 handelChange={(e) => setWorkout(e.target.value)}
//             />
//             <Button
//                 text="Add Workout"
//                 small
//                 onClick={() => addNewWorkout()}
//                 isLoading={buttonLoading}
//                 isDisabled={buttonLoading}
//             />
//         </Card>


    );
};

const Card = styled.div`
    flex: 1;
    min-width: 280px;
    padding: 24px;
    border: 1px solid ${({ theme }) => theme.text_primary + 20};
    border-radius: 14px;
    box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + 15};
    display: flex;
    flex-direction: column;
    gap: 6px;
    @media (max-width: 600px) {
        padding: 16px;
    }
`;
const Title = styled.div`
    font-weight: 600;
    font-size: 16px;
    color: ${({ theme }) => theme.primary};
    @media (max-width: 600px) {
        font-size: 14px;
    }
`;


export default AddWorkoutCard
