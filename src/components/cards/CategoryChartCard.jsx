import React from 'react';
import styled from "styled-components";
import { PieChart } from "@mui/x-charts/PieChart";
import './../../styles/cards_styles/CategoryCartStyle.css';

const CategoryChartCard = ({ data }) => {
    const pieData = Array.isArray(data?.pieChartData) ? data.pieChartData : [];


    return (
        <div className="category-chart-card">
            <div className="category-chart-title">Weekly Calories Burned (Category)</div>
            {pieData.length > 0 ? (
                <PieChart
                    series={[
                        {
                            data: pieData,
                            innerRadius: 25,
                            outerRadius: 100,
                            paddingAngle: 2,
                            cornerRadius: 4,
                            highlightScope: { faded: 'global', highlighted: 'item' },
                            faded: { innerRadius: 20, additionalRadius: -20 }
                        },
                    ]}
                    height={300}
                    slotProps={{
                        legend: {
                            direction: "column",
                            position: { vertical: "top", horizontal: "right" },
                            labelStyle: { fontSize: "0.8rem" },
                            padding: 0,
                            itemMarkWidth: 10,
                            itemMarkHeight: 10
                        },
                    }}
                />
            ) : (
                <div className="no-data">No category data available</div>
            )}
        </div>
    );
};


export default CategoryChartCard;
