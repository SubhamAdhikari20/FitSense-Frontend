import React from "react";
import { FitnessCenterRounded, TimelapseRounded } from "@mui/icons-material";
import styled from "styled-components";
import './../../styles/cards_styles/WorkoutCardStyle.css';

const WorkoutCard = ({ workout }) => {
    return (
        <div className="workout-card">
            <div className="workout-category">#{workout?.category}</div>
            <div className="workout-name">{workout?.workoutName}</div>
            <div className="workout-sets">
                Count: {workout?.sets} sets X {workout?.reps} reps
            </div>
            <div className="workout-flex">
                <div className="workout-details">
                    <FitnessCenterRounded sx={{ fontSize: "20px" }} />
                    {workout?.weight} kg
                </div>
                <div className="workout-details">
                    <TimelapseRounded sx={{ fontSize: "20px" }} />
                    {workout?.duration} min
                </div>
            </div>
        </div>

        // <Card>
        //     <Category>#{workout?.category}</Category>
        //     <Name>{workout?.workoutName}</Name>
        //     <Sets>
        //         Count: {workout?.sets} sets X {workout?.reps} reps
        //     </Sets>
        //     <Flex>
        //         <Details>
        //             <FitnessCenterRounded sx={{ fontSize: "20px" }} />
        //             {workout?.weight} kg
        //         </Details>
        //         <Details>
        //             <TimelapseRounded sx={{ fontSize: "20px" }} />
        //             {workout?.duration} min
        //         </Details>
        //     </Flex>
        // </Card>
    );
};


const Card = styled.div`
    flex: 1;
    min-width: 250px;
    max-width: 400px;
    padding: 16px 18px;
    border: 1px solid ${({ theme }) => theme.text_primary + 20};
    border-radius: 14px;
    box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + 15};
    display: flex;
    flex-direction: column;
    gap: 6px;
    @media (max-width: 600px) {
        padding: 12px 14px;
    }
`;
const Category = styled.div`
    width: fit-content;
    font-size: 14px;
    color: ${({ theme }) => theme.primary};
    font-weight: 500;
    background: ${({ theme }) => theme.primary + 20};
    padding: 4px 10px;
    border-radius: 8px;
`;
const Name = styled.div`
    font-size: 20px;
    color: ${({ theme }) => theme.text_primary};
    font-weight: 600;
`;
const Sets = styled.div`
    font-size: 15px;
    color: ${({ theme }) => theme.text_secondary};
    font-weight: 500;
    display: flex;
    gap: 6px;
`;
const Flex = styled.div`
    display: flex;
    gap: 16px;
`;
const Details = styled.div`
    font-size: 15px;
    color: ${({ theme }) => theme.text_primary};
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 6px;
`;



export default WorkoutCard;
