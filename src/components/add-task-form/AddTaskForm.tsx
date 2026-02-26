import {
  addTask,
  getTodos,
  type SetData,
  type StatusType,
} from "../../api/fetch.ts";
import { type JSX, useState } from "react";
import Button from "../ui/Button/Button.tsx";
import cls from "./AddTaskForm.module.scss";
import * as React from "react";
import { validateTodoTitle } from "../../helpers/validation.ts";

interface onUpdate {
  setData: SetData;
  status: StatusType;
}

export default function AddTaskForm({
  setData,
  status,
}: onUpdate): JSX.Element {
  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState<string>("");

  async function handleOnSubmit(
    event: React.SubmitEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    const { errorMessage, isValid } = validateTodoTitle(title);
    // const { errorMessage, isValid } = validateTitle;
    if (!isValid) {
      setError(errorMessage);
      return;
    }
    try {
      setError("");
      await addTask(title);
      const data = await getTodos(status);
      setData(data);
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
        <input
          required
          // minLength={2}
          // maxLength={64}
          className={cls.input}
          placeholder="Task to be Done ..."
          value={title}
          onChange={handleSetInputValue}
        />

        <Button
          width="10rem"
          height="2rem"
          background={"DodgerBlue"}
          type="submit"
        >
          Add
        </Button>
      </form>
    </>
  );
}
