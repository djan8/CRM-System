import type { StatusType, Todo } from "../../types/type.ts";
import { deleteTask, editTask } from "../../api/fetch.ts";
import { type JSX, useState } from "react";

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

const { Text } = Typography;
type Props = {
  task: Todo;
  onUpdate?: (status: StatusType) => Promise<void>;
};

export default function TaskItem({ task, onUpdate }: Props): JSX.Element {
  const [isEditText, setIsEditText] = useState(false);
  const [form] = Form.useForm();
  const filerStatus = useAppSelector(
    (state) => state.todosResponse.filerStatus,
  );

  async function changeTaskName() {
    try {
      await form.validateFields();
      const title = form.getFieldsValue();
      console.log(title);
      await editTask(task.id, title);
      await onUpdate?.(filerStatus);
      setIsEditText((prev) => !prev);
    } catch {
      message.error("Ошибка изменения имени, ппробуйте еще раз");
    }
  }
  function handleChangeStateValue(): void {
    setIsEditText((prev) => !prev);
    form.setFieldsValue({ title: task.title });
  }
  function handleClickEdit(): void {
    setIsEditText((prev) => !prev);
  }
  async function handleClickDelete(): Promise<void> {
    await deleteTask(task.id);

    await onUpdate?.(filerStatus);
  }
  async function handleChangeStatusTask(e: CheckboxChangeEvent): Promise<void> {
    const checked = e.target.checked;
    await editTask(task.id, { isDone: checked });
    await onUpdate?.(filerStatus);
  }
  return (
    <>
      {isEditText ? (
        <Flex align={"center"} justify={"space-between"} flex={1}>
          <Form
            name="title"
            form={form}
            onFinish={changeTaskName}
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
              onClick={handleClickEdit}
              type={"primary"}
              icon={<EditOutlined />}
            />
            <Button
              size={"large"}
              color={"danger"}
              variant={"solid"}
              onClick={handleClickDelete}
              icon={<DeleteOutlined />}
            />
          </Flex>
        </Flex>
      )}
    </>
  );
}
