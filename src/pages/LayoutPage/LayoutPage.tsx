import { Link, Outlet, useNavigate } from "react-router";
import { Flex, Layout } from "antd";
import { useAppDispatch } from "../../hooks.ts";
import {
  getProfile,
  refreshToken,
} from "../../components/FormUserAuth/autorization/AutorizationSlice.ts";
import { useCallback, useEffect } from "react";
const { Sider } = Layout;
import { setIsAuth, setIsChecking } from "../../AppSlice.ts";
import { accessTokenClosure } from "../../const/const.ts";

export default function LayoutPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loadLayout = useCallback(async () => {
    try {
      const test = accessTokenClosure.getAccessToken();
      console.log(test);
      if (!accessTokenClosure.getAccessToken()) {
        await refreshToken();
      }

      dispatch(setIsChecking(true));
      await getProfile(accessTokenClosure.getAccessToken());
      dispatch(setIsAuth(true));
    } catch (err) {
      if (err instanceof Error) {
        // message.error(err.message);
      }
      // if (localStorage.getItem("accessToken")) {
      //   dispatch(setModalMode(false));
      // }
      navigate("/auth-modal");
      // navigate("/reg-modal");
    } finally {
      dispatch(setIsChecking(false));
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    void loadLayout();
  }, [loadLayout]);
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
