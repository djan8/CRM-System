import type { UserRegistrationData } from "../autorization/authType.ts";
import { createSlice } from "@reduxjs/toolkit";

import { api } from "../../../api/api.ts";

export async function registerUser(data: UserRegistrationData): Promise<void> {
  try {
    await api.post("/auth/signup", data);
  } catch (err) {
    console.log("ошибка регистрации", err);
    throw err;
  }
}

interface RegistrationSlice {
  textResponseReg: string;
}

const initialState: RegistrationSlice = {
  textResponseReg: "",
};

export const RegistrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    setTextResponseReg: (state, action) => {
      state.textResponseReg = action.payload;
    },
  },
});

export const { setTextResponseReg } = RegistrationSlice.actions;

export default RegistrationSlice.reducer;
