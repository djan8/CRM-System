import cls from "./Status.module.scss";
import type { TodoInfo } from "../../types/type.ts";
import * as React from "react";
import type { JSX } from "react";
import type { StatusType } from "../../api/fetch.ts";

interface IStatusProps {
  info?: TodoInfo;
  setStatus: React.Dispatch<React.SetStateAction<StatusType>>;
  status?: StatusType;
}

export default function Status({
  info,
  setStatus,
  status,
}: IStatusProps): JSX.Element {
  if (!info) return <div>Статусы не переданы</div>;
  const [all, completed, inWork] = Object.keys(info);

  function getTaskWithChangeStatus(
    e: React.MouseEvent<HTMLButtonElement>,
  ): void {
    const id = e.currentTarget.dataset.id;
    if (!id) return;
    setStatus(id as StatusType);
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
