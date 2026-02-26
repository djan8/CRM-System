import cls from "./TaskItem.module.scss";
import type { MetaResponse, Todo, TodoInfo } from "../../types/type.ts";
import { deleteTask, editTask, type StatusType } from "../../api/fetch.ts";
import { type JSX, useState } from "react";
import * as React from "react";
// import TaskEdit from "../task-edit/TaskEdit.tsx";
// import TaskView from "../task-view/TaskView.tsx";
import { validateTodoTitle } from "../../helpers/validation.ts";
import Input from "../ui/Input/Input.tsx";
import Button from "../ui/Button/Button.tsx";
import Icon from "../ui/Icon/Icon.tsx";
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

  function changeTaskName(): void {
    try {
      const validateTitle = validateTodoTitle(edited);
      const { errorMessage, isValid } = validateTitle;
      console.log(errorMessage, isValid);
      if (!isValid) {
        setErrorChangeValue(errorMessage);
        return;
      }
      editTask(task.id, { title: edited }, setData, status);
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
  }
  function handleClickDelete(): void {
    deleteTask(task.id, setData, status);
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const checked = e.target.checked;
    editTask(task.id, { isDone: checked }, setData, status);
  }

  return (
    <>
      {errorChangeValue.length > 0 && (
        <div className={cls.error}>{errorChangeValue}</div>
      )}
      <div className={cls.elem}>
        {isEdit ? (
          <>
            <Input
              // checked={task.isDone}
              isEdit={isEdit}
              edited={edited}
              task={task}
              setEdited={setEdited}
            />

            <Button
              type={"submit"}
              onClick={changeTaskName}
              // onChange={changeTaskName}
              width="2rem"
              height="2rem"
              background={"DodgerBlue"}
            >
              <Icon src={saveIcon} alt="save" />
            </Button>

            <Button
              onClick={handleChangeStateValue}
              width="2rem"
              height="2rem"
              background={"red"}
            >
              <Icon src={cancelIcon} alt="cancel" />
            </Button>
            {/*<TaskEdit*/}
            {/*  setError={setErrorChangeValue}*/}
            {/*  isEdit={isEdit}*/}
            {/*  task={task}*/}
            {/*  edited={edited}*/}
            {/*  setEdited={setEdited}*/}
            {/*  changeTaskName={changeTaskName}*/}
            {/*  setIsEdit={setIsEdit}*/}
            {/*/>*/}
          </>
        ) : (
          <>
            <input
              className={cls.input}
              type="checkbox"
              checked={task.isDone}
              onChange={handleChange}
            />
            {/*<Input type="checkbox" checked={task.isDone} />*/}
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
            {/*<TaskView*/}
            {/*  task={task}*/}
            {/*  handleChange={handleChange}*/}
            {/*  setIsEdit={setIsEdit}*/}
            {/*  setData={setData}*/}
            {/*  status={status}*/}
            {/*/>*/}
          </>
        )}
      </div>
    </>
  );
}
