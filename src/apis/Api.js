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

// export default Api;