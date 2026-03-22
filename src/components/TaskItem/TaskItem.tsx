import type { Status, TodoData } from "../../types/TodoType.ts";
import { useState } from "react";

import {
  Button,
  Checkbox,
  type CheckboxChangeEvent,
  Flex,
  Form,
  Input,
  message,
  Typography,
} from "antd";
import {
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { useAppSelector } from "../../hooks.ts";
import { deleteTask, editTask } from "./TaslItemSlice.ts";

const { Text } = Typography;
interface Props {
  task: TodoData;
  onUpdate?: (status: Status) => Promise<void>;
}

export default function TaskItem({ task, onUpdate }: Props) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [form] = Form.useForm();
  const filerStatus = useAppSelector(
    (state) => state.todosResponse.filterStatus,
  );

  async function handleChangeTaskName(value: { title: string }) {
    try {
      await form.validateFields();

      await editTask(task.id, value);
      await onUpdate?.(filerStatus);
      setIsEditing((prev) => !prev);
    } catch {
      message.error("Ошибка изменения имени, ппробуйте еще раз");
    }
  }
  async function handleChangeStateValue(): Promise<void> {
    try {
      setIsEditing((prev) => !prev);
      form.setFieldsValue({ title: task.title });
    } catch {
      message.error("Ошибка изменения состояния, ппробуйте еще раз");
    }
  }
  async function handleChangeEdit(): Promise<void> {
    try {
      setIsEditing((prev) => !prev);
    } catch {
      message.error("Ошибка изменения состояния, ппробуйте еще раз");
    }
  }
  async function handleDeleteTask(): Promise<void> {
    try {
      await deleteTask(task.id);
      await onUpdate?.(filerStatus);
    } catch {
      message.error("Ошибка удаления, ппробуйте еще раз");
    }
  }
  async function handleChangeStatusTask(e: CheckboxChangeEvent): Promise<void> {
    try {
      const checked = e.target.checked;
      await editTask(task.id, { isDone: checked });
      await onUpdate?.(filerStatus);
    } catch {
      message.error("Ошибка изм статуса, ппробуйте еще раз");
    }
  }
  return (
    <>
      {isEditing ? (
        <Flex align={"center"} justify={"space-between"} flex={1}>
          <Form
            name="title"
            form={form}
            onFinish={handleChangeTaskName}
            initialValues={{ title: task.title }}
            style={{ width: "100%" }}
          >
            <Flex align="center" gap="small" style={{ width: "100%" }}>
              <Form.Item
                style={{ flex: 1, marginBottom: 0 }}
                name="title"
                rules={[
                  { required: true, message: "Введите задачу" },
                  { min: 2, message: "Минимум 2 символа" },
                  { max: 64, message: "Максимум 64 символа" },
                ]}
              >
                <Input type="text" />
              </Form.Item>
              <Flex gap={"small"}>
                <Button
                  size={"large"}
                  color={"primary"}
                  variant={"solid"}
                  htmlType={"submit"}
                  icon={<SaveOutlined />}
                />
                <Button
                  size={"large"}
                  color={"danger"}
                  variant={"solid"}
                  htmlType={"button"}
                  onClick={handleChangeStateValue}
                  icon={<CloseOutlined />}
                />
              </Flex>
            </Flex>
          </Form>
        </Flex>
      ) : (
        <Flex align={"center"} justify={"space-between"} flex={1}>
          <Flex align={"center"} gap={"small"}>
            <Checkbox checked={task.isDone} onChange={handleChangeStatusTask} />
            <Text delete={task.isDone}>{task.title}</Text>
          </Flex>
          <Flex gap={"small"}>
            <Button
              size={"large"}
              onClick={handleChangeEdit}
              type={"primary"}
              icon={<EditOutlined />}
            />
            <Button
              size={"large"}
              color={"danger"}
              variant={"solid"}
              onClick={handleDeleteTask}
              icon={<DeleteOutlined />}
            />
          </Flex>
        </Flex>
      )}
    </>
  );
}
