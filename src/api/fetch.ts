import * as React from "react";
import type {
  MetaResponse,
  Todo,
  TodoInfo,
  TodoRequest,
} from "../types/type.ts";

// type Statuses = {
//   ALL: string;
//   INWORK: string;
//   COMPLETED: string;
// };

export const STATUSES = {
  ALL: "all",
  INWORK: "inWork",
  COMPLETED: "completed",
} as const;

export type StatusType = (typeof STATUSES)[keyof typeof STATUSES];

const URL: string = "https://easydev.club/api/v1/todos";

export async function getTodos(
  status: StatusType = STATUSES.ALL,
): Promise<MetaResponse<Todo, TodoInfo>> {
  try {
    const res = await fetch(`${URL}?filter=${status}`);
    if (!res.ok) {
      throw new Error(`Ooops, status ${res.status}`);
    }
    return res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export type SetData = React.Dispatch<
  React.SetStateAction<MetaResponse<Todo, TodoInfo> | undefined>
>;

export async function addTask(task: string): Promise<void> {
  try {
    const res = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: task,
      }),
    });
    if (!res.ok) {
      throw new Error(`Ooops, status ${res.status}`);
    }
    console.log(res);
    const data = await res.json();
    console.log(data);
  } catch (err) {
    // throw err;
    if (err instanceof Error) {
      alert(`${err.name}-${err.message}`);
      alert(`Вы написали: ${task}`);
    }
  }
}

export async function deleteTask(
  id: number,
  setData: SetData,
  status: StatusType,
): Promise<void> {
  try {
    const res = await fetch(`${URL}/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error(`Ooops, delete fail ${res.status}`);
    }
    // const data = await res.json();
    // console.log(data);
    const refresh = await getTodos(status);
    setData(refresh);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function editTask(
  id: number,
  data: TodoRequest,
  setData: SetData,
  status: StatusType,
): Promise<void> {
  try {
    const res = await fetch(`${URL}/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error(`Ooops, edit task fail ${res.status}`);
    }
    const refresh = await getTodos(status);
    setData(refresh);
  } catch (err) {
    console.error(err);
    throw err;
  }
}
