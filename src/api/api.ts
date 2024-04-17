import axios from "axios";

const axiosPublic = axios.create({
	baseURL: process.env.REACT_APP_BASE_BACKEND_URL,
});

const axiosPrivate = axios.create({
	baseURL: process.env.REACT_APP_BASE_BACKEND_URL,
	headers: { "Content-Type": "application/json" },
	withCredentials: true,
});

export default { axiosPublic, axiosPrivate };
