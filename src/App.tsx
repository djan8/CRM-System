import "./App.css";
import TaskList from "./components/task-list/TaskList.tsx";
import { useEffect, useState } from "react";
import { getTodos } from "./api/fetch.ts";
import Status from "./components/task-status/Status.tsx";
import AddTask from "./components/add-task/AddTask.tsx";
import type { MetaResponse, Todo, TodoInfo } from "./components/type.ts";

function App() {
  const [status, setStatus] = useState("all");

  const [data, setData] = useState<MetaResponse<Todo, TodoInfo> | undefined>();

  useEffect(() => {
    const loadTodos = async () => {
      const todos = await getTodos(status);
      setData(todos);
    };
    loadTodos();
    // getTodos(status, setData);
  }, [status]);

  if (!data) return <div>Loading...</div>;

  const statusProps = { info: data.info, status, setStatus, setData };

  const taskListProps = { data, setData, status };

  return (
    <div className="app">
      <AddTask setData={setData} />
      <Status {...statusProps} />
      <TaskList {...taskListProps} />
    </div>
  );
}

export default App;
