import TaskItem from "../task-items/TaskItem.tsx";
import cls from "./TaskList.module.scss";
import type {
  MetaResponse,
  StatusType,
  Todo,
  TodoInfo,
} from "../../types/type.ts";
import type { JSX } from "react";

interface Props {
  data: MetaResponse<Todo, TodoInfo>;
  status: StatusType;
  onUpdate?: (status: StatusType) => Promise<void>;
}
export default function TaskList({
  data: { data: tasks },
  status,
  onUpdate,
}: Props): JSX.Element {
  return (
    <>
      <ul className={cls.wrapper}>
        {tasks.map((task) => (
          <li key={task.id} className={cls.wrapper}>
            <TaskItem onUpdate={onUpdate} status={status} task={task} />
          </li>
        ))}
      </ul>
    </>
  );
}
