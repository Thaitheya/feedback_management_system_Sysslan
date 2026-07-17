import axios from "axios";

const api = axios.create({
    baseURL: "https://feedback-management-system-sysslan.onrender.com",
    headers: {
        "Content-Type": "application/json"
    }
});

export default api;