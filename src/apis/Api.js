import axios from "axios";

const Api = axios.create({
    baseURL: `http://localhost:7777/api`,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});


// export const webApi = () => Api.get("/");

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
        headers: { Authorization: `Bearer ${token}` },
    });
};

// export const getUserByEmail = async (data) => {
//     const token = localStorage.getItem("fitsense-app-token");
//     if (!token) {
//         throw new Error("No authentication token found");
//     }
//     return Api.get("/user/view_user_by_email", {
//         data,
//         headers: { Authorization: `Bearer ${token}` },
//     });
// };

export const getDashboardDetails = async (token) =>
    Api.get("/user/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
    });




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
    return Api.delete("/trainer/delete_trainer", {
        data,
        headers: { Authorization: `Bearer ${token}` },
    });
};

// export const getTrainerByEmail = async (data) => {
//     const token = localStorage.getItem("fitsense-app-token");
//     if (!token) {
//         throw new Error("No authentication token found");
//     }
//     return Api.get("/trainer/view_trainer_by_email", {
//         data,
//         headers: { Authorization: `Bearer ${token}` },
//     });
// };

export const getAllTrainers = async (data) => {
    const token = localStorage.getItem("fitsense-app-token");
    if (!token) {
        throw new Error("No authentication token found");
    }
    return Api.get("/trainer/view_all_trainers", {
        data,
        headers: { Authorization: `Bearer ${token}` },
    });
};




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

// export const getAdminByEmail = async (data) => {
//     const token = localStorage.getItem("fitsense-app-token");
//     if (!token) {
//         throw new Error("No authentication token found");
//     }
//     return Api.get("/admin/view_admin_by_email", {
//         data,
//         headers: { Authorization: `Bearer ${token}` },
//     });
// };


export const getUserByEmail = async (data) =>
    Api.get("/user/view_user_by_email", { params: data });

export const getTrainerByEmail = async (data) =>
    Api.get("/trainer/view_trainer_by_email", { params: data });

export const getAdminByEmail = async (data) =>
    Api.get("/admin/view_admin_by_email", { params: data });


export default Api;