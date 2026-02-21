import cls from "./Status.module.scss";
import type { TodoInfo } from "../type.ts";
import * as React from "react";
import { STATUSES } from "../../api/fetch.ts";

interface IStatusProps {
  info?: TodoInfo;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  status?: string;
}
export default function Status({ info, setStatus, status }: IStatusProps) {
  if (!info) return <div>Статусы не переданы</div>;
  const [all, completed, inWork] = Object.keys(info);

  const getTaskWithChangeStatus = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.dataset.id;
    if (!id) return;
    setStatus(id);
  };

  return (
    <div className={cls.wrapper}>
      <button
        className={`${cls.button} ${status === STATUSES.ALL ? cls.active : ""}`}
        data-id={all}
        onClick={getTaskWithChangeStatus}
      >
        {`Все (${info.all})`}
      </button>
      <button
        className={`${cls.button} ${status === STATUSES.INWORK ? cls.active : ""}`}
        data-id={inWork}
        onClick={getTaskWithChangeStatus}
      >
        {`в работе (${info.inWork})`}
      </button>
      <button
        className={`${cls.button} ${status === STATUSES.COMPLETED ? cls.active : ""}`}
        data-id={completed}
        onClick={getTaskWithChangeStatus}
      >
        {`сделано (${info.completed})`}
      </button>
    </div>
  );
}
