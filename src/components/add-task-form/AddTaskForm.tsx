import { addTask, type SetData } from "../../api/fetch.ts";
import { useState } from "react";
import Button from "../ui/Button/Button.tsx";
import cls from "./AddTaskForm.module.scss";
import * as React from "react";

interface IAddTaskProps {
  setData: SetData;
  status: string;
}

export default function AddTaskForm({ setData, status }: IAddTaskProps) {
  const [task, setTask] = useState<string>("");
  const [error, setError] = useState("");

  const handleOnSubmit: React.SubmitEventHandler<HTMLFormElement> = async (
    event,
  ) => {
    event.preventDefault();
    try {
      setError("");
      await addTask(task, setData, status);
      setTask("");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };
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
          onChange={(e) => setTask(e.target.value)}
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
