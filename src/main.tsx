import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router";

import ToDoListPage from "./pages/ToDoListPage/ToDoListPage.tsx";
import LayoutPage from "./pages/LayoutPage/LayoutPage.tsx";
import UserPage from "./pages/UserPage/UserPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPage />,
    children: [
      { index: true, element: <ToDoListPage /> },
      { path: "profile", element: <UserPage /> },
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />,
);
