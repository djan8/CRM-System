import cls from "./Status.module.scss";
import type { TodoInfo } from "../../types/type.ts";
import * as React from "react";
import type { JSX } from "react";
import { STATUSES, type StatusType } from "../../api/fetch.ts";

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
        onClick={() => getTaskWithChangeStatus(STATUSES.ALL)}
      >
        {`Все (${info.all})`}
      </button>
      <button
        className={`${cls.button} ${status === inWork ? cls.active : ""}`}
        onClick={() => getTaskWithChangeStatus(STATUSES.INWORK)}
      >
        {`в работе (${info.inWork})`}
      </button>
      <button
        className={`${cls.button} ${status === completed ? cls.active : ""}`}
        onClick={() => getTaskWithChangeStatus(STATUSES.COMPLETED)}
      >
        {`сделано (${info.completed})`}
      </button>
    </div>
  );
}
