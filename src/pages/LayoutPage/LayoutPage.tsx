import { Link, Outlet } from "react-router";
import { Flex, Layout } from "antd";

import { useAppDispatch } from "../../hooks.ts";
import { useEffect } from "react";
import { setIsAuth, setIsChecking } from "../../AppSlice.ts";
import {
  getProfile,
  refreshToken,
} from "../../components/FormUserAuth/autorization/AutorizationSlice.ts";
import { accessTokenClosure } from "../../const/const.ts";
import { setUserProfileData } from "../UserPage/userDataSlice.ts";

const { Sider } = Layout;

export default function LayoutPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function initAuth() {
      try {
        dispatch(setIsChecking(true));
        const refresh = localStorage.getItem("refreshToken");

        if (!refresh) {
          dispatch(setIsChecking(false));
          return;
        }

        const newToken = await refreshToken();
        accessTokenClosure.setAccessToken(newToken);
        const userData = await getProfile(newToken);
        console.log(userData);
        dispatch(setUserProfileData(userData));

        dispatch(setIsAuth(true));
      } catch {
        localStorage.removeItem("refreshToken");
      } finally {
        dispatch(setIsChecking(false));
      }
    }

    initAuth();
  }, [dispatch]);
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
