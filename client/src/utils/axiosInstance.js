
import axios from 'axios';

const axiosInstance = axios.create({
 baseURL: 'https://podcastbackend-y85g.onrender.com/api',
// baseURL:"/api",
  withCredentials: true
});
export default axiosInstance;
