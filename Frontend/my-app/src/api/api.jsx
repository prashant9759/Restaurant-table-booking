import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const loginUser = (data) => API.post("/users/login", data);
export const registerUser = (data) => API.post("/users", data);
export const getCurrentUser = () => API.get("/users");
export const logoutUser = () => API.post("/users/logout");
