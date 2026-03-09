// import Text from "antd/es/typography/Text";
import Title from "antd/es/typography/Title";
import { useAppDispatch, useAppSelector } from "../../hooks.ts";
import { Button, Flex, message, Spin } from "antd";
import { LoadingOutlined, LoginOutlined } from "@ant-design/icons";
import { useCallback, useEffect } from "react";
import {
  getProfile,
  refreshToken,
  setTextResponseAuth,
} from "../../components/FormUserAuth/autorization/AutorizationSlice.ts";
import { logoutUser, setUserProfileData } from "./userDataSlice.ts";
import { setIsAuth, setIsChecking } from "../../AppSlice.ts";
import { useNavigate } from "react-router";
import { accessTokenClosure } from "../../const/const.ts";

export default function UserPage() {
  const userData = useAppSelector((state) => state.user.data);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const loadProfile = useCallback(async () => {
    try {
      let token = accessTokenClosure.getAccessToken();
      if (!token) {
        console.log("запустилась");
        token = await refreshToken();
      }

      dispatch(setIsChecking(true));
      const userData = await getProfile(token);
      dispatch(setUserProfileData(userData));
      dispatch(setIsAuth(true));
    } catch (err) {
      if (err instanceof Error) {
        message.error(err.message);
      }
      navigate("/auth-modal");
    } finally {
      dispatch(setIsChecking(false));
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    void loadProfile();
  }, [loadProfile]);

  const handlerLogOutUser = () => {
    logoutUser();
    dispatch(setTextResponseAuth(""));
    navigate("/auth-modal");
    dispatch(setIsAuth(false));
  };

  return (
    <>
      {!userData && (
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      )}
      {userData && (
        <>
          <Flex
            style={{
              background: "#D3D3D3",
              borderRadius: "5px",
              margin: "1px",
            }}
            vertical
          >
            <Title style={{ marginTop: "5px" }} type={"secondary"} level={4}>
              Ваше имя:
            </Title>
            <Title style={{ marginTop: "5px" }} level={3}>
              {userData.username}
            </Title>
            <Title style={{ marginTop: "5px" }} type={"secondary"} level={4}>
              Ваша почта:
            </Title>
            <Title style={{ marginTop: "5px" }} level={3}>
              {userData.email}
            </Title>

            {userData.phoneNumber.length > 0 ? (
              <Title
                style={{ marginTop: "5px" }}
                level={3}
              >{`Ваш телефон:${userData.phoneNumber}`}</Title>
            ) : (
              <Title style={{ marginTop: "5px" }} level={4}>
                Телефон не указан
              </Title>
            )}
            <Button
              size={"middle"}
              variant={"solid"}
              color={"blue"}
              onClick={handlerLogOutUser}
            >
              <LoginOutlined />
            </Button>
          </Flex>
        </>
      )}
    </>
  );
}
