import React, { useEffect, useState } from "react";
import { FitnessCenterRounded, TimelapseRounded } from "@mui/icons-material";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import "./../../styles/cards_styles/WorkoutCardStyle.css";

const WorkoutCard = ({
    workout,
    displayBtn = true,
    onEdit,
    onDelete,
    onToggleCompletion,
}) => {
    const [loading, setLoading] = useState(false);

    return (
        <div className="workout-card">
            <div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                    }}
                >
                    <div
                        className="workout-category"
                        style={{ height: "fit-content" }}
                    >
                        #{workout?.category}
                    </div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            height: "fit-content",
                        }}
                    >
                        <div
                            className="workout-sets"
                            style={{ fontSize: "13px" }}
                        >
                            Achieved: {workout?.completed ? "true" : "false"}
                        </div>
                        <div style={{ height: "fit-content" }}>
                            <Button
                                variant="link"
                                className="check-btn p-1"
                                onClick={() => onToggleCompletion(workout.id)}
                            >
                                <i className={`bi ${workout?.completed ? "bi-check-circle-fill" : "bi-check-circle"}`}
                                    style={{ color: workout?.completed ? "green" : "inherit", fontSize: "12px" }} />
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="workout-name">{workout?.workoutName}</div>
            </div>

            <div className="workout-sets">
                Count: {workout?.sets} sets X {workout?.reps} reps
            </div>
            <div
                className="workout-flex"
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                }}
            >
                <div style={{ display: "flex", gap: "15px", width: "100%" }}>
                    <div className="workout-details">
                        <FitnessCenterRounded sx={{ fontSize: "20px" }} />
                        {workout?.weight} kg
                    </div>
                    <div className="workout-details">
                        <TimelapseRounded sx={{ fontSize: "20px" }} />
                        {workout?.duration} min
                    </div>
                </div>

                {displayBtn && (
                    <div style={{ display: "flex", gap: "15px" }}>
                        <Button variant="link" className="edit-btn" onClick={() => onEdit(workout)}>
                            <div className="edit-icon">
                                <i
                                    className="bi bi-pencil-square"
                                    aria-hidden="true"
                                ></i>
                            </div>
                        </Button>

                        <Button variant="link" className="delete-btn" onClick={() => onDelete(workout.id)}>
                            <div className="delete-icon">
                                <i
                                    className="bi bi-trash-fill"
                                    aria-hidden="true"
                                ></i>
                            </div>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WorkoutCard;
