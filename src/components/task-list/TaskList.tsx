import TaskItem from "../task-items/TaskItem.tsx";
import cls from "./TaskList.module.scss";
import type { MetaResponse, Todo, TodoInfo } from "../../types/type.ts";
import * as React from "react";
import type { JSX } from "react";
import type { StatusType } from "../../api/fetch.ts";

interface ITaskListProps {
  data: MetaResponse<Todo, TodoInfo>;
  status: StatusType;
  setData: React.Dispatch<
    React.SetStateAction<MetaResponse<Todo, TodoInfo> | undefined>
  >;
}
export default function TaskList({
  data: { data: tasks, info },
  status,
  setData,
}: ITaskListProps): JSX.Element {
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
