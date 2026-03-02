import { type JSX, useEffect, useState } from "react";
import type {
  MetaResponse,
  StatusType,
  Todo,
  TodoInfo,
} from "../../types/type.ts";
import { getTodos } from "../../api/fetch.ts";

import TaskList from "../../components/task-list/TaskList.tsx";
import cls from "./TotoListPage.module.scss";
import AddTaskForm from "../../components/add-task-form/AddTaskForm.tsx";
import StatusFilter from "../../components/task-status-filter/StatusFilter.tsx";
import { STATUSES } from "../../const/const.ts";

export default function ToDoListPage(): JSX.Element {
  const [status, setStatus] = useState<StatusType>(STATUSES.ALL);
  const [data, setData] = useState<MetaResponse<Todo, TodoInfo> | null>(null);

  async function loadTodos(status: StatusType) {
    try {
      const todos = await getTodos(status);
      setData(todos);
    } catch (err) {
      alert(`Ошибка вот такая: ${err}`);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadTodos(status);
  }, [status]);

  return (
    <div className={cls.app}>
      <AddTaskForm onUpdate={loadTodos} status={status} />

      {!data && <div>Loading...</div>}
      {data && data.info && (
        <>
          <StatusFilter
            info={data.info}
            status={status}
            setStatus={setStatus}
          />
          <TaskList data={data} onUpdate={loadTodos} status={status} />
        </>
      )}
    </div>
  );
}
