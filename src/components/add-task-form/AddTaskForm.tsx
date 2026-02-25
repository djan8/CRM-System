import { addTask, type SetData } from "../../api/fetch.ts";
import { useState } from "react";
import Button from "../ui/Button/Button.tsx";
import cls from "./AddTaskForm.module.scss";
import * as React from "react";
import { validateTodoTitle } from "../../helpers/validation.ts";

interface IAddTaskProps {
  setData: SetData;
  status: string;
}

export default function AddTaskForm({ setData, status }: IAddTaskProps) {
  const [task, setTask] = useState<string>("");
  const [error, setError] = useState<string>("");
  console.log("iz add", error);
  console.log(task);

  async function handleOnSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      setError("");
      const validateTitle = validateTodoTitle(task);
      const { errorMessage, isValid } = validateTitle;
      console.log(errorMessage, isValid);
      if (!isValid) {
        setError(errorMessage);
        return;
      }
      await addTask(task, setData, status);
      setTask("");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  }
  function handleSetInputValue(e: React.ChangeEvent<HTMLInputElement>) {
    setTask(e.target.value);
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
          value={task}
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
