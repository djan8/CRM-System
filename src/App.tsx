import TodoListPage from "./pages/TodoListPage/TodoListPage.tsx";

import { useAppSelector } from "./hooks.ts";

import AuthLayOut from "./components/FormUserAuth/AuthLayOut.tsx";

function App() {
  const isAuth = useAppSelector((state) => state.app.isAuth);
  const isChecking = useAppSelector((state) => state.app.isChecking);

  if (isChecking) return null;
  return <>{isAuth ? <TodoListPage /> : <AuthLayOut />}</>;
}

export default App;
