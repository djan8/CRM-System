import cls from "./TaskItem.module.scss";
import type { MetaResponse, Todo, TodoInfo } from "../../types/type.ts";
import { deleteTask, editTask, type StatusType } from "../../api/fetch.ts";
import { type JSX, useState } from "react";
import * as React from "react";

import { validateTodoTitle } from "../../helpers/validation.ts";
import Input from "../ui/Input/Input.tsx";
import Button from "../ui/Button/Button.tsx";
import IconButton from "../ui/Icon/IconButton.tsx";
import saveIcon from "../../assets/save.svg";
import cancelIcon from "../../assets/cancel.svg";
import editIcon from "../../assets/edit.svg";
import trashIcon from "../../assets/trash.svg";

type TaskItemProps = {
  task: Todo;
  info?: TodoInfo;
  setData: React.Dispatch<
    React.SetStateAction<MetaResponse<Todo, TodoInfo> | undefined>
  >;
  status: StatusType;
};

export default function TaskItem({
  task,
  setData,
  status,
}: TaskItemProps): JSX.Element {
  const [isEdit, setIsEdit] = useState(false);
  const [edited, setEdited] = useState(task.title);
  const [errorChangeValue, setErrorChangeValue] = useState<string>("");

  async function changeTaskName() {
    const { errorMessage, isValid } = validateTodoTitle(edited);
    if (!isValid) {
      setErrorChangeValue(errorMessage);
      return;
    }
    try {
      // const { errorMessage, isValid } = validateTitle;
      console.log(errorMessage, isValid);

      await editTask(task.id, { title: edited }, setData, status);
      setIsEdit((prev) => !prev);
      setErrorChangeValue("");
    } catch (err) {
      if (err instanceof Error) {
        // console.error(err.message);
        setErrorChangeValue(err.message);
      }
    }
  }
  function handleChangeStateValue(): void {
    setIsEdit((prev) => !prev);
    setErrorChangeValue("");
    setEdited(task?.title);
  }
  function handleClickEdit(): void {
    setIsEdit((prev) => !prev);
    setEdited(task.title);
  }
  function handleClickDelete(): void {
    deleteTask(task.id, setData, status);
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const checked = e.target.checked;
    editTask(task.id, { isDone: checked }, setData, status);
  }
  function changeValue(e: React.ChangeEvent<HTMLInputElement>) {
    setEdited(e.target.value);
  }

  return (
    <>
      {errorChangeValue.length > 0 && (
        <div className={cls.error}>{errorChangeValue}</div>
      )}
      <div className={cls.elem}>
        {isEdit ? (
          <>
            <div className={cls.edit}>
              <Input
                value={isEdit ? edited : task.title}
                onChange={changeValue}
                type="text"
              />
            </div>
            <div className={cls.buttongroup}>
              <Button
                variant="primary"
                type={"submit"}
                onClick={changeTaskName}
              >
                <IconButton src={saveIcon} alt="save" />
              </Button>
              <Button onClick={handleChangeStateValue} variant="danger">
                <IconButton src={cancelIcon} alt="cancel" />
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className={cls.view}>
              <Input
                // style={cls.input}
                onChange={handleChange}
                type="checkbox"
                checked={task.isDone}
              />
            </div>
            <div className={cls.viewText}>
              <Input
                className={task.isDone ? cls.done : ""}
                value={task.title}
                readOnly
              />
            </div>
            <div className={cls.buttongroup}>
              <Button variant="primary" onClick={handleClickEdit}>
                <IconButton src={editIcon} alt="edit" />
              </Button>
              <Button variant="danger" onClick={handleClickDelete}>
                <IconButton src={trashIcon} alt="delete" />
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
