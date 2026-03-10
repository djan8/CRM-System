import axios from "axios";

import type { AuthData, Profile } from "./authType.ts";
import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { accessTokenClosure } from "../../../const/const.ts";

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

export async function getProfile(
  accessValidToken: string | null,
): Promise<Profile> {
  try {
    const res = await axios.get("https://easydev.club/api/v1/user/profile", {
      headers: {
        Authorization: `Bearer ${accessValidToken}`,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function refreshToken() {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    console.log(refreshToken);
    const res = await axios.post("https://easydev.club/api/v1/auth/refresh", {
      refreshToken: refreshToken,
    });
    const newAccessToken = res.data.accessToken;
    const newRefreshToken = res.data.refreshToken;
    console.log("refresh", newRefreshToken);
    console.log("access", newAccessToken);

    accessTokenClosure.setAccessToken(newAccessToken);
    localStorage.setItem("refreshToken", newRefreshToken);

    return newAccessToken;
  } catch (err) {
    if (err instanceof Error) {
      // message.error(err.message);
    }
    accessTokenClosure.setAccessToken("");
    localStorage.removeItem("refreshToken");
    throw err;
  }
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
