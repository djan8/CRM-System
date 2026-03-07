import TaskItem from "../TaskItem/TaskItem.tsx";

import type {
  MetaResponse,
  StatusType,
  Todo,
  TodoInfo,
} from "../../types/type.ts";
import type { JSX } from "react";

import { Card, Flex } from "antd";

interface Props {
  data: MetaResponse<Todo, TodoInfo>;
  // status: StatusType;
  onUpdate?: (status: StatusType) => Promise<void>;
}
export default function TaskList({
  data: { data: tasks },
  // status,

  onUpdate,
}: Props): JSX.Element {
  return (
    <Flex vertical gap={"small"}>
      {tasks.map((task) => (
        <Card key={task.id} size={"small"}>
          {/*<TaskItem onUpdate={onUpdate} status={status} task={task} />*/}
          <TaskItem onUpdate={onUpdate} task={task} />
        </Card>
      ))}
    </Flex>
  );
}
