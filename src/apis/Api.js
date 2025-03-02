import axios from "axios";

const Api = axios.create({
    baseURL: `http://localhost:7777/api`,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});


// export const webApi = () => Api.get("/");

// General User
export const registerUser = async (data) => Api.post("/user/register_user", data);
export const loginUser = async (data) => Api.post("/user/login_user", data);
export const resetPasswordUser = async (data) => Api.post("/user/forgot_password", data);
export const uploadUserProfilePicture = async (formData) =>
    Api.post("/user/profile_picture", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
// export const deleteUser = async (data) =>
//     Api.delete("/user/delete_user", {
//         data,
//         headers: { Authorization: `Bearer ${token}` },
//     });

export const deleteUser = async (data) => {
    const token = localStorage.getItem("fitsense-app-token");
    if (!token) {
        throw new Error("No authentication token found");
    }
    return Api.delete("/user/delete_user", {
        data,
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const getUserByEmail = async (data) =>
    Api.get("/user/view_user_by_email", { params: data });

export const getDashboardDetails = async (token) =>
    Api.get("/user/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
    });


// User Workout
// export const addWorkout = async (data) => Api.post("/user/workout/add_workout", data);
export const addWorkout = async (data) => {
    const token = localStorage.getItem("fitsense-app-token");
    if (!token) {
        throw new Error("No authentication token found");
    }
    return Api.post("/user/workout/add_workout", data, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const updateWorkout = async (data) => {
    const token = localStorage.getItem("fitsense-app-token");
    if (!token) {
        throw new Error("No authentication token found");
    }
    return Api.put(`/user/workout/update_workout/${data.id}`, data, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const deleteWorkout = async (data) => {
    const token = localStorage.getItem("fitsense-app-token");
    if (!token) {
        throw new Error("No authentication token found");
    }
    return Api.delete(`/user/workout/delete_workout/${data.workoutId}`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { data }
    });
};



export const getWorkouts = async (token, date) =>
    await Api.get(`/user/workout/get_all_workouts`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { date },
    });


export const toggleWorkoutCompletion = async (data) => {
    const token = localStorage.getItem("fitsense-app-token");
    if (!token) {
        throw new Error("No authentication token found");
    }
    return await Api.patch(`/user/workout/toggle_completion/${data.workoutId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
    });
}

export const getTodayWorkouts = async (date) => {
    const token = localStorage.getItem("fitsense-app-token");
    // const isoDate = new Date(date).toISOString();
    if (!token) {
        throw new Error("No authentication token found");
    }
    return await Api.get(`/user/workout/todays_workouts`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { date },

    });
}

// export const getTodayWorkouts = async (date) => {
//     const isoDate = new Date(date).toISOString();  // Convert to ISO string
//     return await Api.get(`/user/workout/todays_workouts?date=${isoDate}`);
// }

export const getLifeTimeWorkouts = async () => {
    const token = localStorage.getItem("fitsense-app-token");
    if (!token) {
        throw new Error("No authentication token found");
    }
    return await Api.get("/user/workout/lifetime_workouts", {
        headers: { Authorization: `Bearer ${token}` }
    });
}

export const getWeeklyStats = async (startDate, endDate) => {
    const token = localStorage.getItem("fitsense-app-token");
    if (!token) {
        throw new Error("No authentication token found");
    }
    return await Api.get(`/user/workout/weekly_stats?startDate=${startDate}&endDate=${endDate}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
}





// Trainer
export const registerTrainer = async (data) => Api.post("/trainer/register_trainer", data);
export const loginTrainer = async (data) => Api.post("/trainer/login_trainer", data);
export const resetPasswordTrainer = async (data) => Api.post("/trainer/forgot_password", data);

export const uploadTrainerProfilePicture = async (formData) =>
    Api.post("/trainer/profile_picture", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });

export const deleteTrainer = async (data) => {
    const token = localStorage.getItem("fitsense-app-token");
    if (!token) {
        throw new Error("No authentication token found");
    }
    return Api.delete(`/trainer/delete_trainer/${data.trainerId}`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { data }
    });
};

export const getTrainerByEmail = async (data) => Api.get("/trainer/view_trainer_by_email", { params: data });

export const getAllTrainers = async () => {
    const token = localStorage.getItem("fitsense-app-token");
    if (!token) {
        throw new Error("No authentication token found");
    }
    return await Api.get(`/trainer/get_all_workouts/`, {
        headers: { Authorization: `Bearer ${token}` }
    });
}



// Admin
export const loginAdmin = async (data) => Api.post("/admin/login_admin", data);
export const resetPasswordAdmin = async (data) => Api.post("/admin/forgot_password", data);

export const uploadAdminProfilePicture = async (formData) =>
    Api.post("/admin/profile_picture", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });

export const deleteAdmin = async (data) => {
    const token = localStorage.getItem("fitsense-app-token");
    if (!token) {
        throw new Error("No authentication token found");
    }
    return Api.delete("/admin/delete_admin", {
        data,
        headers: { Authorization: `Bearer ${token}` },
    });
};


export const getAdminByEmail = async (data) =>
    Api.get("/admin/view_admin_by_email", { params: data });


export default Api;