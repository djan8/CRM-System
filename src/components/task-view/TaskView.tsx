import { deleteTask } from "../../api/fetch.ts";
import cls from "./TaskView.module.scss";
import Button from "../ui/Button/Button.tsx";
import Input from "../ui/Input/Input.tsx";
import type { MetaResponse, Todo, TodoInfo } from "../../types/type.ts";
import * as React from "react";
import Icon from "../ui/Icon/Icon.tsx";
import editIcon from "/src/assets/edit.svg";
import trashIcon from "/src/assets/trash.svg";

interface ITaskViewProps {
  task: Todo;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setData: React.Dispatch<
    React.SetStateAction<MetaResponse<Todo, TodoInfo> | undefined>
  >;
  status: string;
}
export default function TaskView({
  task,
  handleChange,
  setIsEdit,
  setData,
  status,
}: ITaskViewProps) {
  function handleClickEdit() {
    setIsEdit((prev) => !prev);
  }
  function handleClickDelete() {
    deleteTask(task.id, setData, status);
  }
  return (
    <div>
      <input
        className={cls.input}
        type="checkbox"
        checked={task.isDone}
        onChange={handleChange}
      />
      <Input task={task} readOnly />
      <Button
        width="2rem"
        height="2rem"
        background={"DodgerBlue"}
        onClick={handleClickEdit}
      >
        <Icon src={editIcon} alt="edit" />
      </Button>
      <Button
        width="2rem"
        height="2rem"
        background={"red"}
        onClick={handleClickDelete}
      >
        <Icon src={trashIcon} alt="delete" />
      </Button>
    </div>
  );
}
