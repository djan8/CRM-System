import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Props {
  isAuth: boolean;
  isChecking: boolean;
  isRegSuccess: boolean;
  isModalMode: boolean;
}

const initialState: Props = {
  isAuth: false,
  isChecking: false,
  isRegSuccess: false,
  isModalMode: true,
};

export const AppSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setIsChecking: (state, action: PayloadAction<boolean>) => {
      state.isChecking = action.payload;
    },
    setRegIsSuccess: (state) => {
      state.isRegSuccess = !state.isRegSuccess;
    },
    setModalMode: (state, action: PayloadAction<boolean>) => {
      state.isModalMode = action.payload;
    },
  },
});

export const { setIsAuth, setRegIsSuccess, setIsChecking, setModalMode } =
  AppSlice.actions;

export default AppSlice.reducer;
