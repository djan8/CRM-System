import TaskItem from "../TaskItem/TaskItem.tsx";
import type { Status } from "../../types/TodoType.ts";
import { Card, Flex, Spin } from "antd";
import { useAppSelector } from "../../hooks.ts";
import { LoadingOutlined } from "@ant-design/icons";

interface Props {
  onUpdate?: (status: Status) => Promise<void>;
}

export default function TodoList({ onUpdate }: Props) {
  const toDoListData = useAppSelector(
    (state) => state.todosResponse.todosResponse?.data,
  );
  return (
    <>
      {!toDoListData ? (
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      ) : (
        <Flex vertical gap={"small"}>
          {toDoListData.map((task) => (
            <Card key={task.id} size={"small"}>
              <TaskItem onUpdate={onUpdate} task={task} />
            </Card>
          ))}
        </Flex>
      )}
    </>
  );
}
