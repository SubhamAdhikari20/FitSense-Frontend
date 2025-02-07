import React from "react";
import styled from "styled-components";
import "./../../styles/dashboard_styles/DashboardStyle.css";


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

const Dashboard = () => {
    return <></>;
};

export default Dashboard;
