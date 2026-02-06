import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";
const api = axios.create({
  baseURL: API_BASE + "/api",
});

api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default api;
