import cls from "./TaskItem.module.scss";
import type { MetaResponse, Todo, TodoInfo } from "../../types/type.ts";
import { changeStatus, editTask } from "../../api/fetch.ts";
import { useState } from "react";
import * as React from "react";
import TaskEdit from "../task-edit/TaskEdit.tsx";
import TaskView from "../task-view/TaskView.tsx";
import { checkValidate } from "../../helpers/validation.ts";

type TaskItemProps = {
  task: Todo;
  info?: TodoInfo;
  setData: React.Dispatch<
    React.SetStateAction<MetaResponse<Todo, TodoInfo> | undefined>
  >;
  status: string;
};

export default function TaskItem({
  task,
  // info,
  setData,
  status,
}: TaskItemProps) {
  const [isEdit, setIsEdit] = useState(false);
  const [edited, setEdited] = useState(task.title);
  const [errorChangeValue, setErrorChangeValue] = useState<string>("");
  console.log("iz item", errorChangeValue);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const checked = e.target.checked;
    changeStatus(task.id, { isDone: checked }, setData, status);
  };
  const changeTaskName = () => {
    try {
      const validateTitle = checkValidate(edited);
      editTask(task.id, validateTitle, setData, status);
      setIsEdit((prev) => !prev);
      setErrorChangeValue("");
    } catch (err) {
      if (err instanceof Error) {
        // console.error(err.message);
        setErrorChangeValue(err.message);
      }
    }
  };
  return (
    <>
      {errorChangeValue.length > 0 && (
        <div className={cls.error}>{errorChangeValue}</div>
      )}
      <div className={cls.elem}>
        {isEdit ? (
          <TaskEdit
            setError={setErrorChangeValue}
            isEdit={isEdit}
            task={task}
            edited={edited}
            setEdited={setEdited}
            changeTaskName={changeTaskName}
            setIsEdit={setIsEdit}
          />
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
