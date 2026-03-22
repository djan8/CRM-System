import { useAppDispatch, useAppSelector } from "../../hooks.ts";
import { type ChangeEvent, useCallback, useEffect, useState } from "react";
import {
  Button,
  Flex,
  Input,
  Layout,
  Space,
  Table,
  Tag,
  Typography,
  type TableProps,
  Dropdown,
  type MenuProps,
  Checkbox,
  message,
  Popconfirm,
  Select,
  type SelectProps,
  type TablePaginationConfig,
} from "antd";
import {
  FilterOutlined,
  LockOutlined,
  SearchOutlined,
  UnlockOutlined,
  UserDeleteOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { type Roles, RolesConst, type User, type UserFilters } from "./type.ts";
import { Link } from "react-router";
import {
  blockUser,
  deleteUser,
  getUsersList,
  setUsersData,
  unblockUser,
  updateRightUser,
} from "./UsersPageSlice.ts";
import { refreshToken } from "../../components/FormUserAuth/autorization/AutorizationSlice.ts";
import axios from "axios";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import { setModalMode } from "../../AppSlice.ts";
import { PAGINATION_LIMIT } from "../../const/const.ts";

export default function UsersPage() {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users?.usersMetaResponse?.data);
  const meta = useAppSelector((state) => state.users?.usersMetaResponse?.meta);
  const isAuth = useAppSelector((state) => state.visible.isAuth);
  const isChecking = useAppSelector((state) => state.visible.isChecking);

  const [selected, setSelected] = useState("all");
  const [editingId, setEditingId] = useState<number | null>(null);
  // const navigate = useNavigate();
  const [filters, setFilters] = useState<UserFilters>({
    search: undefined,
    sortBy: undefined,
    sortOrder: undefined,
    isBlocked: undefined,
    page: 0,
    limit: PAGINATION_LIMIT,
  });

  const loadUsers = useCallback(async () => {
    try {
      const data = await getUsersList(filters);
      dispatch(setUsersData(data));
    } catch (err) {
      console.log(err);
      localStorage.removeItem("refreshToken");
      dispatch(setModalMode(false));
    }
  }, [dispatch, filters]);
  useEffect(() => {
    if (isAuth && !isChecking) {
      void loadUsers();
    }
  }, [isAuth, isChecking, loadUsers]);

  async function handleDeleteUser(id: number) {
    try {
      await deleteUser(id);
      await loadUsers();
    } catch (err) {
      console.log(err);
      message.error("ошибка удаления");
    }
  }
  // }
  async function handleBlockUser(id: number) {
    try {
      await blockUser(id);
      await loadUsers();
    } catch (err) {
      console.log(err);
      message.error("ошибка удаления");
    }
  }

  async function handleUnBlockUser(id: number) {
    try {
      await unblockUser(id);
      await loadUsers();
    } catch (err) {
      console.log(err);

      message.error("ошибка разблок");
    }
  }

  const options: SelectProps["options"] = [
    { label: "USER", value: "USER" },
    { label: "MODERATOR", value: "MODERATOR" },
    { label: "ADMIN", value: "ADMIN" },
  ];

  const handleChangeRoles = async (id: number, roles: Roles[]) => {
    try {
      console.log("id-", id, "roles-", roles);
      if (roles.length === 0) roles = [RolesConst.USER];
      await updateRightUser(id, { roles });
      await loadUsers();
    } catch (err) {
      console.log(err);
      message.error("ошибка изменения роли");
    }
  };

  const columns: TableProps<User>["columns"] = [
    {
      title: "Имя",
      dataIndex: "username",
      key: "username",
      sorter: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: true,
    },
    {
      title: "Телефон",
      dataIndex: "phoneNumber",
    },
    {
      title: "Роли",
      key: "tags",
      dataIndex: "roles",
      render: (_, { roles }) => (
        <>
          <Flex
            vertical
            style={{ maxWidth: 160 }}
            gap="small"
            align="center"
            wrap
          >
            {roles.map((role) => {
              let color;
              if (role === "USER") {
                color = "blue";
              }
              if (role === "MODERATOR") {
                color = "green";
              }
              if (role === "ADMIN") {
                color = "volcano";
              }
              return (
                <Tag color={color} key={role}>
                  {role}
                </Tag>
              );
            })}
          </Flex>
        </>
      ),
    },
    {
      title: "Ред-ть роли",
      dataIndex: "roles",
      key: "roles",
      render: (roles: Roles[], record) => {
        const isEditing = editingId === record.id;

        if (isEditing) {
          return (
            <Flex>
              <Select
                mode="multiple"
                value={roles}
                options={options}
                onChange={(value) => handleChangeRoles(record.id, value)}
                onBlur={() => setEditingId(null)}
                style={{ width: "100%" }}
                autoFocus
              />{" "}
            </Flex>
          );
        }

        return (
          <Popconfirm
            title={"Изменить роли?"}
            onConfirm={() => setEditingId(record.id)}
          >
            <Flex vertical gap={4} style={{ cursor: "pointer" }}>
              {roles.length === 0 ? (
                <Tag color="default">+ Добавить роль</Tag>
              ) : (
                roles.map((role) => (
                  <Tag
                    onClose={(e) => {
                      e.stopPropagation();
                      const newRoles = roles.filter((rol) => rol !== role);
                      void handleChangeRoles(record.id, newRoles);
                    }}
                    key={role}
                  >
                    {role}
                  </Tag>
                ))
              )}
            </Flex>
          </Popconfirm>
        );
      },
    },
    {
      title: "Блок",
      dataIndex: "isBlocked",
      // render: (isBlocked: boolean) => (isBlocked ? "+" : "-"),
      render: (isBlocked: boolean) => (
        <>
          <Flex
            vertical
            style={{ maxWidth: 160 }}
            gap="small"
            align="center"
            wrap
          >
            <Tag color={isBlocked ? "volcano" : "green"}>
              {isBlocked ? "Заблок" : "Акт"}
            </Tag>
          </Flex>
        </>
      ),

      // key: 'address',
    },
    {
      title: "Дата рег",
      dataIndex: "date",
      render: (date: string) => new Date(date).toLocaleDateString("ru-RU"),
      // key: 'address',
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <Popconfirm
          title={record.isBlocked ? "Разблок" : "Блок"}
          onConfirm={
            record.isBlocked
              ? () => handleUnBlockUser(record.id)
              : () => handleBlockUser(record.id)
          }
        >
          <Space size="medium">
            {record.isBlocked ? (
              <Button>
                <UnlockOutlined />
              </Button>
            ) : (
              <Button>
                <LockOutlined />
              </Button>
            )}
          </Space>
        </Popconfirm>
      ),
    },
    {
      title: "",
      dataIndex: "profile",
      render: (_, record) => (
        <Link to={`/details/${record.id}`}>
          <Button variant={"outlined"}>
            <UserOutlined />
          </Button>
        </Link>
      ),
    },
    {
      title: "",
      dataIndex: "delete",
      render: (_, record) => (
        <Popconfirm
          title="Удалим?"
          onConfirm={() => handleDeleteUser(record.id)}
        >
          <Button>
            <UserDeleteOutlined />
          </Button>
        </Popconfirm>
      ),
    },
  ];

  async function handleTableChange(
    pagination: TablePaginationConfig,
    _filters: Record<string, FilterValue | null>,
    sorter: SorterResult<User> | SorterResult<User>[],
  ) {
    try {
      if (Array.isArray(sorter)) return;
      const sortField = sorter.field || sorter.columnKey;
      let sortOrder: "asc" | "desc" | undefined;
      if (sorter.order === "ascend") sortOrder = "asc";
      if (sorter.order === "descend") sortOrder = "desc";
      if (sortOrder === undefined) sortOrder = undefined;

      const newFilters = {
        ...filters,
        sortBy: sortField?.toString(),
        sortOrder: sortOrder,
        page: (pagination.current ?? 1) - 1,
      };
      setFilters(newFilters);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        await refreshToken();
        const data = await getUsersList();

        dispatch(setUsersData(data));
      }
    }
  }

  async function handleSearchFilter(event: ChangeEvent<HTMLInputElement>) {
    const newValue = event.target.value;

    setFilters((prev) => ({ ...prev, search: newValue, page: 0 }));
  }

  const rowSelection: TableProps<User>["rowSelection"] = {
    hideSelectAll: true,
    onChange: (selectedRowKeys, selectedRows: User[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows,
      );
    },
  };

  if (!users) return;
  if (!meta) return;

  const handleMenuClick: MenuProps["onClick"] = async (e) => {
    setSelected(e.key);
    let isBlock;
    if (e.key === "block") isBlock = true;
    if (e.key === "noBlock") isBlock = false;
    if (e.key === "all") isBlock = undefined;
    const newFilters = { ...filters, isBlocked: isBlock };
    setFilters(newFilters);
  };
  const items: MenuProps["items"] = [
    {
      label: <Checkbox checked={selected === "all"}>All</Checkbox>,
      key: "all",
    },
    {
      label: <Checkbox checked={selected === "block"}>Block</Checkbox>,
      key: "block",
    },
    {
      label: <Checkbox checked={selected === "noBlock"}>NoBlock</Checkbox>,
      key: "noBlock",
    },
  ];
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <>
      <Layout
        style={{
          border: "1px solid gray",
          margin: "5px",
          padding: "5px",
          borderRadius: "8px",
        }}
      >
        <Flex justify={"space-between"} align={"center"}>
          <Typography.Title style={{ marginTop: 0 }} level={4}>
            Пользователи
          </Typography.Title>
          <Flex gap={6}>
            <Input
              value={filters.search}
              onChange={handleSearchFilter}
              prefix={<SearchOutlined />}
              placeholder={"Поиск"}
            ></Input>
            <Dropdown menu={menuProps} trigger={["click"]}>
              <FilterOutlined />
            </Dropdown>
          </Flex>
        </Flex>
        <Table<User>
          size={"small"}
          onChange={handleTableChange}
          bordered
          rowKey={"id"}
          rowSelection={{ ...rowSelection }}
          columns={columns}
          pagination={{
            current: (filters.page ?? 1) + 1,
            pageSize: filters.limit,
            total: meta.totalAmount,
            showSizeChanger: true,
          }}
          dataSource={users}
          scroll={{ x: "max-content" }}
        />
      </Layout>
    </>
  );
}
