import Axios from "axios";

export const AuthAxios = Axios.create({
  baseURL: "https://mycliq-backend.onrender.com/api/",
  withCredentials: false,
});

// Axios instance for authentication related calls
export const BaseAxios = Axios.create({
  baseURL: "https://mycliq-backend.onrender.com/api/",
  withCredentials: false,
});

AuthAxios.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('authToken')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
