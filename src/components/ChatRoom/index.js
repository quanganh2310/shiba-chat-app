import React from "react";
import { Layout } from "antd";
import SideBar from "./SideBar";
import ChatWindow from "./ChatWindow";

const { Header, Footer, Sider, Content } = Layout;

export default function ChatRoom() {
  return (
    <>
      <Layout className="ChatRoom">
        <Sider width={250}>
          <SideBar />
        </Sider>
        <Layout>
          <ChatWindow />
        </Layout>
      </Layout>
    </>
  );
}
