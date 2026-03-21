import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  MetaResponse,
  Status,
  TodoData,
  TodoInfo,
} from "../../types/TodoType.ts";

import { STATUSES } from "../../const/const.ts";

import { api } from "../../api/api.ts";

export async function getTodos(
  status: Status = STATUSES.ALL,
): Promise<MetaResponse<TodoData, TodoInfo>> {
  try {
    const res = await api.get<MetaResponse<TodoData, TodoInfo>>("/todos", {
      params: { filter: status },
    });
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export interface Props {
  todosResponse: MetaResponse<TodoData, TodoInfo> | undefined | null;
  filterStatus: Status;
}

const initialState: Props = {
  todosResponse: null,
  filterStatus: STATUSES.ALL,
};

export const DataToDoSlice = createSlice({
  name: "toDoData",
  initialState,
  reducers: {
    setTodosResponse: (
      state,
      action: PayloadAction<MetaResponse<TodoData, TodoInfo> | null>,
    ) => {
      state.todosResponse = action.payload;
    },
    setFilterStatus: (state, action: PayloadAction<Status>) => {
      state.filterStatus = action.payload;
    },
  },
});

export const { setTodosResponse, setFilterStatus } = DataToDoSlice.actions;

export default DataToDoSlice.reducer;
