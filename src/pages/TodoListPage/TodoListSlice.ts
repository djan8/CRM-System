import { createSlice } from "@reduxjs/toolkit";
import type {
  MetaResponse,
  StatusType,
  Todo,
  TodoInfo,
} from "../../types/type.ts";

import { STATUSES } from "../../const/const.ts";
import axios from "axios";
import { message } from "antd";
import { URL } from "../../const/const.ts";

export async function getTodos(
  status: StatusType = STATUSES.ALL,
): Promise<MetaResponse<Todo, TodoInfo>> {
  try {
    const res = await axios.get<MetaResponse<Todo, TodoInfo>>(URL, {
      params: { filter: status },
    });
    return res.data;
  } catch (err) {
    if (err instanceof Error) {
      message.error(err.message);
    }
    throw err;
  }
}

export interface Props {
  todosResponse: MetaResponse<Todo, TodoInfo> | undefined | null;
  filerStatus: StatusType;
}

const initialState: Props = {
  todosResponse: null,
  filerStatus: STATUSES.ALL,
};

export const DataToDoSlice = createSlice({
  name: "toDoData",
  initialState,
  reducers: {
    setTodosResponse: (state, action) => {
      state.todosResponse = action.payload;
    },
    setFilterStatus: (state, action) => {
      state.filerStatus = action.payload;
    },
  },
});

export const { setTodosResponse, setFilterStatus } = DataToDoSlice.actions;

export default DataToDoSlice.reducer;
