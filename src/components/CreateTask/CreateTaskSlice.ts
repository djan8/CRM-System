import type { TodoData } from "../../types/TodoType.ts";
import { api } from "../../api/api.ts";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// export async function addTask(title: { title: string }): Promise<TodoData> {
//   const res = await api.post("/todos", title);
//   return res.data;
// }

export const createTask = createAsyncThunk<TodoData, { title: string }>(
  "tasks/createTask",
  async (title) => {
    const res = await api.post("/todos", title);
    return res.data;
  },
);
type TasksState = {
  items: TodoData[];
  loading: boolean;
  error: string | null;
};
const initialState: TasksState = {
  items: [],
  loading: false,
  error: null,
};

const createTaskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error";
      });
  },
});

export default createTaskSlice.reducer;
