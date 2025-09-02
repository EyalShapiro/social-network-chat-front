import axios, { AxiosError } from 'axios';

const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';

const axiosInstance = axios.create({
  baseURL: `${SERVER_URL}/api/`,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10 * 1000, //10 seconds
});
export default axiosInstance;
function handleApiError<ET = unknown>(error: ET) {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      throw new Error(`Error: ${error.response.status} - ${error.response.data?.message || 'An error occurred'}`);
    } else if (error.request) {
      throw new Error('Error: No response received from server.');
    }
  }
  throw new Error('Unexpected error occurred.');
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

    throw handleApiError(error);
  }
);
axiosInstance.interceptors.request.use(
  (config) => {
    // if (config.headers) {
    // 	config.headers["Accept"] = "application/json";
    // }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);
