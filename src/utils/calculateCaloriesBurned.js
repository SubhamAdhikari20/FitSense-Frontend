export const calculateCaloriesBurned = (category, weightKg, durationMins) => {
    // MET values based on workout category
    const MET_VALUES = {
        Arms: 4.0,
        Chest: 6.0,
        Abs: 4.5,
        Back: 6.5,
        Shoulder: 5.5,
        Legs: 7.0
    };

    // Ensure category exists in the MET_VALUES dictionary
    if (!MET_VALUES[category]) {
        throw new Error("Invalid workout category provided.");
    }

    // Fetch MET value for the given category
    const MET = MET_VALUES[category];

    // Convert duration from minutes to hours
    const durationHours = durationMins / 60;

    // Calculate calories burned
    const caloriesBurned = MET * weightKg * durationHours * 3.5;

    // Return the number rounded to 2 decimal places
    return parseFloat(caloriesBurned.toFixed(2));
};
