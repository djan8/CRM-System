import type { StatusType } from "../../types/type.ts";
import type { JSX } from "react";
import { Tabs, type TabsProps } from "antd";
import { Typography } from "antd";
const { Text } = Typography;
import { setFilterStatus } from "../../pages/TodoListPage/TodoListSlice.ts";
import { useAppDispatch, useAppSelector } from "../../hooks.ts";

export default function StatusFilter(): JSX.Element {
  const dispatch = useAppDispatch();
  const filterStatus = useAppSelector(
    (state) => state.todosResponse.filerStatus,
  );
  const info = useAppSelector(
    (state) => state.todosResponse.todosResponse?.info,
  );

  if (!info) return <Text type="warning">Ant Design (warning)</Text>;
  const [all, completed, inWork] = Object.keys(info);

  const onChangeStatus = (filterStatus: string): void => {
    dispatch(setFilterStatus(filterStatus as StatusType));
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
        activeKey={filterStatus}
        items={items}
        onChange={onChangeStatus}
      />
    </>
  );
}
