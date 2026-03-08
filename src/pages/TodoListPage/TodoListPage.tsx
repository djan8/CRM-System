import { type JSX, useCallback, useEffect } from "react";

import { getTodos } from "../../api/fetch.ts";

import TaskList from "../../components/TaskList/TaskList.tsx";
import AddTaskForm from "../../components/AddTaskForm/AddTaskForm.tsx";
import StatusFilter from "../../components/StatusFilter/StatusFilter.tsx";
import { Flex, message, Spin } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks.ts";
import { setTodosResponse } from "./TodoListSlice.ts";


export default function TodoListPage(): JSX.Element {
  const { todosResponse, filerStatus } = useAppSelector(
    (state) => state.todosResponse,
  );
  const dispatch = useAppDispatch();

  const loadTodos = useCallback(async () => {
    try {
      const todos = await getTodos(filerStatus);
      // setTodosResponse(todos);
      dispatch(setTodosResponse(todos));
      console.log("данные обновились");
      // console.log(toDoData);
    } catch {
      message.error("Ошибка загрузки данных");
    }
  }, [filerStatus, dispatch]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadTodos();

    const intervalId = setInterval(loadTodos, 5000);
    return () => clearInterval(intervalId);
  }, [filerStatus, loadTodos]);

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
