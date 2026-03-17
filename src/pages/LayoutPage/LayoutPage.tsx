import { Link, Outlet, useNavigate } from "react-router";
import { ConfigProvider, Flex, Layout, Spin, Switch, theme } from "antd";

import { useAppDispatch, useAppSelector } from "../../hooks.ts";
import { useEffect } from "react";
import { setDark, setIsAuth, setIsChecking } from "../../AppSlice.ts";
import {
  getProfile,
  refreshToken,
} from "../../components/FormUserAuth/autorization/AutorizationSlice.ts";

import { setUserProfileData } from "../UserPage/userDataSlice.ts";
import AuthLayOut from "../../components/FormUserAuth/AuthLayOut.tsx";

const { Sider } = Layout;

export default function LayoutPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const dark = useAppSelector((state) => state.visible.dark);
  const isAuth = useAppSelector((state) => state.visible.isAuth);
  const userData = useAppSelector((state) => state.user.data);
  const isChecking = useAppSelector((state) => state.visible.isChecking);

  useEffect(() => {
    async function initAuth() {
      try {
        dispatch(setIsChecking(true));
        const refresh = localStorage.getItem("refreshToken");

        if (!refresh) {
          dispatch(setIsChecking(false));
          return;
        }

        await refreshToken();
        const userData = await getProfile();

        dispatch(setUserProfileData(userData));
        dispatch(setIsAuth(true));
      } catch {
        localStorage.removeItem("refreshToken");
        navigate("/auth-modal");
      } finally {
        dispatch(setIsChecking(false));
      }
    }

    void initAuth();
  }, [dispatch, navigate]);
  if (isChecking) return <Spin />;
  return (
    <>
      {isAuth ? (
        <ConfigProvider
          theme={{
            algorithm: dark ? theme.darkAlgorithm : theme.defaultAlgorithm,
          }}
        >
          <Flex gap="middle">
            <Layout style={{ textAlign: "center", lineHeight: "30px" }}>
              <Sider width="20%" style={{ background: "#2265ba" }}>
                <Switch
                  checked={dark}
                  onChange={() => dispatch(setDark())}
                  checkedChildren="🌙"
                  unCheckedChildren="☀️"
                />
                <Flex vertical style={{ marginTop: "10px" }}>
                  <Link style={{ color: "whitesmoke" }} to={"profile"}>
                    Личный кабинет
                  </Link>
                  <Link style={{ color: "whitesmoke" }} to={"/"}>
                    Список задач
                  </Link>
                  {userData?.roles.map(
                    (role) =>
                      role === "MODERATOR" ||
                      (role === "ADMIN" && (
                        <Link
                          key={role}
                          style={{ color: "whitesmoke" }}
                          to={"users"}
                        >
                          Пользователи
                        </Link>
                      )),
                  )}
                </Flex>
              </Sider>
              <Outlet />
            </Layout>
          </Flex>
        </ConfigProvider>
      ) : (
        <AuthLayOut />
      )}
    </>
  );
}
