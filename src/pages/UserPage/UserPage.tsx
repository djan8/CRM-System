import Title from "antd/es/typography/Title";
import { useAppDispatch, useAppSelector } from "../../hooks.ts";
import { Button, Flex, message, Spin } from "antd";
import { LoadingOutlined, LogoutOutlined } from "@ant-design/icons";
import { logoutUser } from "./userDataSlice.ts";
import { setTextResponseAuth } from "../../components/FormUserAuth/autorization/AutorizationSlice.ts";
import { setIsAuth, setModalMode } from "../../AppSlice.ts";
import { accessTokenStore } from "../../const/const.ts";

export default function UserPage() {
  const userData = useAppSelector((state) => state.user.data);
  const dispatch = useAppDispatch();

  async function handlerLogOutUser() {
    try {
      void (await logoutUser());
      localStorage.removeItem("refreshToken");
      accessTokenStore.setAccessToken(null);
      dispatch(setTextResponseAuth(""));
      dispatch(setModalMode(false));
      dispatch(setIsAuth(false));
    } catch {
      message.error("ошибка выхода из аккаунта");
    }
  }

  return (
    <>
      {!userData && (
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      )}
      {userData && (
        <>
          <Flex
            style={{
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
              <LogoutOutlined />
            </Button>
          </Flex>
        </>
      )}
    </>
  );
}
