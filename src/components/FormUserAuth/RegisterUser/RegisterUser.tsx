import {
  Button,
  Flex,
  Form,
  Input,
  Layout,
  message,
  // Modal,
  // type ModalProps,
} from "antd";
import { Image } from "antd";

const { Sider } = Layout;
import auth from "../../../assets/regImg.svg";
import { Link } from "react-router";

import Text from "antd/es/typography/Text";
import { useAppDispatch, useAppSelector } from "../../../hooks.ts";
import { setModalMode, setRegIsSuccess } from "../../../AppSlice.ts";
import { registerUser, setTextResponseReg } from "./RegisterUser.ts";
import axios from "axios";
import type { RegistrationValue } from "./RegType.ts";
import type { UserRegistrationData } from "../LoginUser/LoginUserType.ts";

export default function RegisterUser() {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const textResponseReg = useAppSelector(
    (state) => state.registration.textResponseReg,
  );
  const regIsSuccess = useAppSelector((state) => state.app.isRegSuccess);

  async function handleRegFormSubmit(value: RegistrationValue) {
    try {
      const registerData: UserRegistrationData = {
        login: value.login,
        username: value.username,
        password: value.password,
        email: value.email,
        phoneNumber: value.phone ? value.phone : "",
      };
      await form.validateFields();
      await registerUser(registerData);
      dispatch(setTextResponseReg("Успешная регистрация"));
      dispatch(setRegIsSuccess());
    } catch (err) {
      if (err instanceof Error) {
        message.error(err.message);
      }
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 409) {
          dispatch(setTextResponseReg("Пользователь существует"));
        } else if (err.response?.status === 400) {
          dispatch(
            setTextResponseReg(
              "Ошибка десериализации запроса или неверный ввод",
            ),
          );
        } else if (err.response?.status === 500) {
          dispatch(setTextResponseReg("Внутренняя ошибка сервера"));
        } else {
          dispatch(
            setTextResponseReg(
              "Что-то произошло непонятное,  повторите еще раз",
            ),
          );
        }
      }
    }
  }

  const handlerButtonAuthWay = () => {
    dispatch(setRegIsSuccess());
    dispatch(setTextResponseReg(""));
    dispatch(setModalMode(false));
  };

  return (
    <Flex gap="middle">
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
          {regIsSuccess ? (
            <>
              <Link to={"/auth-modal"}>
                {textResponseReg.length > 0 && (
                  <Text type={"success"}>{textResponseReg}</Text>
                )}
                <Button onClick={handlerButtonAuthWay}>на авторизацию</Button>
              </Link>
            </>
          ) : (
            <Form
              form={form}
              layout={"vertical"}
              onFinish={handleRegFormSubmit}
            >
              <Form.Item
                style={{ marginBottom: 0, paddingBottom: 0 }}
                name="username"
                label="Username"
                required
                rules={[
                  { required: true, message: "Введите имя..." },
                  { min: 1, message: "Минимум 2 символ" },
                  { max: 60, message: "Максимум 60 символов" },
                ]}
              >
                <Input placeholder={"Логин..."} />
              </Form.Item>
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
              <Form.Item
                style={{ marginBottom: 0, paddingBottom: 0 }}
                label="Confirm Password"
                name="password2"
                dependencies={["password"]}
                rules={[
                  {
                    required: true,
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("Пароли не совпадают"));
                    },
                  }),
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                style={{ marginBottom: 0, paddingBottom: 0 }}
                name="email"
                label="Email"
                rules={[{ required: true }, { type: "email" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                style={{ marginBottom: "3px", paddingBottom: 0 }}
                name="phone"
                label="Phone Number"
                rules={[{ message: "Введите телефон..." }]}
              >
                <Input style={{ width: "100%" }} />
              </Form.Item>
              {textResponseReg.length > 0 && (
                <Text type={"danger"}>{textResponseReg}</Text>
              )}
              <Button
                style={{ width: "100%", marginTop: "3px" }}
                color="purple"
                variant={"solid"}
                htmlType="submit"
              >
                Зарегистрироваться
              </Button>
              <Flex justify={"space-between"}>
                <Text type={"secondary"}>Есть аккаунт?</Text>
                <Link to={"/auth-modal"}>
                  <Button
                    onClick={() => dispatch(setModalMode(false))}
                    color={"purple"}
                    type={"link"}
                  >
                    Войти
                  </Button>
                </Link>
              </Flex>
            </Form>
          )}
        </Flex>
      </Layout>
    </Flex>
  );
}
