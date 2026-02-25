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

  useEffect(() => {
    async function loadTodos() {
      try {
        const todos = await getTodos(status);
        setData(todos);
      } catch (err) {
        console.error(err);
      }
    }
    loadTodos();
  }, [status]);

  if (!data) return <div>Loading...</div>;

  // const statusProps = { info: data.info, status, setStatus, setData };
  const taskListProps = { data, setData, status };

  return (
    <div className={cls.app}>
      <AddTaskForm setData={setData} status={status} />
      <Status info={data.info} status={status} setStatus={setStatus} />
      <TaskList {...taskListProps} />
    </div>
  );
}
