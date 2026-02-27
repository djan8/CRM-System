import cls from "./TaskItem.module.scss";
import type { MetaResponse, Todo, TodoInfo } from "../../types/type.ts";
import {
  deleteTask,
  editTask,
  // getTodos,
  type StatusType,
} from "../../api/fetch.ts";
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
  onUpdate?: (status: StatusType) => Promise<void>;
};

export default function TaskItem({
  task,
  // setData,
  status,
  onUpdate,
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

      // await editTask(task.id, { title: edited }, setData, status);
      await editTask(task.id, { title: edited });
      await onUpdate?.(status);
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
  async function handleClickDelete(): Promise<void> {
    await deleteTask(task.id);

    await onUpdate?.(status);
  }
  async function handleChange(
    e: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> {
    const checked = e.target.checked;

    await editTask(task.id, { isDone: checked });
    await onUpdate?.(status);
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
                size="normal"
                variant="primary"
                type={"submit"}
                onClick={changeTaskName}
              >
                <IconButton src={saveIcon} alt="save" />
              </Button>
              <Button
                size="normal"
                onClick={handleChangeStateValue}
                variant="danger"
              >
                <IconButton src={cancelIcon} alt="cancel" />
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className={cls.view}>
              <Input
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
              <Button size="normal" variant="primary" onClick={handleClickEdit}>
                <IconButton src={editIcon} alt="edit" />
              </Button>
              <Button
                size="normal"
                variant="danger"
                onClick={handleClickDelete}
              >
                <IconButton src={trashIcon} alt="delete" />
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
