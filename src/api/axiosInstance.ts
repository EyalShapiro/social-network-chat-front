import { ERROR_MSG } from '@/constants/errorMsg';
import axios, { AxiosError } from 'axios';

const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';

const axiosInstance = axios.create({
  baseURL: `${SERVER_URL}/api/`,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10 * 1000, //10 seconds
});
export default axiosInstance;

function handleApiError(error: unknown) {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      /* Server responded with a status other than 2xx */
      return Promise.reject({
        message: error.response.data?.message || 'An error occurred',
        status: error.response.status,
      });
    } else if (error.request) {
      // Request was made but no response received (e.g., network error)
      return Promise.reject({ message: ERROR_MSG.noResponse });
    } else {
      // Something else happened while setting up the request
      return Promise.reject({ message: error.message });
    }
  }

  return Promise.reject({ message: ERROR_MSG.unexpected });
}

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.status < 200 || response.status >= 300) {
      throw new Error(`Unexpected status code: ${response.status}`);
    }

    return response;
  },
  (error: AxiosError) => {
    console.error(error);
    if (error.response?.status === 401) {
      // await refreshToken();//todo: implement refresh token (use user_name)
      if (error.config) return axiosInstance(error.config); // Retry original request

      throw handleApiError(error);
    }
    throw handleApiError(error);
  }
);
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);
