import axios from "axios";

// Create an axios instance
const axiosInstance = axios.create();

// Add a request interceptor to attach the token to all requests
axiosInstance.interceptors.request.use(
  (config) => {
    // Token is stored on successful login in sessionStorage by `Login.tsx`
    const token = sessionStorage.getItem("token");

    if (token) {
      config.headers = config.headers || {};
      config.headers["x-auth-token"] = token;
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default axiosInstance;
