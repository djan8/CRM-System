import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./pages/UserPage/UserDataSlice.ts";
import appReducer from "../src/AppSlice.ts";
import todosResponseReducer from "./pages/TodoListPage/TodoListSlice.ts";
import regReducer from "./components/FormUserAuth/registration/RegistationSlice.ts";
import authReducer from "./components/FormUserAuth/autorization/AutorizationSlice.ts";
import usersReducer from "./pages/UsersPage/UsersPageSlice.ts";
import userDetailsReducer from "./pages/UserDetailsPage/UserDetailsSlice.ts";

export const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
    details: userDetailsReducer,
    app: appReducer,
    todosResponse: todosResponseReducer,
    registration: regReducer,
    authorization: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
