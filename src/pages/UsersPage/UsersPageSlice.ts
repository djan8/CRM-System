import { URL } from "../../const/const.ts";
import axios from "axios";
import type {
  MetaResponse,
  User,
  UserFilters,
  UserRolesRequest,
} from "./type.ts";
import { createSlice } from "@reduxjs/toolkit";
import { accessTokenStore } from "../../const/const.ts";
import { refreshToken } from "../../components/FormUserAuth/autorization/AutorizationSlice.ts";

export async function getUsersList(
  filter?: UserFilters,
): Promise<MetaResponse<User>> {
  try {
    console.log("ОТПРАВЛЯЮ ЗАПРОС С:", filter);
    console.log(
      "isBlocked тип:",
      typeof filter?.isBlocked,
      "значение:",
      filter?.isBlocked,
    );
    // { sortBy: username, sortOrder: 'asc' }
    console.log("TOKEN", accessTokenStore.getAccessToken());
    console.log(filter, "filter");
    const res = await axios.get(`${URL}/admin/users`, {
      params: filter,
      headers: {
        Authorization: `Bearer ${accessTokenStore.getAccessToken()}`,
      },
    });
    console.log(res.data);
    // return res.data;
    return { ...res.data, data: res.data.data ?? [] };
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.status === 401) {
      // const newAccessToken = await refreshToken();

      await refreshToken();
      const res = await axios.get(`${URL}/admin/users`, {
        params: filter,
        headers: {
          Authorization: `Bearer ${accessTokenStore.getAccessToken()}`,
        },
      });
      console.log(res.data);
      return res.data;

      // const res = await axios.get("https://easydev.club/api/v1/user/profile", {
      //   headers: {
      //     Authorization: `Bearer ${accessTokenClosure.getAccessToken()}`,
      //   },
      // });
      //
      // return res.data;
    }
    throw err;
  }
}
// 7. Удаление пользователя
// Method: DELETE
// URL: /admin/users/{id}
// Response: void

export async function deleteUser(id: number): Promise<void> {
  try {
    await axios.delete(`${URL}/admin/users/${id}`, {
      headers: {
        Authorization: `Bearer ${accessTokenStore.getAccessToken()}`,
      },
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
}
// 5. Блокировка пользователя
// Method: POST
// URL: /admin/users/{id}/block
// Response: User
export async function blockUser(id: number) {
  try {
    await axios.post(`${URL}/admin/users/${id}/block`, null, {
      headers: {
        Authorization: `Bearer ${accessTokenStore.getAccessToken()}`,
      },
    });
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log(err.response?.data);
    }
    console.log(err);
    throw err;
  }
}
export async function unblockUser(id: number) {
  try {
    await axios.post(`${URL}/admin/users/${id}/unblock`, null, {
      headers: {
        Authorization: `Bearer ${accessTokenStore.getAccessToken()}`,
      },
    });
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log(err.response?.data);
    }
    console.log(err);
    throw err;
  }
}

// 3. Обновление прав пользователя
// Method: PUT
// URL: /admin/users/{id}/rights
// Request: UserRolesRequest
// Response: User

// Интерфейс для обновления прав пользователя
// interface UserRolesRequest {
//   roles: Roles []  // при вызове этой апи роли будут обновлены к тому массиву который будет передан
// например если у вас была roles: ['ADMIN'] а вы хотите добавить ['MODERATOR'] то нужно передавать
// старые + новые - roles: ['ADMIN', 'MODERATOR']

export async function updateRightUser(id: number, roles: UserRolesRequest) {
  console.log(id, roles);
  try {
    const res = await axios.post(`${URL}/admin/users/${id}/rights`, roles, {
      headers: {
        Authorization: `Bearer ${accessTokenStore.getAccessToken()}`,
        "Content-Type": "application/json",
      },
    });
    console.log(res);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log(err.response?.data);
    }
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
