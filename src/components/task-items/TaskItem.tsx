import cls from "./TaskItem.module.scss";
import type { MetaResponse, Todo, TodoInfo } from "../type.ts";
import { changeStatus, editTask } from "../../api/fetch.ts";
import { useState } from "react";
import * as React from "react";
import TaskEdit from "../task-edit/TaskEdit.tsx";
import TaskView from "../task-view/TaskView.tsx";

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

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const checked = e.target.checked;
    changeStatus(task.id, { isDone: checked }, setData, status);
  };
  const changeTaskName = () => {
    setIsEdit((prev) => !prev);
    editTask(task.id, edited, setData, status);
  };
  return (
    <div className={cls.elem}>
      {isEdit ? (
        <TaskEdit
          isEdit={isEdit}
          task={task}
          edited={edited}
          setEdited={setEdited}
          changeTaskName={changeTaskName}
          setIsEdit={setIsEdit}
        >
          save
        </TaskEdit>
      ) : (
        <TaskView
          task={task}
          handleChange={handleChange}
          setIsEdit={setIsEdit}
          setData={setData}
          status={status}
        >
          edit
        </TaskView>
      )}
    </div>
  );
}
