import { createBrowserRouter } from "react-router";

import App from "./App.tsx";
import UserPage from "./pages/UserPage/UserPage.tsx";
import RegistrationForm from "./components/AuthLayOut/RegisterUser/RegisterUser.tsx";
import AutorizationForm from "./components/AuthLayOut/LoginUser/LoginUser.tsx";
import LayoutPage from "./pages/LayoutPage/LayoutPage.tsx";
import UsersPage from "./pages/UsersPage/UsersPage.tsx";
import UserDetailsPage from "./pages/UserDetailsPage/UserDetailsPage.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPage />,
    children: [
      { index: true, element: <App /> },
      { path: "profile", element: <UserPage /> },
      { path: "reg-modal", element: <RegistrationForm /> },
      { path: "auth-modal", element: <AutorizationForm /> },
      { path: "users", element: <UsersPage /> },
      { path: "details/:id", element: <UserDetailsPage /> },
    ],
  },
]);
