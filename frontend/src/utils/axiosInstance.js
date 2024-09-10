import axios from "axios";

const axiosInstance = axios.create({    
    // defining axios obj parameters
    baseURL: "http://localhost:8000", // default URL for backend
    headers: {"Content-Type": "application/json"}, 
    withCredentials: false
});

export default axiosInstance; 