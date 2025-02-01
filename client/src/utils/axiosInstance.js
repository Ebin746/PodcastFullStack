
import axios from 'axios';

const axiosInstance = axios.create({
baseURL: 'https://podcastbackend-y85g.onrender.com/api/',
headers:{
  'Content-Type':'application/json',
},
  withCredentials: true
});
export default axiosInstance;
