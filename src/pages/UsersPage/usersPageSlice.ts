import { URL } from "../../shared/appConfig.ts";

import type {
  MetaResponse,
  User,
  UserFilters,
  UserRolesRequest,
} from "./types.ts";
import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/api.ts";

export async function getUsersList(
  filter?: UserFilters,
): Promise<MetaResponse<User>> {
  try {
    const res = await api.get(`${URL}/admin/users`, {
      params: filter,
    });
    return { ...res.data, data: res.data.data ?? [] };
  } catch (err) {
    console.log(err);

    throw err;
  }
}

export async function deleteUser(id: number): Promise<void> {
  try {
    await api.delete(`${URL}/admin/users/${id}`);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function blockUser(id: number) {
  try {
    await api.post(`${URL}/admin/users/${id}/block`, null, {});
  } catch (err) {
    console.log(err);
    throw err;
  }
}
export async function unblockUser(id: number) {
  try {
    await api.post(`${URL}/admin/users/${id}/unblock`, null, {});
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function updateRightUser(id: number, roles: UserRolesRequest) {
  console.log(id, roles);
  try {
    const res = await api.post(`${URL}/admin/users/${id}/rights`, roles);
    console.log(res);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

interface Props {
  usersMetaResponse: MetaResponse<User> | null;
}

const initialState: Props = {
  usersMetaResponse: null,
};

export const usersDataSlice = createSlice({
  name: "usersData",
  initialState,
  reducers: {
    setUsersData: (state, action) => {
      state.usersMetaResponse = action.payload;
    },
  },
});

export const { setUsersData } = usersDataSlice.actions;

export default usersDataSlice.reducer;
