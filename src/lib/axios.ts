import axios from "axios";

export const api = axios.create({
 //  baseURL: "https://TripPlanner.railway.app",
 baseURL: "http://localhost:3333",
});
