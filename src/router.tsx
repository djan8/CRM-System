import { createBrowserRouter } from "react-router";
import LayoutPage from "./pages/LayoutPage/LayoutPage.tsx";
import TodoListPage from "./pages/TodoListPage/TodoListPage.tsx";
import UserPage from "./pages/UserPage/UserPage.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPage />,
    children: [
      { index: true, element: <TodoListPage /> },
      { path: "profile", element: <UserPage /> },
    ],
  },
]);
