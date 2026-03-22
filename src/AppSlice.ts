import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Props {
  isAuth: boolean;
  isChecking: boolean;
  isRegSuccess: boolean;
  isModalMode: boolean;
  dark: boolean;
}

const initialState: Props = {
  isAuth: false,
  isChecking: false,
  isRegSuccess: false,
  isModalMode: true,
  dark: true,
};

export const AppSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setIsChecking: (state, action) => {
      state.isChecking = action.payload;
    },
    setRegIsSuccess: (state) => {
      state.isRegSuccess = !state.isRegSuccess;
    },
    setModalMode: (state, action: PayloadAction<boolean>) => {
      state.isModalMode = action.payload;
    },
    setDark: (state) => {
      state.dark = !state.dark;
    },
  },
});

export const {
  setIsAuth,
  setRegIsSuccess,
  setIsChecking,
  setModalMode,
  setDark,
} = AppSlice.actions;

export default AppSlice.reducer;
