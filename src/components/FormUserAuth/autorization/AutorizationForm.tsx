import {
  Button,
  Checkbox,
  Flex,
  Form,
  Input,
  Layout,
  Modal,
  type ModalProps,
} from "antd";
import { Image } from "antd";
const { Sider } = Layout;
import auth from "../../../assets/regImg.svg";
import { Link, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../hooks.ts";
import { setUserProfileData } from "../../../pages/UserPage/userDataSlice.ts";
import { setIsAuth, setModalMode } from "../../../AppSlice.ts";
import {
  authenticationUser,
  getProfile,
  setTextResponseAuth,
  // setTokenToLocalStorage,
} from "./AutorizationSlice.ts";
import axios from "axios";
import Text from "antd/es/typography/Text";
import { accessTokenClosure } from "../../../const/const.ts";

const styles: ModalProps["styles"] = {
  body: { padding: "1px" },
  container: { padding: 0, width: "100%", height: "100%" },
  mask: {
    backgroundImage: `linear-gradient(to top, #18181b 0, rgba(21, 21, 22, 0.2) 100%)`,
  },
};

export default function AutorizationForm() {
  const [form] = Form.useForm();
  const textResponseAuth = useAppSelector(
    (state) => state.authorization.textResponseAuth,
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  async function handleOnSubmit() {
    try {
      await form.validateFields();
      const data = form.getFieldsValue();
      const { accessToken, refreshToken } = await authenticationUser(data);
      dispatch(setTextResponseAuth("Успешная аутентификация."));
      accessTokenClosure.setAccessToken(accessToken);
      const accessValidToken = accessTokenClosure.getAccessToken();
      localStorage.setItem("refreshToken", refreshToken);
      // localStorage.setItem("accessToken", accessToken);
      const userData = await getProfile(accessValidToken);
      dispatch(setIsAuth(true));
      dispatch(setUserProfileData(userData));
      navigate("/");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          dispatch(setTextResponseAuth("Неверные учетные данные"));
        } else if (err.response?.status === 400) {
          dispatch(
            setTextResponseAuth(
              "Ошибка десериализации запроса или неверный ввод",
            ),
          );
        } else if (err.response?.status === 500) {
          dispatch(setTextResponseAuth("Внутренняя ошибка сервера"));
        } else {
          dispatch(
            setTextResponseAuth(
              "Что-то произошло непонятное, повторите еще раз",
            ),
          );
        }
      }
      dispatch(setModalMode(false));
    }
  }

  return (
    <Flex gap="middle">
      <Modal
        centered
        footer={null}
        styles={styles}
        mask={{ enabled: true, blur: true }}
        open={true}
        closable={false}
      >
        <Layout
          style={{
            minHeight: "50vh",
            background: "inherit",
            borderRadius: "30px",
            padding: "3px",
          }}
        >
          <Sider
            width="50%"
            style={{ background: "#FFE6C9", borderRadius: " 10px 0  0 10px" }}
          >
            <Flex justify={"center"}>
              <Image alt="auth" src={auth} />
            </Flex>
          </Sider>
          <Flex style={{ width: "60%" }} justify={"center"} align="center">
            <Form form={form} layout={"vertical"} onFinish={handleOnSubmit}>
              {textResponseAuth.length > 0 && (
                <Text type={"warning"}>{textResponseAuth}</Text>
              )}
              <Form.Item
                style={{ marginBottom: 0, paddingBottom: 0 }}
                name="login"
                label="Login"
                rules={[
                  { required: true, message: "Введите логин..." },
                  { min: 2, message: "Минимум 2 символ" },
                  { max: 60, message: "Максимум 60 символов" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                style={{ marginBottom: 0, paddingBottom: 0 }}
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Введите пароль..." },
                  { min: 6, message: "Минимум 6 символов" },
                  { max: 60, message: "Максимум 60 символов" },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Flex justify={"space-between"}>
                <Checkbox />
                <Button color={"purple"} type={"link"}>
                  Забыли пароль?
                </Button>
              </Flex>

              <Button
                style={{ width: "100%", marginTop: "5px" }}
                color="purple"
                variant={"solid"}
                htmlType="submit"
              >
                Войти
              </Button>
              <Flex justify={"space-between"}>
                <Text type={"secondary"}>Нет аккаунта?</Text>
                <Link to={"/reg-modal"}>
                  <Button color={"purple"} type={"link"}>
                    создать
                  </Button>
                </Link>
              </Flex>
            </Form>
          </Flex>
        </Layout>
      </Modal>
    </Flex>
  );
}
