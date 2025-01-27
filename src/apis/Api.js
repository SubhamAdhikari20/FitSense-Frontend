import axios from "axios";

// Load env file
const dotenv = require("dotenv");
dotenv.config();

const Api = axios.create({
  baseURL: `http://localhost:${process.env.SERVER_PORT}`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const webApi = () => Api.get("/");