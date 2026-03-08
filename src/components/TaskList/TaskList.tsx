import TaskItem from "../TaskItem/TaskItem.tsx";

import type { StatusType } from "../../types/type.ts";
import type { JSX } from "react";

import { Card, Flex, Spin } from "antd";
import { useAppSelector } from "../../hooks.ts";
import { LoadingOutlined } from "@ant-design/icons";

interface Props {
  onUpdate?: (status: StatusType) => Promise<void>;
}
export default function TaskList({ onUpdate }: Props): JSX.Element {
  const data = useAppSelector(
    (state) => state.todosResponse.todosResponse?.data,
  );
  return (
    <>
      {!data ? (
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      ) : (
        <Flex vertical gap={"small"}>
          {data.map((task) => (
            <Card key={task.id} size={"small"}>
              <TaskItem onUpdate={onUpdate} task={task} />
            </Card>
          ))}
        </Flex>
      )}
    </>
  );
}
