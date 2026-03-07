import { createBrowserRouter } from "react-router";
import LayoutPage from "./pages/layout-page/LayoutPage.tsx";
import ToDoListPage from "./pages/todoist-page/ToDoListPage.tsx";
import UserPage from "./pages/user-page/UserPage.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPage />,
    children: [
      { index: true, element: <ToDoListPage /> },
      { path: "profile", element: <UserPage /> },
    ],
  },
]);
