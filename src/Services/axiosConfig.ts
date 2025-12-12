import axios from "axios";

// Create an axios instance
const axiosInstance = axios.create();

// Add a request interceptor to attach the token to all requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token =
      sessionStorage.getItem("token") ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTBhZTc1OWRiMzgxM2E2NTAyZmMyZmMiLCJpc0J1c2luZXNzIjp0cnVlLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2OTg4NDI5NTJ9.En62ry5Gu9FMBAvxyltv0eRYhpJIJs_aW06QAtxXRck";

    if (token) {
      config.headers = config.headers || {};
      config.headers["x-auth-token"] = token;
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
