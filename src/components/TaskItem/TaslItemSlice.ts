import { createSlice } from "@reduxjs/toolkit";

export interface Props {
  isEditText: boolean;
}

const initialState: Props = {
  isEditText: false,
};

export const TaskItemsSlice = createSlice({
  name: "taskItems",
  initialState,
  reducers: {
    setIsEditText: (state) => {
      state.isEditText = !state.isEditText;
    },
  },
});

export const { setIsEditText } = TaskItemsSlice.actions;

export default TaskItemsSlice.reducer;
