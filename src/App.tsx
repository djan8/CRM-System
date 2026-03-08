import TodoListPage from "./pages/TodoListPage/TodoListPage.tsx";

import { useAppSelector } from "./hooks.ts";

import AuthLayOut from "./components/FormUserAuth/AuthLayOut.tsx";

function App() {
  const isAuth = useAppSelector((state) => state.visible.isAuth);
  const isChecking = useAppSelector((state) => state.visible.isChecking);
  if (isChecking) return null;
  return <>{isAuth ? <TodoListPage /> : <AuthLayOut />}</>;
}

export default App;
