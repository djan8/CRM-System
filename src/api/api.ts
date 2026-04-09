import axios from "axios";
import { accessTokenStore, URL } from "../shared/appConfig.ts";
import { refreshToken } from "../components/AuthLayOut/LoginUser/LoginUserSlice.ts";

export const api = axios.create({
  baseURL: URL,
});
export const refreshApi = axios.create({
  baseURL: URL,
});
export const logoutApi = axios.create({
  baseURL: URL,
  headers: { Authorization: `Bearer ${accessTokenStore.getAccessToken()}` },
});

api.interceptors.request.use((config) => {
  const accessToken = accessTokenStore.getAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(undefined, async (error) => {
  try {
    if (error.response?.status === 401) {
      const newAccessToken = await refreshToken();
      accessTokenStore.setAccessToken(newAccessToken);
      api.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
      // повторяем запрос который упал
      return api(error.config);
    }
  } catch {
    accessTokenStore.setAccessToken(null);
    localStorage.removeItem("refreshToken");
  }
  throw error;
});
