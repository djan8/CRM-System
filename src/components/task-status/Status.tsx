import cls from "./Status.module.scss";
import type { TodoInfo } from "../../types/type.ts";
import * as React from "react";

interface IStatusProps {
  info?: TodoInfo;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  status?: string;
}

export default function Status({ info, setStatus, status }: IStatusProps) {
  if (!info) return <div>Статусы не переданы</div>;
  const [all, completed, inWork] = Object.keys(info);

  function getTaskWithChangeStatus(e: React.MouseEvent<HTMLButtonElement>) {
    const id = e.currentTarget.dataset.id;
    if (!id) return;
    setStatus(id);
  }

  return (
    <div className={cls.wrapper}>
      <button
        className={`${cls.button} ${status === all ? cls.active : ""}`}
        data-id={all}
        onClick={getTaskWithChangeStatus}
      >
        {`Все (${info.all})`}
      </button>
      <button
        className={`${cls.button} ${status === inWork ? cls.active : ""}`}
        data-id={inWork}
        onClick={getTaskWithChangeStatus}
      >
        {`в работе (${info.inWork})`}
      </button>
      <button
        className={`${cls.button} ${status === completed ? cls.active : ""}`}
        data-id={completed}
        onClick={getTaskWithChangeStatus}
      >
        {`сделано (${info.completed})`}
      </button>
    </div>
  );
}
