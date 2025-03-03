import React, { useEffect, useState } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import './../../styles/dashboard_styles/DashboardSectionStyle.css';
import { counts } from './../../utils/data';
import CountsCard from './../../components/cards/CountsCard.jsx';
import WeeklyStatCard from "../../components/cards/WeeklyStatCard.jsx";
import CategoryChartCard from "../../components/cards/CategoryChartCard.jsx";
import LineGraphCard from "../../components/cards/LineGraphCard.jsx";
import BMICard from "../../components/cards/BMICard.jsx";
import WorkoutCard from "../../components/cards/WorkoutCard.jsx";
import { getWorkouts, toggleWorkoutCompletion, getLifeTimeWorkouts, getWeeklyStats, getTodayWorkouts } from './../../apis/Api.js';
import { getCurrentWeekRange, getAdjacentWeek } from './../../utils/dateHelpers.js';


const DashboardSection = ({currentUser}) => {
    const [stats, setStats] = useState({
        today: {
            totalCalories: 0,
            avgCalories: 0,
            totalWorkouts: 0,
            completedWorkouts: 0
        },
        lifetime: {
            completedWorkouts: 0,
            totalMinutes: 0,
            totalCalories: 0
        },
        weeklyData: {
            calories: [],
            minutes: [],
            workouts: [],
            weeks: []
        },
        pieChartData: [],
        selectedWeek: getCurrentWeekRange() // Helper function
    });

    const [todaysWorkouts, setTodaysWorkouts] = useState({
        pending: [],
        completed: []
    });

    // const [date, setDate] = useState(() => {
    //     const now = new Date();
    //     return now.toISOString().split('T')[0]; // YYYY-MM-DD format
    // });
    const [date, setDate] = useState(() => {
        const now = new Date();
        return now // YYYY-MM-DD format
    });


    // New useEffect for lifetime stats
    useEffect(() => {
        // fetchTodayStats();
        // fetchLifetimeStats();
        // fetchWeeklyStats(stats.selectedWeek);
        getTodaysWorkout();
    }, [date]);


    // Fetch lifetime statistics
    const fetchLifetimeStats = async () => {
        try {
            const res = await getLifeTimeWorkouts();
            const workouts = res.data.workouts;

            const pending = workouts.filter(w => !w.completed);
            const completed = workouts.filter(w => w.completed);

            const totalCompletedWorkouts = completed.length;
            const totalMinutes = workouts.reduce((sum, w) => sum + w.duration, 0);
            const totalCalories = completed.reduce((sum, w) => sum + parseFloat(w.caloriesBurned), 0);

            setStats(prev => ({
                ...prev,
                lifetime: {
                    completedWorkouts: totalCompletedWorkouts,
                    totalMinutes: totalMinutes,
                    totalCalories: totalCalories
                },
                pieChartData: processCategoryData(workouts)
            }));


        } catch (error) {
            console.error("Error fetching lifetime stats:", error);
        }
    };

    // Fetch Today statistics
    const fetchTodayStats = async () => {
        try {
            const res = await getTodayWorkouts(date);
            const workouts = res?.data?.workouts;

            const pending = workouts.filter(w => !w.completed);
            const completed = workouts.filter(w => w.completed);

            const todayCalories = completed.reduce((sum, w) => sum + parseFloat(w.caloriesBurned), 0);

            const totalWorkoutsToday = pending.length + completed.length;
            const todayCompletedWorkouts = completed.length;

            setStats(prev => ({
                ...prev,
                today: {
                    totalCalories: todayCalories,
                    totalWorkouts: totalWorkoutsToday,
                    avgCalories: (
                        todayCompletedWorkouts > 0 ? parseFloat((todayCalories / todayCompletedWorkouts).toFixed(2)) : 0
                    ),
                    completedWorkouts: todayCompletedWorkouts,
                },
                pieChartData: processCategoryData(workouts)
            }));

        } catch (error) {
            console.error("Error fetching todays stats:", error);
        }
    };

    // Fetch weekly statistics
    const fetchWeeklyStats = async (weekRange) => {
        try {
            const res = await getWeeklyStats(
                weekRange.start.toISOString().split('T')[0], // Format dates
                weekRange.end.toISOString().split('T')[0]
            );

            setStats(prev => ({
                ...prev,
                weeklyData: res.data,
                pieChartData: processCategoryData(res.data.workouts)
            }));

        }
        catch (error) {
            console.error("Error fetching weekly stats:", error);
        }

    };

    const getTodaysWorkout = async () => {
        const token = localStorage.getItem("fitsense-app-token");
        try {
            const res = await getWorkouts(token, date);
            const workouts = res?.data?.workouts || [];

            const pending = workouts.filter(w => !w.completed);
            const completed = workouts.filter(w => w.completed);

            /* 
            const todayCalories = completed.reduce((sum, w) => sum + parseFloat(w.caloriesBurned), 0);

            const totalWorkoutsToday = pending.length + completed.length;
            const todayCompletedWorkouts = completed.length;

            setStats(prev => ({
                ...prev,
                today: {
                    totalCalories: todayCalories,
                    totalWorkouts: totalWorkoutsToday,
                    avgCalories: (
                        todayCompletedWorkouts > 0 ? (todayCalories / todayCompletedWorkouts) : 0
                    ),
                    completedWorkouts: todayCompletedWorkouts,
                }
            }));
            */

            fetchTodayStats();
            fetchLifetimeStats();
            fetchWeeklyStats(stats.selectedWeek);

            // setTodaysWorkouts(workouts);
            setTodaysWorkouts({ pending, completed });
        }
        catch (error) {
            console.error("Error fetching workouts:", error.response);
        }

    };


    // // Fetch today's workouts
    // const fetchTodaysWorkouts = async () => {
    //     try {
    //         const res = await getWorkouts(getCurrentWeekRange());
    //         const workouts = res.data.workouts;

    //         const pending = workouts.filter(w => !w.completed);
    //         const completed = workouts.filter(w => w.completed);

    //         setTodaysWorkouts({ pending, completed });
    //         updateTodayStats(completed);
    //     } catch (error) {
    //         console.error("Error fetching workouts:", error);
    //     }
    // };

    // // Update today's statistics
    // const updateTodayStats = (completedWorkouts) => {
    //     const totalCalories = completedWorkouts.reduce((sum, w) => sum + w.caloriesBurned, 0);
    //     const totalWorkouts = completedWorkouts.length;

    //     setStats(prev => ({
    //         ...prev,
    //         today: {
    //             totalCalories,
    //             avgCalories: totalWorkouts > 0 ? totalCalories / totalWorkouts : 0,
    //             totalWorkouts
    //         }
    //     }));
    // };


    // Handle week navigation
    const handleWeekChange = (direction) => {
        const newWeek = getAdjacentWeek(stats.selectedWeek, direction);
        setStats(prev => ({ ...prev, selectedWeek: newWeek }));
        fetchWeeklyStats(newWeek);
        fetchTodayStats();
        fetchLifetimeStats();
    };

    const handleToggleCompletion = async (workoutId) => {
        try {
            const response = await toggleWorkoutCompletion({ workoutId });
            const updatedWorkout = response.data.workout;

            if (updatedWorkout.completed) {
                alert("You have completed a workout!");
            }
            else {
                alert("You've undone the workout! Let's start again 💪");
            }
            getTodaysWorkout();
        }
        catch (error) {
            console.error("Toggle completion error:", error);
            alert("Failed to update workout status");
        }
    };

    // Process category data for pie chart
    const processCategoryData = (workouts) => {
        const categoryMap = {};
        workouts.forEach(workout => {
            const calories = Number(workout.caloriesBurned) || 0;
            if (calories > 0) {
                categoryMap[workout.category] = (categoryMap[workout.category] || 0) + calories;
            }
        });
        return Object.entries(categoryMap).map(([label, value], id) => ({
            id,
            label,
            value: Number(value.toFixed(2))
        }));
    };


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
                                <CountsCard
                                    // key={item.key}
                                    item={item}
                                    stats={stats}
                                />
                            ))}
                            {/* <AddWorkoutCard/> */}
                            <BMICard currentUser={currentUser}/>
                        </Col>

                    </Row>

                    <Row className="row-wrapper">
                        <Col className="col-flex-wrapper">
                            {/* <WeeklyStatCard data={data} />
                            <CategoryChartCard data={data} />
                            <AddWorkoutCard data={data} /> */}
                            <WeeklyStatCard data={stats} onWeekChange={handleWeekChange} />
                            <LineGraphCard data={stats} />
                            <CategoryChartCard data={stats} />
                        </Col>
                    </Row>

                    <Row className="row-wrapper">
                        <h1>Todays Workouts</h1>

                        <Col className="col-section">
                            <div className="card-wrapper">
                                {todaysWorkouts.pending.map((workout) => (
                                    <WorkoutCard
                                        key={workout.id}
                                        workout={workout}
                                        onToggleCompletion={handleToggleCompletion}
                                        displayBtn={false}
                                    />
                                ))}

                                {todaysWorkouts.pending.length === 0 && (
                                    <div className="no-workouts">No pending workouts</div>
                                )}
                            </div>

                        </Col>
                    </Row>

                    <Row>
                        {todaysWorkouts.completed.length > 0 && (
                            <>
                                <h1 style={{ marginTop: '2rem', fontSize: "22px", textTransform: "none", color: "#28a745" }}>Completed Workouts</h1>
                                <div className="card-wrapper completed-workouts">
                                    {todaysWorkouts.completed.map((workout) => (
                                        <WorkoutCard
                                            key={workout.id}
                                            workout={workout}
                                            onToggleCompletion={handleToggleCompletion}
                                            displayBtn={false}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </Row>

                </Container>
            </section>
        </>
    );
};

export default DashboardSection;
