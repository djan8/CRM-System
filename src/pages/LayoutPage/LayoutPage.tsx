import { Link, Outlet, useNavigate } from "react-router";
import { Flex, Layout } from "antd";

import { useAppDispatch, useAppSelector } from "../../hooks.ts";
import { useEffect } from "react";
import { setIsAuth, setIsChecking, setModalMode } from "../../AppSlice.ts";
import {
  getProfile,
  refreshToken,
} from "../../components/FormUserAuth/autorization/AutorizationSlice.ts";
// import { accessTokenClosure } from "../../shared/shared.ts";
import { setUserProfileData } from "../UserPage/UserDataSlice.ts";
import AuthLayOut from "../../components/FormUserAuth/AuthLayOut.tsx";

const { Sider } = Layout;

export default function LayoutPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuth = useAppSelector((state) => state.app.isAuth);

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
        dispatch(setModalMode(false));
      } finally {
        dispatch(setIsChecking(false));
      }
    }

    void initAuth();
  }, [dispatch, navigate]);
  return (
    <>
      {isAuth ? (
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
      ) : (
        <AuthLayOut />
      )}
    </>
  );
}
