import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { accessTokenClosure } from "../../const/const.ts";
import { message } from "antd";

export async function logoutUser() {
  try {
    await axios.post(
      "https://easydev.club/api/v1/user/logout",
      {
        refreshToken: localStorage.getItem("refreshToken"),
      },
      {
        headers: {
          Authorization: `Bearer ${accessTokenClosure.getAccessToken()}`,
        },
      },
    );
    localStorage.removeItem("refreshToken");
    accessTokenClosure.setAccessToken(null);
  } catch (err) {
    if (err instanceof Error) {
      message.error(err.message);
    }
  }
}

type Role = "ADMIN" | "USER" | "MODERATOR";
interface Profile {
  id: number;
  username: string;
  email: string;
  date: string;
  isBlocked: boolean;
  roles: Role[];
  phoneNumber: string;
}

export interface UserDataState {
  data: Profile | null;
}

const initialState: UserDataState = {
  data: null,
};

export const userDataSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserProfileData: (state, action: PayloadAction<Profile>) => {
      state.data = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserProfileData } = userDataSlice.actions;

export default userDataSlice.reducer;
