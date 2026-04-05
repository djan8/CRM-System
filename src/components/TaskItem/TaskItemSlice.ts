import type { TodoRequest } from "../../types/TodoType.ts";
import { api } from "../../api/api.ts";

export async function deleteTask(id: number): Promise<void> {
  await api.delete(`/todos/${id}`);
}

export async function editTask(id: number, data: TodoRequest): Promise<void> {
  await api.put(`/todos/${id}`, data);
}
