import Title from "antd/es/typography/Title";

export default function UserPage() {
  const userName = "Незнакомец";

  return <Title level={3}>{`Привет  ${userName}`}</Title>;
}
