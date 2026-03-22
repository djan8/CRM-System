import type { TodoData } from "../../types/TodoType.ts";
import { api } from "../../api/api.ts";

export async function addTask(title: { title: string }): Promise<TodoData> {
  const res = await api.post("/todos", title);
  return res.data;
}
