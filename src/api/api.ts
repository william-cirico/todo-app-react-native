import axios from "axios";

const API = axios.create({
    baseURL: "https://adb7-179-127-165-94.sa.ngrok.io"
});

export default API;