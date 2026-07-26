import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./pages/UserPage/UserDataSlice.ts";
import appReducer from "./appSlice.ts";
import todosResponseReducer from "./pages/TodoListPage/todoListSlice.ts";
import regReducer from "./components/AuthLayOut/RegisterUser/RegisterUser.ts";
import authReducer from "./components/AuthLayOut/LoginUser/LoginUserSlice.ts";
import usersReducer from "./pages/UsersPage/usersPageSlice.ts";
import userDetailsReducer from "./pages/UserDetailsPage/userDetailsSlice.ts";
import createTaskReducer from "./components/CreateTask/createTaskSlice.ts";

export const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
    details: userDetailsReducer,
    app: appReducer,
    todosResponse: todosResponseReducer,
    registration: regReducer,
    authorization: authReducer,
    createTask: createTaskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
