import cls from "./Status.module.scss";
import type { StatusType, TodoInfo } from "../../types/type.ts";
import * as React from "react";
import type { JSX } from "react";

interface Props {
  info: TodoInfo;
  setStatus: React.Dispatch<React.SetStateAction<StatusType>>;
  status?: StatusType;
}

export default function StatusFilter({
  info,
  setStatus,
  status,
}: Props): JSX.Element {
  // if (!info) return null;
  const [all, completed, inWork] = Object.keys(info);

  function getTaskWithChangeStatus(status: StatusType): void {
    setStatus(status);
  }

  return (
    <>
      {!info && <div>Статусы не переданы</div>}
      {info && (
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
      )}
    </>
  );
}
