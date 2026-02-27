import type {
  MetaResponse,
  Todo,
  TodoInfo,
  TodoRequest,
} from "../types/type.ts";

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

export async function addTask(title: string): Promise<Todo> {
  try {
    const res = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title,
      }),
    });
    if (!res.ok) {
      throw new Error(`Ooops, status ${res.status}`);
    }

    return res.json();
  } catch (err) {
    if (err instanceof Error) {
      alert(`${err.name}-${err.message}`);
      alert(`Вы написали: ${title}`);
    }
    throw err;
  }
}

export async function deleteTask(id: number): Promise<void> {
  try {
    const res = await fetch(`${URL}/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error(`Ooops, delete fail ${res.status}`);
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function editTask(id: number, data: TodoRequest): Promise<void> {
  try {
    const res = await fetch(`${URL}/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error(`Ooops, edit task fail ${res.status}`);
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}
