import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { accessTokenClosure } from "../../const/const.ts";

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
  } catch (err) {
    console.log(err);
  } finally {
    // localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
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
