import axios from "axios";
import { URL } from "../../const/const.ts";
import { message } from "antd";
import type { TodoRequest } from "../../types/type.ts";

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
