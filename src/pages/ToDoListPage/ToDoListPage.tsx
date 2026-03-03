import { type JSX, useEffect, useState } from "react";
import type {
  MetaResponse,
  StatusType,
  Todo,
  TodoInfo,
} from "../../types/type.ts";
import { getTodos } from "../../api/fetch.ts";
import TaskList from "../../components/task-list/TaskList.tsx";
import AddTaskForm from "../../components/add-task-form/AddTaskForm.tsx";
import StatusFilter from "../../components/task-status-filter/StatusFilter.tsx";
import { Flex, Spin } from "antd";
import { STATUSES } from "../../const/const.ts";

export default function ToDoListPage(): JSX.Element {
  const [status, setStatus] = useState<StatusType>(STATUSES.ALL);
  const [data, setData] = useState<MetaResponse<Todo, TodoInfo> | undefined>();

  async function loadTodos() {
    try {
      const todos = await getTodos(status);
      setData(todos);
      console.log("данные обновились");
    } catch (err) {
      alert(`Ошибка вот такая: ${err}`);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadTodos();
    const intervalId = setInterval(loadTodos, 5000);
    return () => clearInterval(intervalId);
  }, [status]);

  return (
    <Flex vertical flex={1} style={{ width: "100%" }}>
      <Flex
        vertical
        gap={"small"}
        style={{ maxWidth: "40rem", width: "100%", padding: "1rem 1rem" }}
      >
        <AddTaskForm onUpdate={loadTodos} />
        <StatusFilter info={data?.info} status={status} setStatus={setStatus} />
        {!data ? (
          <Spin />
        ) : (
          <TaskList
            data={data}
            setData={setData}
            onUpdate={loadTodos}
            status={status}
          />
        )}
      </Flex>
    </Flex>
  );
}
