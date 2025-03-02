import React from 'react'
import { LineChart } from "@mui/x-charts/LineChart";
import './../../styles/cards_styles/LineGraphCardStyle.css';

const LineGraphCard = ({ data }) => {
    return (
        <div className="line-graph-card">
            <h3 className="line-graph-title">Weekly Time & Workouts</h3>

            {data.weeklyData.weeks?.length > 0 ? (
                <LineChart
                    xAxis={[
                        {
                            scaleType: "band",  
                            data: data.weeklyData.weeks, 
                            label: "Days",     
                            tickLabelStyle: { fontSize: "0.75rem" },
                        },
                    ]}
                    series={[
                        {
                            data: data.weeklyData.workouts.map(Number),  
                            label: "Workouts",
                            color: "#FF6384",
                        },
                        {
                            data: data.weeklyData.minutes.map(Number),
                            label: "Minutes",
                            color: "#36A2EB",
                        },
                    ]}
                    height={300}
                    slotProps={{
                        legend: {
                            direction: "row",
                            position: { vertical: "top", horizontal: "right" },
                            labelStyle: { fontSize: "0.8rem" },
                            padding: 0,
                            itemMarkWidth: 10,
                            itemMarkHeight: 10
                        },
                    }}
                />
            ) : (
                <div className="no-data">No data available for line graph</div>
            )}
        </div>
    );
}



export default LineGraphCard
