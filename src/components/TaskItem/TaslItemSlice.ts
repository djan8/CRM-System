import type { TodoRequest } from "../../types/TodoType.ts";
import { api } from "../../api/api.ts";

export async function deleteTask(id: number): Promise<void> {
  try {
    await api.delete(`/todos/${id}`);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function editTask(id: number, data: TodoRequest): Promise<void> {
  try {
    await api.put(`/todos/${id}`, data);
  } catch (err) {
    console.log(err);
    throw err;
  }
}
