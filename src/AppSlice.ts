import { createSlice } from "@reduxjs/toolkit";

export interface Props {
  isAuth: boolean;
  isChecking: boolean;
  regIsSuccess: boolean;
  modalMode: boolean;
  dark: boolean;
}

const initialState: Props = {
  isAuth: false,
  isChecking: true,
  regIsSuccess: false,
  modalMode: true,
  dark: true,
};

export const AppSlice = createSlice({
  name: "visible",
  initialState,
  reducers: {
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    setIsChecking: (state, action) => {
      state.isChecking = action.payload;
    },
    setRegIsSuccess: (state) => {
      state.regIsSuccess = !state.regIsSuccess;
    },
    setModalMode: (state, action) => {
      state.modalMode = action.payload;
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
