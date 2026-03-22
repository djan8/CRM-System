// import axios from "axios";

import type { AuthData, ProfileData, TokenData } from "./authType.ts";
import { createSlice } from "@reduxjs/toolkit";

import { accessTokenStore } from "../../../const/const.ts";
import { api, refreshApi } from "../../../api/api.ts";

export async function authenticationUser(data: AuthData): Promise<TokenData> {
  const res = await api.post("/auth/signin", data);
  return res.data;
}

export async function getProfile(): Promise<ProfileData> {
  const res = await api.get("/user/profile");
  return res.data;
}

export async function refreshToken(): Promise<string> {
  try {
    const res = await refreshApi.post("/auth/refresh", {
      refreshToken: localStorage.getItem("refreshToken"),
    });

    localStorage.setItem("refreshToken", res.data.refreshToken);

    return res.data.accessToken;
  } catch (err) {
    accessTokenStore.setAccessToken("");
    localStorage.removeItem("refreshToken");
    throw err;
  }
}

interface AuthorizationSlice {
  textResponseAuth: string;
}

const initialState: AuthorizationSlice = {
  textResponseAuth: "",
};

export const AuthorizationSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTextResponseAuth: (state, action) => {
      state.textResponseAuth = action.payload;
    },
  },
});

export const { setTextResponseAuth } = AuthorizationSlice.actions;

export default AuthorizationSlice.reducer;
