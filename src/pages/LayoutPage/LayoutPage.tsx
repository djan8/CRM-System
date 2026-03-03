import { Link, Outlet } from "react-router";
import { Flex, Layout } from "antd";

const { Sider } = Layout;

export default function LayoutPage() {
  return (
    <Flex gap="middle">
      <Layout style={{ textAlign: "center", lineHeight: "30px" }}>
        <Sider width="20%" style={{ background: "#2265ba" }}>
          <Flex vertical style={{ marginTop: "10px" }}>
            <Link style={{ color: "whitesmoke" }} to={"profile"}>
              Профиль
            </Link>
            <Link style={{ color: "whitesmoke" }} to={"/"}>
              Список задач
            </Link>
          </Flex>
        </Sider>
        <Outlet />
      </Layout>
    </Flex>
  );
}
