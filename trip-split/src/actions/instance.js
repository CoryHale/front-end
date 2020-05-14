import axios from 'axios';
import { dbUrl } from './index'; 

const instance = axios.create({
  baseURL: `${dbUrl}/api`,
  headers: {
    authorization: localStorage.getItem('token'),
  }
})

instance.interceptors.request.use(
  config => {
    config.headers.authorization = localStorage.getItem('token');
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

export default instance