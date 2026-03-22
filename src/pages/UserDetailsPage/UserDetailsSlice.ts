import { accessTokenStore, URL } from "../../const/const.ts";
import type { User } from "../UsersPage/type.ts";
import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import type { UserRequest } from "./type.ts";

export async function getUserDetails(id: number): Promise<User> {
  try {
    const accessToken = accessTokenStore.getAccessToken();
    console.log(accessToken);
    const res = await axios.get(`${URL}/admin/users/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

// 4. Обновление данных пользователя
// Method: PUT
// URL: /admin/users/{id}
// Request: UserRequest
// Response: User
export async function refreshUserDetails(
  id: number,
  data: UserRequest,
): Promise<void> {
  try {
    console.log(data);
    const accessToken = accessTokenStore.getAccessToken();
    const res = await axios.put(`${URL}/admin/users/${id}`, data, {
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(res.data);
    // return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log(err.response?.data);
    }
    throw err;
  }
}

interface Props {
  userDetails: User | null;
}

const initialState: Props = {
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
