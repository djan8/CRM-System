import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./pages/UserPage/UserDataSlice.ts";
import appReducer from "../src/AppSlice.ts";
import todosResponseReducer from "./pages/TodoListPage/TodoListSlice.ts";
import regReducer from "./components/FormUserAuth/RegisterUser/RegisterUser.ts";
import authReducer from "./components/FormUserAuth/LoginUser/LoginUserSlice.ts";
import usersReducer from "./pages/UsersPage/UsersPageSlice.ts";
import userDetailsReducer from "./pages/UserDetailsPage/UserDetailsSlice.ts";
import createTaskReducer from "./components/CreateTask/CreateTaskSlice.ts";

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
