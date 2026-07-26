import { Button, Form, Input, message } from "antd";
import { createTask } from "./createTaskSlice.ts";
import { useAppDispatch } from "../../hooks.ts";

interface Props {
  onUpdate: () => Promise<void>;
}

export default function CreateTask({ onUpdate }: Props) {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  async function handleSubmitCreateTask(title: {
    title: string;
  }): Promise<void> {
    try {
      dispatch(createTask(title));
      await onUpdate();
      form.resetFields();
    } catch (err) {
      if (err instanceof Error) {
        message.error(`Не удалось добавить задачу ${title.title.toString()}`);
      }
    }
  }

  return (
    <>
      <Form form={form} layout={"inline"} onFinish={handleSubmitCreateTask}>
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
