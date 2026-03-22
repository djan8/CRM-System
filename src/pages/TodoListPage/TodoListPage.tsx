import { type JSX, useCallback, useEffect } from "react";

import TaskList from "../../components/TodoList/TodoList.tsx";
import AddTaskForm from "../../components/AddTaskForm/AddTaskForm.tsx";
import StatusFilter from "../../components/StatusFilter/StatusFilter.tsx";
import { Flex, message, Spin } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks.ts";
import { getTodos, setTodosResponse } from "./TodoListSlice.ts";

export default function TodoListPage(): JSX.Element {
  const { todosResponse, filterStatus } = useAppSelector(
    (state) => state.todosResponse,
  );
  const dispatch = useAppDispatch();

  const loadTodos = useCallback(async () => {
    try {
      const todos = await getTodos(filterStatus);
      dispatch(setTodosResponse(todos));
    } catch {
      message.error("Ошибка загрузки данных");
    }
  }, [filterStatus, dispatch]);

  useEffect(() => {
    void loadTodos();

    const intervalId = setInterval(loadTodos, 5000);
    return () => clearInterval(intervalId);
  }, [filterStatus, loadTodos]);

  return (
    <>
      <Flex vertical flex={1} style={{ width: "100%" }}>
        <Flex
          vertical
          gap={"small"}
          style={{ maxWidth: "40rem", width: "100%", padding: "1rem 1rem" }}
        >
          <AddTaskForm onUpdate={loadTodos} />
          <StatusFilter />
          {!todosResponse ? <Spin /> : <TaskList onUpdate={loadTodos} />}
        </Flex>
      </Flex>
    </>
  );
}
