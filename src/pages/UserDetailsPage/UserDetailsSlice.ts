import { URL } from "../../shared/appConfig.ts";
import type { User } from "../UsersPage/type.ts";
// import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import type { UserRequest } from "./type.ts";
import { api } from "../../api/api.ts";

export async function getUserDetails(id: number): Promise<User> {
  try {
    const res = await api.get(`${URL}/admin/users/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function refreshUserDetails(
  id: number,
  data: UserRequest,
): Promise<void> {
  try {
    console.log(data);
    await api.put(`${URL}/admin/users/${id}`, data);
  } catch (err) {
    console.log(err);

    throw err;
  }
}

interface initialState {
  userDetails: User | null;
}

const initialState: initialState = {
  userDetails: null,
};

export const usersDetailsSlice = createSlice({
  name: "usersData",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
  },
});

export const { setUserDetails } = usersDetailsSlice.actions;

export default usersDetailsSlice.reducer;
