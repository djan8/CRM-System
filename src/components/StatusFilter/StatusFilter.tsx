import type { Status } from "../../types/TodoType.ts";
import type { JSX } from "react";
import { Tabs, type TabsProps } from "antd";
import { Typography } from "antd";
import { setFilterStatus } from "../../pages/TodoListPage/TodoListSlice.ts";
import { useAppDispatch, useAppSelector } from "../../hooks.ts";

export default function StatusFilter(): JSX.Element {
  const dispatch = useAppDispatch();
  const filterStatus = useAppSelector(
    (state) => state.todosResponse.filterStatus,
  );
  const info = useAppSelector(
    (state) => state.todosResponse.todosResponse?.info,
  );

  if (!info)
    return (
      <Typography.Text type="warning">Ant Design (warning)</Typography.Text>
    );
  // shared [all, completed, inWork] = Object.keys(info);

  const handleChangeStatus = (filterStatus: string): void => {
    dispatch(setFilterStatus(filterStatus as Status));
  };

  const items: TabsProps["items"] = [
    {
      key: "all",
      label: `Все (${info.all})`,
    },
    {
      key: "inWork",
      label: `В работе (${info.inWork})`,
    },
    {
      key: "completed",
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
        onChange={handleChangeStatus}
      />
    </>
  );
}
