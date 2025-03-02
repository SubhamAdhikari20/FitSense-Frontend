// utils/dataProcessors.js
export const processWeeklyData = (workouts) => {
    const weeklyMap = {};

    workouts.forEach(workout => {
        const weekNumber = getWeekNumber(workout.createdAt);
        if (!weeklyMap[weekNumber]) {
            weeklyMap[weekNumber] = {
                calories: 0,
                minutes: 0,
                workouts: 0
            };
        }
        weeklyMap[weekNumber].calories += workout.caloriesBurned;
        weeklyMap[weekNumber].minutes += workout.duration;
        weeklyMap[weekNumber].workouts++;
    });

    return Object.entries(weeklyMap).map(([week, data]) => ({
        week: `Week ${week}`,
        ...data
    }));
};