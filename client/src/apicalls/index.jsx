//we are creating an axios instance we are telling the backend that we are gonna be talking in json format
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "/", // This allows Vite proxy to work correctly
  headers: {
    "Content-Type": "application/json",
  },
});
