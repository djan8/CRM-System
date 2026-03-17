import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import type { User } from "../UsersPage/type.ts";
import { Button, Flex, Input, Typography } from "antd";
import axios from "axios";
import {
  getUserDetails,
  refreshUserDetails,
  setUserDetails,
} from "./UserDetailsSlice.ts";
import { useAppSelector, useAppDispatch } from "../../hooks.ts";
import { refreshToken } from "../../components/FormUserAuth/autorization/AutorizationSlice.ts";

export default function UserDetailsPage() {
  const userDetails = useAppSelector((state) => state.details.userDetails);

  const [details, setDetails] = useState<Partial<User>>({});
  const params = useParams();
  const dispatch = useAppDispatch();
  const idNum = Number(params.id);
  const navigate = useNavigate();
  const isChecking = useAppSelector((state) => state.visible.isChecking);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (isChecking) return;
    console.log("effect start");
    async function loadUserDetails() {
      try {
        console.log(idNum);
        const userDetails = await getUserDetails(idNum);
        console.log(userDetails);
        setDetails(userDetails);
        dispatch(setUserDetails(userDetails));
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          try {
            await refreshToken();
            const userDetails = await getUserDetails(idNum);
            console.log(userDetails);
            // setDetails(userDetails);
            dispatch(setUserDetails(userDetails));
          } catch {
            navigate("/auth-modal");
          }
        }
        // throw err;
      }
    }
    void loadUserDetails();
  }, [idNum, isChecking, navigate, dispatch]);

  async function handleSaveEditedUserValue() {
    try {
      console.log(details);
      await refreshUserDetails(idNum, details);
      const data = await getUserDetails(idNum);
      dispatch(setUserDetails(data));
      setIsEdit(false);
      console.log(details);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        try {
          await refreshToken();
          const userDetails = await getUserDetails(idNum);
          console.log(userDetails);
          // setDetails(userDetails);
          dispatch(setUserDetails(userDetails));
        } catch {
          navigate("/auth-modal");
        }
      }
    }
  }
  async function handleCancelEditedValue() {
    try {
      const userDetails = await getUserDetails(idNum);
      console.log(userDetails);
      setDetails(userDetails);
      setIsEdit(false);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        try {
          await refreshToken();
          const userDetails = await getUserDetails(idNum);
          console.log(userDetails);
          // setDetails(userDetails);
          dispatch(setUserDetails(userDetails));
        } catch {
          navigate("/auth-modal");
        }
      }
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
            <Typography.Text type={"secondary"}>Имя</Typography.Text>
            <Input
              onChange={(e) =>
                setDetails({ ...details, username: e.target.value })
              }
              value={details.username}
            />
            <Typography.Text type={"secondary"}>Емэйл</Typography.Text>
            <Input
              onChange={(e) =>
                setDetails({ ...details, email: e.target.value })
              }
              value={details.email}
            />
            <Typography.Text type={"secondary"}>Номер телефона</Typography.Text>
            <Input
              onChange={(e) =>
                setDetails({ ...details, phoneNumber: e.target.value })
              }
              value={details.phoneNumber}
            />
            <Button onClick={handleSaveEditedUserValue}>Сохранить</Button>
            <Button onClick={handleCancelEditedValue}>Отмена</Button>
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
