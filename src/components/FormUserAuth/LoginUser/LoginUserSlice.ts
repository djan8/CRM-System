import type { Profile, ProfileData, TokenData } from "./LoginUserType.ts";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { api, refreshApi } from "../../../api/api.ts";

export async function authenticationUser(data: Profile): Promise<TokenData> {
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
    console.log(err);

    throw err;
  }
}

interface InitialState {
  textResponseAuth: string;
}

const initialState: InitialState = {
  textResponseAuth: "",
};

export const AuthorizationSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTextResponseAuth: (state, action: PayloadAction<string>) => {
      state.textResponseAuth = action.payload;
    },
  },
});

export const { setTextResponseAuth } = AuthorizationSlice.actions;

export default AuthorizationSlice.reducer;
