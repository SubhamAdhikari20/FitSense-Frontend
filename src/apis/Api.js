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


export const getDashboardDetails = async (token) =>
    Api.get("/user/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
    });

// export default Api;