import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./pages/UserPage/userDataSlice.ts";
import appReducer from "./AppSlice.ts";
import todosResponseReducer from "./pages/TodoListPage/TodoListSlice.ts";
import regReducer from "./components/FormUserAuth/registration/RegistationSlice.ts";
import authReducer from "./components/FormUserAuth/autorization/AutorizationSlice.ts";

export const store = configureStore({
  reducer: {
    user: userReducer,
    app: appReducer,
    todosResponse: todosResponseReducer,
    registration: regReducer,
    authorization: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
