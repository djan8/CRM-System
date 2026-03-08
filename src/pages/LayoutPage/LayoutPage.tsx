import { Link, Outlet } from "react-router";
import { Flex, Layout } from "antd";
import { useAppDispatch } from "../../hooks.ts";
import { getProfile } from "../../components/FormUserAuth/autorization/AutorizationSlice.ts";

import { useEffect } from "react";

const { Sider } = Layout;

import { setIsAuth, setIsChecking, setModalMode } from "../../AppSlice.ts";

export default function LayoutPage() {
  console.log("я на лайауте");
  console.log("сюда попало после рефреша на туду");
  // const userData = useAppSelector((state) => state.user.data);
  // const navigate = useNavigate();

  const dispatch = useAppDispatch();

  async function loadLayOut() {
    try {
      dispatch(setIsChecking(true));
      await getProfile();
      dispatch(setIsAuth(true));
    } catch (err) {
      console.log(err);
      console.log(
        "запрос гетпрофайла упал, ты в лэйаут, и тут перехорд на авторизацию, нахуя?",
      );
      if (localStorage.getItem("accessToken")) {
        dispatch(setModalMode(false));
      }
      // navigate("/auth-modal");
      // navigate("/reg-modal");
    } finally {
      dispatch(setIsChecking(false));
    }
  }
  useEffect(() => {
    loadLayOut();
    // console.log("делается?");
    // dispatch(setIsAuthTrue());
    // loadProfile();
  }, []);
  return (
    <Flex gap="middle">
      <Layout style={{ textAlign: "center", lineHeight: "30px" }}>
        <Sider width="20%" style={{ background: "#2265ba" }}>
          <Flex vertical style={{ marginTop: "10px" }}>
            <Link style={{ color: "whitesmoke" }} to={"profile"}>
              Личный кабинет
            </Link>
            <Link style={{ color: "whitesmoke" }} to={"/"}>
              Список задач
            </Link>
          </Flex>
        </Sider>
        <Outlet />
      </Layout>
    </Flex>
  );
}
