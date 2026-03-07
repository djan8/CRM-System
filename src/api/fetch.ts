import type {
  MetaResponse,
  StatusType,
  Todo,
  TodoInfo,
  TodoRequest,
} from "../types/type.ts";
import axios from "axios";
import { URL } from "../const/const.ts";
import { STATUSES } from "../const/const.ts";
import { message } from "antd";

export async function getTodos(
  status: StatusType = STATUSES.ALL,
): Promise<MetaResponse<Todo, TodoInfo>> {
  try {
    const res = await axios.get<MetaResponse<Todo, TodoInfo>>(URL, {
      params: { filter: status },
    });
    return res.data;
  } catch (err) {
    if (err instanceof Error) {
      message.error(err.message);
      console.error(err);
    }
    throw err;
  }
}

export async function addTask(title: { title: string }): Promise<Todo> {
  console.log(title);
  try {
    const res = await axios.post(URL, title);
    return res.data;
  } catch (err) {
    if (err instanceof Error) {
      message.error(`Не удалось добавить задачу ${err.name}-${err.message}`);
      message.error(`Вы написали: ${title}`);
    }
    throw err;
  }
}

export async function deleteTask(id: number): Promise<void> {
  try {
    await axios.delete(`${URL}/${id}`);
  } catch (err) {
    if (err instanceof Error) {
      message.error(err.message);
    }
    throw err;
  }
}

export async function editTask(id: number, data: TodoRequest): Promise<void> {
  try {
    await axios.put(`${URL}/${id}`, data);
  } catch (err) {
    if (err instanceof Error) {
      message.error(err.message);
    }
    throw err;
  }
}
