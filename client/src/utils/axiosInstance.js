
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://podcastbackend-y85g.onrender.com/api',
// baseURL:"/api",
});

// Add an interceptor to attach the token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
