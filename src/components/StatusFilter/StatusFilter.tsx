import type { StatusType, TodoInfo } from "../../types/type.ts";
import * as React from "react";
import type { JSX } from "react";

import { Tabs, type TabsProps } from "antd";
import { Typography } from "antd";
const { Text } = Typography;

interface IStatusProps {
  info?: TodoInfo;
  setStatus: React.Dispatch<React.SetStateAction<StatusType>>;
  status?: StatusType;
}

export default function StatusFilter({
  info,
  setStatus,
}: IStatusProps): JSX.Element {
  if (!info) return <Text type="warning">Ant Design (warning)</Text>;
  const [all, completed, inWork] = Object.keys(info);

  const onChangeStatus = (status: string): void => {
    setStatus(status as StatusType);
  };

  const items: TabsProps["items"] = [
    {
      key: all,
      label: `Все (${info.all})`,
    },
    {
      key: inWork,
      label: `В работе (${info.inWork})`,
    },
    {
      key: completed,
      label: `Сделано (${info.completed})`,
    },
  ];

  return (
    <>
      <Tabs
        type={"line"}
        size={"large"}
        centered
        color={"deepskyblue"}
        defaultActiveKey="1"
        items={items}
        onChange={onChangeStatus}
      />
    </>
  );
}
