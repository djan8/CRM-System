import axios from "axios";
import type { Todo } from "../../types/type.ts";
import { message } from "antd";
import { URL } from "../../const/const.ts";

export async function addTask(title: { title: string }): Promise<Todo> {
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
