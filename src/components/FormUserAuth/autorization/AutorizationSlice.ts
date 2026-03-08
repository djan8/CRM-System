import axios from "axios";

import type { AuthData, Profile, Token } from "./authType.ts";
import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

export async function authenticationUser(data: AuthData) {
  try {
    const res = await axios.post(
      "https://easydev.club/api/v1/auth/signin",
      data,
    );
    return res.data;
  } catch (err) {
    if (err instanceof Error) {
      message.error(err.message);
    }
    throw err;
  }
}

export async function getProfile(): Promise<Profile> {
  try {
    const res = await axios.get("https://easydev.club/api/v1/user/profile", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 401) {
        const newAccessToken = await refreshToken();
        const res = await axios.get(
          "https://easydev.club/api/v1/user/profile",
          {
            headers: {
              Authorization: `Bearer ${newAccessToken}`,
            },
          },
        );
        return res.data;
      }
    }
    throw err;
  }
}

async function refreshToken() {
  try {
    const res = await axios.post("https://easydev.club/api/v1/auth/refresh", {
      refreshToken: localStorage.getItem("refreshToken"),
    });
    const newAccessToken = res.data.accessToken;
    const newRefreshToken = res.data.refreshToken;

    localStorage.setItem("accessToken", newAccessToken);
    localStorage.setItem("refreshToken", newRefreshToken);

    return newAccessToken;
  } catch (err) {
    if (err instanceof Error) {
      message.error(err.message);
      message.error("refresh токен просрочен");
    }
    localStorage.removeItem("refreshToken");
    throw err;
  }
}

export function setTokenToLocalStorage(tokens: Token) {
  const { accessToken, refreshToken } = tokens;
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
}

export interface Props {
  textResponseAuth: string;
}

const initialState: Props = {
  textResponseAuth: "",
};

export const AuthSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    setTextResponseAuth: (state, action) => {
      state.textResponseAuth = action.payload;
    },
  },
});

export const { setTextResponseAuth } = AuthSlice.actions;

export default AuthSlice.reducer;
