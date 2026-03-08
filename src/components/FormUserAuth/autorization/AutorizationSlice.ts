import axios from "axios";

import type { AuthData, Profile, Token } from "./authType.ts";
import { createSlice } from "@reduxjs/toolkit";

// import { useNavigate } from "react-router";

export async function authenticationUser(data: AuthData) {
  console.log("Сработала аутинфикация", "пришла:", data);
  try {
    const res = await axios.post(
      "https://easydev.club/api/v1/auth/signin",
      data,
    );
    console.log(res);
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function getProfile(): Promise<Profile> {
  console.log(
    "запрос профайла гет",
    "токен вот:",
    localStorage.getItem("accessToken"),
  );
  try {
    const res = await axios.get("https://easydev.club/api/v1/user/profile", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    console.log("фуу гетпрофайл", "вернула:", res.data);
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 401) {
        console.log("access  обновляем");
        const newAccessToken = await refreshToken();
        console.log("пошел запрос рефреш токена");
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
    console.log(
      "зашел в фуу рефреш токен",
      "он тут:",
      localStorage.getItem("refreshToken"),
    );
    const res = await axios.post("https://easydev.club/api/v1/auth/refresh", {
      refreshToken: localStorage.getItem("refreshToken"),
    });
    console.log("это с фреш токена", res.data);
    console.log("что делаем дальше кэп?");
    const newAccessToken = res.data.accessToken;
    const newRefreshToken = res.data.refreshToken;

    localStorage.setItem("accessToken", newAccessToken);
    localStorage.setItem("refreshToken", newRefreshToken);

    return newAccessToken;
    // localStorage.setItem("accessToken", accessToken);
  } catch (err) {
    console.log("refresh токен просрочен");

    localStorage.removeItem("refreshToken");
    throw err;

    // тут надо сделать если рефреш токен просрочен пользователь перенаправляется на страницу авторизации, рефреш токен чистится
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
      console.log("должна записаться");
      state.textResponseAuth = action.payload;
    },
  },
});

export const { setTextResponseAuth } = AuthSlice.actions;

export default AuthSlice.reducer;
