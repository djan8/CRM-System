import {
  addTask,
  // getTodos,
  // type SetData,
  type StatusType,
} from "../../api/fetch.ts";
import { type JSX, useState } from "react";
import Button from "../ui/Button/Button.tsx";
import cls from "./AddTaskForm.module.scss";
import * as React from "react";
import { validateTodoTitle } from "../../helpers/validation.ts";
import Input from "../ui/Input/Input.tsx";

interface onUpdate {
  status: StatusType;
  onUpdate: (status: StatusType) => Promise<void>;
}

export default function AddTaskForm({
  status,
  onUpdate,
}: onUpdate): JSX.Element {
  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState<string>("");

  async function handleOnSubmit(
    event: React.SubmitEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    const { errorMessage, isValid } = validateTodoTitle(title);

    if (!isValid) {
      setError(errorMessage);
      return;
    }
    try {
      setError("");
      await addTask(title);
      await onUpdate(status);

      setTitle("");
    } catch (err) {
      console.log("сработал кетч, адд таск упал");
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  }

  function handleSetInputValue(e: React.ChangeEvent<HTMLInputElement>): void {
    setTitle(e.target.value);
  }
  return (
    <>
      {error.length > 0 && <div style={{ color: "red" }}>{error}</div>}
      <form className={cls.main} onSubmit={handleOnSubmit}>
        <Input
          variant="form"
          className={cls.input}
          placeholder="Task to be Done ..."
          value={title}
          onChange={handleSetInputValue}
        />
        <Button size="wide" variant="primary" type="submit">
          Создать
        </Button>
      </form>
    </>
  );
}
