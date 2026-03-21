import axios from "axios";
import { accessTokenStore, URL } from "../const/const.ts";
import { refreshToken } from "../components/FormUserAuth/autorization/AutorizationSlice.ts";

export const api = axios.create({
  baseURL: URL,
});
export const refreshApi = axios.create({
  baseURL: URL,
});
export const logoutApi = axios.create({
  baseURL: URL,
});

api.interceptors.request.use((config) => {
  const accessToken = accessTokenStore.getAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(undefined, async (error) => {
  const originalRequest = error.config;
  console.log(originalRequest);
  if (error.response?.status === 401 && !originalRequest._retry) {
    console.log("сработал интерцептор");
    originalRequest._retry = true;
    const newAccessToken = await refreshToken();
    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
    return api(originalRequest);
  }
  throw error;
});
