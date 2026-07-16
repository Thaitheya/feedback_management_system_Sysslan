import axios from "axios";

const api = axios.create({
    baseURL: "https://lavish-laughter-production-76b1.up.railway.app",
    headers: {
        "Content-Type": "application/json"
    }
});

export default api;