import React, { useContext, useMemo } from "react";
import { Button, Menu } from "antd";
import { TeamOutlined } from "@ant-design/icons/lib/icons";
import { AppContext } from "../../Context/AppProvider";
const { SubMenu } = Menu;

export default function RoomList() {
  const { rooms, setIsAddRoomVisible, setSelectedRoomId } = useContext(AppContext);
  const handleAddRoom = () => {
    setIsAddRoomVisible(true)
  }
  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      style={{ height: "100%", borderRight: 0 }}
    >
      <SubMenu key="sub1" icon={<TeamOutlined />} title="Chat room list">
        {rooms.map((room) => (
          <Menu.Item key={room.id} onClick={() => setSelectedRoomId(room.id)}>{room.name}</Menu.Item>
        ))}
        <Menu.Item key="1">
          <Button onClick={handleAddRoom}>Add new room</Button>
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
}
