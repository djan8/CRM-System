import AutorizationForm from "./LoginUser/LoginUser.tsx";
import RegistrationForm from "./RegisterUser/RegisterUser.tsx";
import { useAppSelector } from "../../hooks.ts";

export default function AuthLayout() {
  const modalMode = useAppSelector((state) => state.app.isModalMode);

  return <>{modalMode ? <RegistrationForm /> : <AutorizationForm />}</>;
}
