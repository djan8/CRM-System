import { addTask } from "../../api/fetch.ts";
import { type JSX } from "react";

import { Button, Form, Input } from "antd";

interface onUpdate {
  onUpdate: () => Promise<void>;
}

export default function AddTaskForm({ onUpdate }: onUpdate): JSX.Element {
  const [form] = Form.useForm();

  async function handleOnSubmit(title: { title: string }): Promise<void> {
    await form.validateFields();
    try {
      await addTask(title);

      await onUpdate();

      form.resetFields();
    } catch (err) {
      console.log("сработал кетч, адд таск упал", err);
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
