import * as React from "react";
import type {
  MetaResponse,
  Todo,
  TodoInfo,
  TodoRequest,
} from "../types/type.ts";
import { checkValidate } from "../helpers/validation.ts";

export const STATUSES = {
  ALL: "all",
  INWORK: "inWork",
  COMPLETED: "completed",
};

const url = "https://easydev.club/api/v1/todos";

export async function getTodos(
  status = STATUSES.ALL,
): Promise<MetaResponse<Todo, TodoInfo>> {
  try {
    const res = await fetch(`${url}?filter=${status}`);
    if (!res.ok) {
      throw new Error(`Ooops, status ${res.status}`);
    }
    // const data = await res.json();
    // // setData(data);
    return res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export type SetData = React.Dispatch<
  React.SetStateAction<MetaResponse<Todo, TodoInfo> | undefined>
>;

export async function addTask(task: string, setData: SetData, status: string) {
  const validate = checkValidate(task);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: validate,
      }),
    });
    if (!res.ok) {
      throw new Error(`Ooops, status ${res.status}`);
    }
    console.log(res);
    const data = await res.json();
    console.log(data);
    const refresh = await getTodos(status);
    setData(refresh);
  } catch (err) {
    console.error(err);
  }
}

export async function deleteTask(id: number, setData: SetData, status: string) {
  try {
    const res = await fetch(`${url}/${id}`, {
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

export async function changeStatus(
  id: number,
  isDone: TodoRequest,
  setData: SetData,
  status: string,
) {
  try {
    const res = await fetch(`${url}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(isDone),
    });
    if (!res.ok) {
      throw new Error(`Ooops, change status fail ${res.status}`);
    }
    const refresh = await getTodos(status);
    setData(refresh);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function editTask(
  id: number,
  title: string,
  setData: SetData,
  status: string,
) {
  // const validateTitle = checkValidate(title);
  try {
    const res = await fetch(`${url}/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title }),
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
