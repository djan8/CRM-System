import TaskItem from "../task-items/TaskItem.tsx";
// import cls from "./TaskList.module.scss";
import type {
  MetaResponse,
  StatusType,
  Todo,
  TodoInfo,
} from "../../types/type.ts";
import * as React from "react";
import type { JSX } from "react";

import { Card, Flex } from "antd";

interface ITaskListProps {
  data: MetaResponse<Todo, TodoInfo>;
  status: StatusType;
  setData: React.Dispatch<
    React.SetStateAction<MetaResponse<Todo, TodoInfo> | undefined>
  >;
  onUpdate?: (status: StatusType) => Promise<void>;
}
export default function TaskList({
  data: { data: tasks, info },
  status,
  setData,
  onUpdate,
}: ITaskListProps): JSX.Element {
  return (
    <Flex vertical gap={"small"}>
      {tasks.map((task) => (
        <Card key={task.id} size={"small"}>
          <TaskItem
            onUpdate={onUpdate}
            status={status}
            task={task}
            info={info}
            setData={setData}
          />
        </Card>
      ))}
    </Flex>
  );
}
