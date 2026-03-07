import { type JSX, useCallback, useEffect, useState } from "react";
import type {
  MetaResponse,
  StatusType,
  Todo,
  TodoInfo,
} from "../../types/type.ts";
import { getTodos } from "../../api/fetch.ts";
import TaskList from "../../components/TaskList/TaskList.tsx";
import AddTaskForm from "../../components/AddTaskForm/AddTaskForm.tsx";
import StatusFilter from "../../components/StatusFilter/StatusFilter.tsx";
import { Flex, message, Spin } from "antd";
import { STATUSES } from "../../const/const.ts";

export default function TodoListPage(): JSX.Element {
  const [status, setStatus] = useState<StatusType>(STATUSES.ALL);
  const [todosResponse, setTodosResponse] = useState<
    MetaResponse<Todo, TodoInfo> | undefined
  >();

  const loadTodos = useCallback(async () => {
    try {
      const todos = await getTodos(status);
      setTodosResponse(todos);
    } catch {
      message.error("Ошибка загрузки данных");
    }
  }, [status]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadTodos();
    const intervalId = setInterval(loadTodos, 5000);
    return () => clearInterval(intervalId);
  }, [status, loadTodos]);

  return (
    <Flex vertical flex={1} style={{ width: "100%" }}>
      <Flex
        vertical
        gap={"small"}
        style={{ maxWidth: "40rem", width: "100%", padding: "1rem 1rem" }}
      >
        <AddTaskForm onUpdate={loadTodos} />
        <StatusFilter
          info={todosResponse?.info}
          status={status}
          setStatus={setStatus}
        />
        {!todosResponse ? (
          <Spin />
        ) : (
          <TaskList
            data={todosResponse}
            setData={setTodosResponse}
            onUpdate={loadTodos}
            status={status}
          />
        )}
      </Flex>
    </Flex>
  );
}
