// utils/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api', // Set your base URL here
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
