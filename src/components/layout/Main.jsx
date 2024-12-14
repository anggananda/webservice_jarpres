import React, { useState } from "react";
import { Layout, Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import SideNav from "./SideNav";

const { Header, Sider, Footer, Content } = Layout;

const MainLayout = ({ children }) => {
  const [isDrawer, setIsDrawer] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const handleDrawer = () => {
    setIsDrawer((prev) => !prev);
  };

  return (
    <Layout className="h-[100vh]">
      <Drawer
        open={isDrawer}
        onClose={handleDrawer}
        placement="left"
        styles={{
          body: { padding: 0, backgroundColor: "#1F2937" }, // Tailwind bg-gray-800
          header: { backgroundColor: "#1F2937", color: "white" }, // Optional: Set header background color to match
        }}
        width={250}
        title={
          <h1 className="text-xl font-bold">LogistiSync</h1>
        }
      >
        <div className="h-full">
          <SideNav collapsed={collapsed} setCollapsed={setCollapsed} />
        </div>
      </Drawer>

      {/* Sidebar */}
      <Sider
        className="transition-all duration-300 bg-gray-800 text-white shadow-lg hidden md:block"
        width={250}
        collapsedWidth={96}
        breakpoint="lg"
        collapsed={collapsed}
      >
        <SideNav collapsed={collapsed} setCollapsed={setCollapsed} />
      </Sider>

      {/* Main content area */}
      <Layout className="transition-all duration-300">
        {/* Header */}
        <Header className="bg-gray-800 text-white px-6 shadow-md flex justify-between items-center ">
          {collapsed && (
            <h1 className="text-lg font-semibold hidden md:block">
              LogistiSync
            </h1>
          )}
          <h1 className="text-lg font-semibold block md:hidden">LogistiSync</h1>
          <div className="block md:hidden">
            <Button onClick={handleDrawer} icon={<MenuOutlined />} />
          </div>
        </Header>

        {/* Content */}
        <Content className="p-6 bg-gray-100 overflow-auto">{children}</Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
