import TaskItem from "../task-items/TaskItem.tsx";
import cls from "./TaskList.module.scss";
import type { MetaResponse, Todo, TodoInfo } from "../type.ts";
import * as React from "react";

interface ITaskListProps {
  data: MetaResponse<Todo, TodoInfo>;
  status: string;
  setData: React.Dispatch<
    React.SetStateAction<MetaResponse<Todo, TodoInfo> | undefined>
  >;
}
export default function TaskList({
  data: { data: tasks, info },
  status,
  setData,
}: ITaskListProps) {
  return (
    <>
      <div className={cls.wrapper}>
        {tasks.map((task) => (
          <div key={task.id} className={cls.wrapper}>
            <TaskItem
              status={status}
              task={task}
              info={info}
              setData={setData}
            />
          </div>
        ))}
      </div>
    </>
  );
}
