import {
    FitnessCenterRounded,
    LocalFireDepartmentRounded,
    TimelineRounded,
    DoneAllRounded,
    AccessTimeFilledRounded
    
} from "@mui/icons-material";

export const counts = [
    {
        name: "Calories Burned",
        icon: <LocalFireDepartmentRounded sx={{ color: "inherit", fontSize: "26px" }} />,
        iconKey: "fire",
        desc: "Total calories burned today",
        key: "today.totalCalories",
        unit: "kcal",
        color: "#eb9e34",
        lightColor: "#FDF4EA",
    },
    {
        name: "Todays Workouts",
        icon: <FitnessCenterRounded sx={{ color: "inherit", fontSize: "26px" }} />,
        iconKey: "fitness",
        desc: "Total no of workouts for today",
        key: "today.totalWorkouts",
        unit: "workouts",
        color: "#41C1A6",
        lightColor: "#E8F6F3",
    },
    {
        name: "Average  Calories Burned",
        icon: <TimelineRounded sx={{ color: "inherit", fontSize: "26px" }} />,
        iconKey: "timeline",
        desc: "Average Calories Burned on each workout",
        key: "today.avgCalories",
        unit: "kcal",
        color: "#FF9AD5",
        lightColor: "#FEF3F9",
    },
    {
        name: "Today's Completed Workouts",
        icon: <DoneAllRounded sx={{ color: "inherit", fontSize: "26px" }} />,
        desc: "Completed workouts today",
        key: "today.completedWorkouts",
        unit: "workouts",
        color: "#4CAF50",
        lightColor: "#E8F5E9",
    },
    {
        name: "Total Completed Workouts",
        icon: <DoneAllRounded sx={{ color: "inherit", fontSize: "26px" }} />,
        desc: "Lifetime completed workouts",
        key: "lifetime.completedWorkouts",
        unit: "workouts",
        color: "#3F51B5",
        lightColor: "#E8EAF6",
    },
    {
        name: "Total Minutes",
        icon: <AccessTimeFilledRounded sx={{ color: "inherit", fontSize: "26px" }} />,
        desc: "Total workout minutes",
        key: "lifetime.totalMinutes",
        unit: "mins",
        color: "#9C27B0",
        lightColor: "#F3E5F5",
    },
    {
        name: "Total Calories",
        icon: <LocalFireDepartmentRounded sx={{ color: "inherit", fontSize: "26px" }} />,
        desc: "Lifetime calories burned",
        key: "lifetime.totalCalories",
        unit: "kcal",
        color: "#F44336",
        lightColor: "#FFEBEE",
    }
    
];


// export const icons = {
//     fire: <LocalFireDepartmentRounded sx={{ color: "inherit", fontSize: "26px" }} />,
//     fitness: <FitnessCenterRounded sx={{ color: "inherit", fontSize: "26px" }} />,
//     timeline: <TimelineRounded sx={{ color: "inherit", fontSize: "26px" }} />,
// };