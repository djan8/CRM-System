import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import type { User } from "../UsersPage/types.ts";
import { Button, Flex, Form, Input, message, Typography } from "antd";

import {
  getUserDetails,
  refreshUserDetails,
  setUserDetails,
} from "./userDetailsSlice.ts";
import { useAppSelector, useAppDispatch } from "../../hooks.ts";
import { setModalMode } from "../../appSlice.ts";
// import type { UserRequest } from "./type.ts";

export default function UserDetailsPage() {
  const userDetails = useAppSelector((state) => state.details.userDetails);
  const [form] = Form.useForm();
  const [details, setDetails] = useState<Partial<User>>({});
  const params = useParams();
  const dispatch = useAppDispatch();
  const idNum = Number(params.id);
  const navigate = useNavigate();
  const isChecking = useAppSelector((state) => state.app.isChecking);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  useEffect(() => {
    if (isChecking) return;
    console.log("effect start");
    async function loadUserDetails() {
      try {
        console.log(idNum);
        const userDetails = await getUserDetails(idNum);

        setDetails(userDetails);
        dispatch(setUserDetails(userDetails));
      } catch (err) {
        console.log(err);
        localStorage.removeItem("refreshToken");
        dispatch(setModalMode(false));
      }
      // throw err;
    }
    void loadUserDetails();
  }, [idNum, isChecking, navigate, dispatch]);

  function getChangedValue<T extends object>(original: T, value: Partial<T>) {
    const changed: Partial<T> = {};
    for (const key of Object.values(value) as (keyof T)[]) {
      if (original[key] !== value[key]) {
        changed[key] = value[key];
      }
    }
    return changed;
  }

  async function handleSaveEditedUserValue() {
    try {
      const values = await form.validateFields();
      // console.log(data);
      // const updatedUserValue: UserRequest = {
      //   username: details.username,
      //   email: details.email,
      //   phoneNumber: details.phoneNumber,
      // };
      // if (userDetails?.username === details.username) {
      //   delete updatedUserValue.username;
      // }
      // if (userDetails?.email === details.email) {
      //   delete updatedUserValue.email;
      // }
      // if (userDetails?.phoneNumber === details.phoneNumber) {
      //   delete updatedUserValue.phoneNumber;
      // }
      if (!userDetails) return;
      const updatedUserValue = getChangedValue(userDetails, values);
      await refreshUserDetails(idNum, updatedUserValue);
      message.info("Данные успешно обновлены");
      const data = await getUserDetails(idNum);
      dispatch(setUserDetails(data));
      setIsEdit(false);
      setDetails(data);
    } catch (err) {
      console.log(err);
      message.error("корректно заполните поля ");
    }
  }
  async function handleCancelEditedValue() {
    try {
      const userDetails = await getUserDetails(idNum);
      console.log(userDetails);
      dispatch(setUserDetails(userDetails));
      setDetails(userDetails);
      form.setFieldsValue(userDetails);
      setIsEdit(false);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Flex vertical>
        <Link to={"/users"}>
          <Button>назад к списку</Button>
        </Link>

        {isEdit ? (
          <Flex gap={1} vertical>
            <Form
              form={form}
              onFinish={handleSaveEditedUserValue}
              initialValues={{
                username: details.username,
                email: details.email,
                phoneNumber: details.phoneNumber,
              }}
            >
              <Typography.Text type={"secondary"}>Имя</Typography.Text>
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Введите новый логин" },
                  { min: 2, message: "Минимум 2 символа" },
                  { max: 64, message: "Максимум 64 символа" },
                ]}
              >
                <Input
                  type={"text"}
                  onChange={(e) =>
                    setDetails({ ...details, username: e.target.value })
                  }
                />
              </Form.Item>
              <Typography.Text type={"secondary"}>Емэйл</Typography.Text>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Введите email" },
                  { type: "email", message: "Некорректный email" },
                ]}
              >
                <Input
                  onChange={(e) =>
                    setDetails({ ...details, email: e.target.value })
                  }
                />
              </Form.Item>
              <Typography.Text type={"secondary"}>
                Номер телефона
              </Typography.Text>
              <Form.Item
                name="phoneNumber"
                rules={[
                  { required: true, message: "Введите номер телефона" },
                  {
                    pattern: /^\+7\d{10}$/,
                    message: "Формат: +7XXXXXXXXXX",
                  },
                ]}
              >
                <Input
                  onChange={(e) =>
                    setDetails({ ...details, phoneNumber: e.target.value })
                  }
                />
              </Form.Item>
              <Button onClick={handleSaveEditedUserValue}>Сохранить</Button>
              <Button onClick={handleCancelEditedValue}>Отмена</Button>
            </Form>
          </Flex>
        ) : (
          <Flex gap={1} vertical>
            <Typography.Text type={"secondary"}>Имя</Typography.Text>
            <Typography.Text>{userDetails?.username}</Typography.Text>
            <Typography.Text type={"secondary"}>Емэйл</Typography.Text>
            <Typography.Text>{userDetails?.email}</Typography.Text>
            <Typography.Text type={"secondary"}>Номер телефона</Typography.Text>
            <Typography.Text>{userDetails?.phoneNumber}</Typography.Text>
            <Button onClick={() => setIsEdit(true)}>Редактировать</Button>
          </Flex>
        )}
      </Flex>
    </>
  );
}
