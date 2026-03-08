import AutorizationForm from "./autorization/AutorizationForm.tsx";
import RegistrationForm from "./registration/RegistrationForm.tsx";
import { useAppSelector } from "../../hooks.ts";
export default function AuthLayOut() {
  const modalMode = useAppSelector((state) => state.visible.modalMode);

  return <>{modalMode ? <RegistrationForm /> : <AutorizationForm />}</>;
}
