import { createSlice } from "@reduxjs/toolkit";
import type {
  MetaResponse,
  StatusType,
  Todo,
  TodoInfo,
} from "../../types/type.ts";

import { STATUSES } from "../../const/const.ts";

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
