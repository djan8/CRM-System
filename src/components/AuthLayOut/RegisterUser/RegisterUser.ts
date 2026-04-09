import type { UserRegistrationData } from "../LoginUser/loginUser.types.ts";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { api } from "../../../api/api.ts";

export async function registerUser(data: UserRegistrationData): Promise<void> {
  await api.post("/auth/signup", data);
}

interface InitialState {
  textResponseReg: string;
}

const initialState: InitialState = {
  textResponseReg: "",
};

export const RegistrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    setTextResponseReg: (state, action: PayloadAction<string>) => {
      state.textResponseReg = action.payload;
    },
  },
});

export const { setTextResponseReg } = RegistrationSlice.actions;

export default RegistrationSlice.reducer;
