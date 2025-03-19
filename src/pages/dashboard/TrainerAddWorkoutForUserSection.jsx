import React, { useEffect, useState } from "react";
import { Container, Button, Row, Col, Form } from "react-bootstrap";
import { Avatar } from "@mui/material";
import './../../styles/dashboard_styles/TrainerAddWorkoutForUserSectionStyle.css';
import WorkoutCard from "../../components/cards/WorkoutCard";
import Dropdown from './../../components/buttons/Dropdown1.jsx';
import { calculateCaloriesBurned } from './../../utils/calculateCaloriesBurned.js';
import { addWorkout, updateWorkout, deleteWorkout, getTraineeWorkoutsByTrainer } from './../../apis/Api.js';


const TrainerAddWorkoutForUserSection = ({ currentUser, trainee }) => {
    // Form fields
    const [category, setCategory] = useState("");
    const [workoutName, setWorkoutName] = useState("");
    const [sets, setSets] = useState("");
    const [reps, setReps] = useState("");
    const [weight, setWeight] = useState("");
    const [duration, setDuration] = useState("");
    // const [todaysWorkouts, setTodaysWorkouts] = useState([]);
    const [todaysWorkouts, setTodaysWorkouts] = useState({
        pending: [],
        completed: []
    });

    const [date, setDate] = useState(() => {
        const now = new Date();
        return now // YYYY-MM-DD format
    });

    const { fullName, phoneNumber, email, profilePicture } = trainee;
    const avatarLetter = fullName ? fullName.charAt(0).toUpperCase() : "U";

    // const formattedDate = `${date.$y}-${String(date.$M + 1).padStart(2, '0')}-${String(date.$D).padStart(2, '0')}`;
    // setDate(formattedDate);

    // Loading state for form submission
    const [loading, setLoading] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const [editingWorkout, setEditingWorkout] = useState(null);
    const [completedWorkouts, setCompletedWorkouts] = useState({});

    const [completed, setCompleted] = useState(false);

    const categoryOptions = [
        { label: "Arms", value: "Arms" },
        { label: "Abs", value: "Abs" },
        { label: "Chest", value: "Chest" },
        { label: "Shoulder", value: "Shoulder" },
        { label: "Back", value: "Back" },
        { label: "Legs", value: "Legs" },
    ];

    const handleCategorySelect = (selectedValue) => {
        setCategory(selectedValue);
    };

    // Validtion
    const validateInputs = () => {
        // Frontend validation
        if (!category || !workoutName || !sets || !reps || !weight || !duration) {
            alert("Please, insert all details!!!");
            setLoading(false);
            setButtonDisabled(false);
            return false;
        }

        if (category === "Select Category") {
            alert("Please, selet a category!!");
            setLoading(false);
            setButtonDisabled(false);
            return false;
        }

        if (!/^\d+$/.test(sets)) {
            alert("Sets should contain only digits!");
            setLoading(false);
            setButtonDisabled(false);
            return false;
        }

        if (!/^\d+$/.test(reps)) {
            alert("Reps should contain only digits!");
            setLoading(false);
            setButtonDisabled(false);
            return false;
        }

        if (!/^\d+$/.test(weight) && !/^\d+(\.\d+)?$/.test(weight)) {
            alert("Weight should contain digits and a number with up to 2 decimal places!!");
            setLoading(false);
            setButtonDisabled(false);
            return false;
        }

        if (!/^\d+$/.test(duration)) {
            alert("Duration should contain only digits!");
            setLoading(false);
            setButtonDisabled(false);
            return false;
        }
        return true;
    };

    const getTodaysWorkout = async () => {
        const token = localStorage.getItem("fitsense-app-token");
        try {
            const res = await getTraineeWorkoutsByTrainer(token, date, trainee.id);
            const workouts = res?.data?.workouts || [];

            // Filter workouts for current trainee
            const traineeWorkouts = workouts.filter(workout =>
                workout.User?.id === trainee.id
            );
            console.log(workouts);
            
            const pending = traineeWorkouts.filter(w => !w.completed);
            const completed = traineeWorkouts.filter(w => w.completed);

            setTodaysWorkouts({ pending, completed });
        } catch (error) {
            // console.error("Error fetching workouts:", error.response);
            console.error("Fetch Error Details:", {
                url: error.config?.url,
                params: error.config?.params,
                status: error.response?.status,
                data: error.response?.data
            });
        }
    };

    /*
    const getTodaysWorkout = async () => {
        const token = localStorage.getItem("fitsense-app-token");
        try {
            const res = await getWorkouts(token, date);
            setTodaysWorkouts(res?.data?.workouts || []);
            console.log("Workouts fetched:", res.data);
        }
        catch (error) {
            console.error("Error fetching workouts:", error.response);
        }
    };
    */

    // Edit handler
    const handleEditWorkout = (workout) => {
        setEditingWorkout(workout);
        setCategory(workout.category);
        setWorkoutName(workout.workoutName);
        setSets(workout.sets);
        setReps(workout.reps);
        setWeight(workout.weight);
        setDuration(workout.duration);
    };

    const handleDeleteWorkout = async (workoutId) => {
        if (window.confirm("Are you sure you want to delete this workout?")) {
            try {
                await deleteWorkout({ workoutId });
                getTodaysWorkout();
                alert("Workout deleted successfully!");
            }
            catch (error) {
                console.error("Delete error:", error);
                alert("Failed to delete workout");
            }
        }
    };

    useEffect(() => {
        getTodaysWorkout();
    }, [date]);


    // Update handleAddWorkout to handle updates
    const handleAddWorkout = async (e) => {
        e.preventDefault();
        setLoading(true);
        setButtonDisabled(true);

        if (validateInputs()) {
            try {
                if (editingWorkout) {
                    // Update existing workout
                    // await updateWorkout({
                    //     id: editingWorkout.id,
                    //     category,
                    //     workoutName,
                    //     sets,
                    //     reps,
                    //     weight,
                    //     duration,
                    //     caloriesBurned: calculateCaloriesBurned(category, weight, duration)
                    // });
                    // alert("Workout updated successfully!");


                    // For user
                    if (currentUser.role === "user") {
                        // Update existing workout
                        await updateWorkout({
                            id: editingWorkout.id,
                            category,
                            workoutName,
                            sets,
                            reps,
                            weight,
                            duration,
                            caloriesBurned: calculateCaloriesBurned(category, weight, duration)
                        });
                        alert("Workout updated successfully!");
                    }
                    // For Trainer
                    else if (currentUser.role === "trainer") {
                        // Update existing workout
                        await updateWorkout({
                            id: editingWorkout.id,
                            category,
                            workoutName,
                            sets,
                            reps,
                            weight,
                            duration,
                            caloriesBurned: calculateCaloriesBurned(category, weight, duration)
                        });
                        alert("Workout updated successfully!");

                    }
                    else {
                        return
                    }

                }
                else {
                    // Add new workout
                    // await addWorkout({
                    //     trainerId: currentUser?.id,
                    //     userId: trainee.id,
                    //     category,
                    //     workoutName,
                    //     sets,
                    //     reps,
                    //     weight,
                    //     duration,
                    //     caloriesBurned: calculateCaloriesBurned(category, weight, duration),
                    //     completed: completed
                    // });

                    // alert("Workout added successfully!");


                    // For user
                    if (currentUser.role === "user") {
                        // Add new workout
                        await addWorkout({
                            userId: currentUser?.id,
                            category,
                            workoutName,
                            sets,
                            reps,
                            weight,
                            duration,
                            caloriesBurned: calculateCaloriesBurned(category, weight, duration),
                            completed: completed
                        });
                        alert("Workout added successfully!");
                    }
                    // For Trainer
                    else if (currentUser.role === "trainer") {
                        // Add new workout
                        await addWorkout({
                            trainerId: currentUser.id,
                            userId: trainee.id,
                            category,
                            workoutName,
                            sets,
                            reps,
                            weight,
                            duration,
                            caloriesBurned: calculateCaloriesBurned(category, weight, duration),
                            completed: completed
                        });
                        alert("Workout added successfully!");
                    }

                    else {
                        return
                    }
                }

                // Reset form and refresh data
                setEditingWorkout(null);
                resetForm();
                getTodaysWorkout();
            }
            catch (error) {
                console.error("Operation error:", error);
                alert(error?.response?.data?.error || "Operation failed");
            }
            finally {
                setLoading(false);
                setButtonDisabled(false);
            }
        }
    };


    // Add form reset function
    const resetForm = () => {
        setCategory("Select Category");
        setWorkoutName("");
        setSets("");
        setReps("");
        setWeight("");
        setDuration("");
        setEditingWorkout(null);
    };

    return (
        <section className="trainer_add_workouts-section">
            <Container className="trainer_add_workouts-section-container">
                <Row className="row-wrapper mb-5">
                    <Col className="left-rainer_add_workouts-container">
                        <Col className="col-left">
                            <h1>Trainee Profile</h1>
                            <div className="get_trainees-profile-img">
                                <Avatar src={profilePicture} style={{ width: 200, height: 200 }}>
                                    {avatarLetter}
                                </Avatar>
                                {/* <img src={profilePicture} alt="trainer" width={200} /> */}
                            </div>

                            <div className="get_trainees-profile-info">
                                <h1 className="get_trainees-profile-title">{fullName}</h1>
                                <p className="get_trainees-profile-desc">Contact: {phoneNumber}</p>
                                <p className="get_trainees-profile-desc">Email: {email}</p>
                            </div>
                        </Col>

                        <Col xs={12} md={4} className="mb-1" style={{ width: "fit-content" }}>
                            <Form className="workout-form-wrapper" autoComplete="off">
                                <h1>Add New Workout</h1>
                                <Form.Group className="mb-3" controlId="category">
                                    <div className="category-wrapper">
                                        <Dropdown
                                            options={categoryOptions}
                                            onSelect={handleCategorySelect}
                                            className="category-dropdown"
                                            selectedValue={category}
                                        >
                                            Select Category
                                        </Dropdown>
                                    </div>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="workoutName">
                                    <Form.Control
                                        type="text"
                                        placeholder="Workout Name"
                                        autoComplete="off"
                                        value={workoutName}
                                        onChange={(e) => setWorkoutName(e.target.value)}
                                    />
                                </Form.Group>

                                <Row className="mb-3">
                                    <Col>
                                        <Form.Group controlId="sets">
                                            <Form.Control
                                                type="number"
                                                placeholder="Sets"
                                                autoComplete="off"
                                                value={sets}
                                                onChange={(e) => setSets(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col>
                                        <Form.Group controlId="reps">
                                            <Form.Control
                                                type="number"
                                                placeholder="Reps"
                                                autoComplete="off"
                                                value={reps}
                                                onChange={(e) => setReps(e.target.value)}
                                            />
                                        </Form.Group>

                                    </Col>
                                </Row>

                                <Row className="mb-3">
                                    <Col>
                                        <Form.Group controlId="weight">
                                            <Form.Control
                                                type="text"
                                                placeholder="Weight (kg)"
                                                autoComplete="off"
                                                value={weight}
                                                onChange={(e) => setWeight(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col>
                                        <Form.Group
                                            controlId="duration"
                                        >
                                            <Form.Control
                                                type="text"
                                                placeholder="Duration (min)"
                                                autoComplete="off"
                                                value={duration}
                                                onChange={(e) => setDuration(e.target.value)}
                                            />
                                        </Form.Group>

                                    </Col>
                                </Row>

                                <div style={{ display: "flex", gap: "15px" }}>
                                    <Button className="add-workout-btn" disabled={buttonDisabled} onClick={handleAddWorkout}>
                                        {loading ? "Adding Workout..." : "Add Workout"}
                                    </Button>

                                    <Button className="add-workout-btn" style={{ backgroundColor: "aqua" }} disabled={buttonDisabled} onClick={resetForm}>
                                        Clear
                                    </Button>
                                </div>
                            </Form>
                        </Col>
                    </Col>

                    <Col className="col-right">
                        <div className="col-right-section">
                            <h1>Today's Workout</h1>

                            <div className="card-wrapper">
                                {todaysWorkouts.pending.map((workout) => (
                                    <WorkoutCard
                                        key={workout.id}
                                        workout={workout}
                                        onEdit={handleEditWorkout}
                                        onDelete={handleDeleteWorkout}
                                    />
                                ))}
                                {todaysWorkouts.pending.length === 0 && (
                                    <div className="no-workouts">No pending workouts</div>
                                )}
                            </div>
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
                                        onEdit={handleEditWorkout}
                                        onDelete={handleDeleteWorkout}
                                        displayBtn={false}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </Row>
            </Container>
        </section>
    );
};

export default TrainerAddWorkoutForUserSection;
