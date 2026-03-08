import type { UserRegistration } from "../autorization/authType.ts";
import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

export async function registrationUser(data: UserRegistration): Promise<void> {
  try {
    await axios.post("https://easydev.club/api/v1/auth/signup", data);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export interface Props {
  textResponseReg: string;
}

const initialState: Props = {
  textResponseReg: "",
};

export const RegSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    setTextResponseReg: (state, action) => {
      console.log("должна записаться");
      state.textResponseReg = action.payload;
    },
  },
});

export const { setTextResponseReg } = RegSlice.actions;

export default RegSlice.reducer;
