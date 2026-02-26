import { type JSX, useEffect, useState } from "react";
import type { MetaResponse, Todo, TodoInfo } from "../../types/type.ts";
import { getTodos, STATUSES, type StatusType } from "../../api/fetch.ts";
import Status from "../../components/task-status/Status.tsx";
import TaskList from "../../components/task-list/TaskList.tsx";
import cls from "./TotoListPage.module.scss";
import AddTaskForm from "../../components/add-task-form/AddTaskForm.tsx";

export default function ToDoListPage(): JSX.Element {
  const [status, setStatus] = useState<StatusType>(STATUSES.ALL);
  const [data, setData] = useState<MetaResponse<Todo, TodoInfo> | undefined>();

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
      <Status info={data?.info} status={status} setStatus={setStatus} />
      {!data ? (
        <div>Loading...</div>
      ) : (
        <TaskList data={data} setData={setData} status={status} />
      )}
    </div>
  );
}
