import cls from "./Status.module.scss";
import type { TodoInfo } from "../../types/type.ts";
import * as React from "react";
import type { JSX } from "react";
import { type StatusType } from "../../api/fetch.ts";

interface IStatusProps {
  info?: TodoInfo | undefined;
  setStatus: React.Dispatch<React.SetStateAction<StatusType>>;
  status?: StatusType;
}

export default function StatusFilter({
  info,
  setStatus,
  status,
}: IStatusProps): JSX.Element {
  if (!info) return <div>Статусы не переданы</div>;
  const [all, completed, inWork] = Object.keys(info);

  function getTaskWithChangeStatus(status: StatusType): void {
    setStatus(status);
  }

  return (
    <div className={cls.wrapper}>
      <button
        className={`${cls.button} ${status === all ? cls.active : ""}`}
        onClick={() => getTaskWithChangeStatus("all")}
      >
        {`Все (${info.all})`}
      </button>
      <button
        className={`${cls.button} ${status === inWork ? cls.active : ""}`}
        onClick={() => getTaskWithChangeStatus("inWork")}
      >
        {`в работе (${info.inWork})`}
      </button>
      <button
        className={`${cls.button} ${status === completed ? cls.active : ""}`}
        onClick={() => getTaskWithChangeStatus("completed")}
      >
        {`сделано (${info.completed})`}
      </button>
    </div>
  );
}
