import { createSlice } from "@reduxjs/toolkit";

export interface Props {
  isAuth: boolean;
  isChecking: boolean;
  regIsSuccess: boolean;
  modalMode: boolean;
}

const initialState: Props = {
  isAuth: false,
  isChecking: false,
  regIsSuccess: false,
  modalMode: true,
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
  },
});

export const { setIsAuth, setRegIsSuccess, setIsChecking, setModalMode } =
  AppSlice.actions;

export default AppSlice.reducer;
