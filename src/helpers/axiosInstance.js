import Axios from "axios";
import { getCookie, setCookie } from "../utils/cookieAuth";

export const AuthAxios = Axios.create({
  baseURL: "https://mycliq-backend-prod-a.onrender.com/api",
  withCredentials: false,
});

// Axios instance for authentication related calls
export const BaseAxios = Axios.create({
  baseURL: "https://mycliq-backend-prod-a.onrender.com/api",
  withCredentials: false,
});

let isRefreshing = false;
let refreshSubscribers = [];

// Function to refresh the access token using the refresh token
async function refreshToken() {
  const refreshToken = getCookie("refreshToken");

  console.log(refreshToken);

  if (
    typeof refreshToken !== "string" ||
    !refreshToken ||
    refreshToken === null
  ) {
    console.log("Refresh token is not available or not a string.");
    throw new Error("Refresh token is invalid or missing.");
  }

  try {
    const response = await BaseAxios.post(
      "/auth/refresh",
      {
        refreshToken: getCookie("refreshToken"),
      },
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );

    console.log("Token refreshed:", response.data);
    setCookie("authToken", response.data.access_token);
    if (response.data.refreshToken) {
      setCookie("refreshToken", response.data.refreshToken);
    }

    return response.data.access_token;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
}

// Function to add subscribers that will be notified when the token is refreshed
function onAccessTokenFetched(newAccessToken) {
  refreshSubscribers.forEach((callback) => callback(newAccessToken));
  refreshSubscribers = [];
}

// // Add response interceptor to handle token expiration
AuthAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response: { status } = {} } = error;
    if (status === 401 && !config._retry) {
      if (!isRefreshing) {
        isRefreshing = true;
        return refreshToken()
          .then((newAccessToken) => {
            isRefreshing = false;
            onAccessTokenFetched(newAccessToken);
            config.headers["Authorization"] = `Bearer ${newAccessToken}`;
            config._retry = true;
            return AuthAxios(config);
          })
          .catch((refreshError) => {
            console.error("Token refresh failed:", refreshError);
            isRefreshing = false;
            // window.location.href = "/";
            throw refreshError;
          });
      }

      return new Promise((resolve) => {
        refreshSubscribers.push((newAccessToken) => {
          config.headers["Authorization"] = `Bearer ${newAccessToken}`;
          resolve(AuthAxios(config));
        });
      });
    }

    return Promise.reject(error);
  }
);

// Add request interceptor to include the token in every request
AuthAxios.interceptors.request.use(
  async (config) => {
    const token = getCookie("authToken");

    console.log(token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
