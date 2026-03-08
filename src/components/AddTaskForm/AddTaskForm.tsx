import { type JSX } from "react";
import { Button, Form, Input, message } from "antd";
import { addTask } from "./AddTaskSlice.ts";

interface Props {
  onUpdate: () => Promise<void>;
}

export default function AddTaskForm({ onUpdate }: Props): JSX.Element {
  const [form] = Form.useForm();

  async function handleOnSubmit(title: { title: string }): Promise<void> {
    await form.validateFields();
    try {
      await addTask(title);
      await onUpdate();
      form.resetFields();
    } catch (err) {
      if (err instanceof Error) {
        message.error("Не удалось добавить задачу");
        message.error(err.message);
      }
    }
  }

  return (
    <>
      <Form form={form} layout={"inline"} onFinish={handleOnSubmit}>
        <Form.Item
          style={{ flex: 1 }}
          name="title"
          required
          rules={[
            { required: true, message: "Введите задачу" },
            { whitespace: true, message: "Нельзя только пробелы" },
            { min: 2, message: "Минимум 2 символа" },
            { max: 64, message: "Максимум 64 символа" },
          ]}
        >
          <Input placeholder={"Создать задачу..."} />
        </Form.Item>
        <Button type={"primary"} htmlType="submit">
          Создать
        </Button>
      </Form>
    </>
  );
}
