import React from 'react';
import { BarChart } from "@mui/x-charts/BarChart";
import { Container } from "react-bootstrap";
import WeekPicker from "./../frontend/WeekPicker.jsx";
import './../../styles/cards_styles/WeeklyStatCardStyle.css';
import { getCurrentWeekRange } from './../../utils/dateHelpers.js';

const WeeklyStatCard = ({ data, onWeekChange }) => {
    const chartSetting = {
        height: 400,
        margin: { top: 40, right: 20, left: 60, bottom: 60 },
    };

    return (
        <Container fluid className="weekly-stat-card p-3">
            <div className="header-container">
                <h3 className="weekly-stat-title">Weekly Calories Burned & Time</h3>
                <WeekPicker
                    week={data.selectedWeek}
                    onChange={onWeekChange}
                />
            </div>

            {data.weeklyData.weeks?.length > 0 ? (
                <div className="chart-container">
                    <BarChart
                        {...chartSetting}
                        xAxis={[{
                            scaleType: 'band',
                            data: data.weeklyData.weeks,
                            label: "Days of Week",
                            tickLabelStyle: { fontSize: '0.75rem' },
                        }]}
                        yAxis={[{ label: '' }]}
                        series={[
                            {
                                data: data.weeklyData.calories,
                                label: 'Calories (kcal)',
                                color: "#FF6384"
                            },
                            {
                                data: data.weeklyData.minutes,
                                label: 'Minutes',
                                color: "#36A2EB"
                            }
                        ]}
                        slotProps={{
                            legend: {
                                direction: 'row',
                                position: { vertical: 'top', horizontal: 'right' },
                                labelStyle: { fontSize: '0.8rem' },
                                padding: 0,
                                itemMarkWidth: 10,
                                itemMarkHeight: 10
                            },
                            bar: {
                                style: { stroke: "#black", strokeWidth: 1, },
                            },

                        }}
                    />
                </div>
            ) : (
                <div className="no-data">No data available for selected week</div>
            )}
        </Container>
    );
};

// Helper to check if selected week is current week
const isCurrentWeek = (selectedWeek) => {
    const currentWeekEnd = getCurrentWeekRange().end;
    return selectedWeek.end >= currentWeekEnd;
};

export default WeeklyStatCard;