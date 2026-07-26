import { STATUSES } from "../shared/appConfig.ts";

export interface TodoData {
  id: number;
  title: string;
  created: string; // ISO date string
  isDone: boolean;
}
export interface TodoInfo {
  all: number;
  completed: number;
  inWork: number;
}

export interface MetaResponse<T, N> {
  data: T[];
  info?: N;
  meta: {
    totalAmount: number;
  };
}
// interface ITodoRequest {
//   title?: string;
//   isDone?: boolean; // изменение статуса задачи происходит через этот флаг
// }

export type TodoRequest = Partial<Omit<TodoData, "id" | "created">>;

export type Status = (typeof STATUSES)[keyof typeof STATUSES];
