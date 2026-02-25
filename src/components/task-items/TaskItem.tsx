import cls from "./TaskItem.module.scss";
import type { MetaResponse, Todo, TodoInfo } from "../../types/type.ts";
import { editTask, type StatusType } from "../../api/fetch.ts";
import { type JSX, useState } from "react";
import * as React from "react";
import TaskEdit from "../task-edit/TaskEdit.tsx";
import TaskView from "../task-view/TaskView.tsx";
import { validateTodoTitle } from "../../helpers/validation.ts";

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

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const checked = e.target.checked;
    editTask(task.id, { isDone: checked }, setData, status);
  }

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

  return (
    <>
      {errorChangeValue.length > 0 && (
        <div className={cls.error}>{errorChangeValue}</div>
      )}
      <div className={cls.elem}>
        {isEdit ? (
          <>
            <TaskEdit
              setError={setErrorChangeValue}
              isEdit={isEdit}
              task={task}
              edited={edited}
              setEdited={setEdited}
              changeTaskName={changeTaskName}
              setIsEdit={setIsEdit}
            />
          </>
        ) : (
          <TaskView
            task={task}
            handleChange={handleChange}
            setIsEdit={setIsEdit}
            setData={setData}
            status={status}
          />
        )}
      </div>
    </>
  );
}
