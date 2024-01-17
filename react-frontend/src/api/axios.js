import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3000",
});

//will be sent w/ every request from the axiosPrivate instance
export const axiosPrivate = axios.create({
  baseURL: "http://localhost:3000",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
