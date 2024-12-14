import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  UserOutlined,
  InboxOutlined,
  CarOutlined,
  CheckSquareOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

const items = [
  {
    key: "/",
    icon: <DashboardOutlined className="text-lg" />,
    label: "Dashboard",
  },
  {
    key: "management",
    label: "Management",
    icon: <InboxOutlined className="text-lg" />,
    children: [
      {
        key: "/users",
        label: "Users",
        icon: <UserOutlined className="text-base" />,
      },
      {
        key: "/inventory",
        label: "Inventory",
        icon: <InboxOutlined className="text-base" />,
      },
      {
        key: "/vehicles",
        label: "Vehicles",
        icon: <CarOutlined className="text-base" />,
      },
      {
        key: "/tasks",
        label: "Tasks",
        icon: <CheckSquareOutlined className="text-base" />,
      },
    ],
  },
];

const SideNav = ({ collapsed, setCollapsed }) => {
  const location = useLocation();
  const selectedKey = location.pathname;
  //   const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuClick = ({ key }) => {
    navigate(key);
  };

  return (
    <div
      className={`md:h-[100dvh] px-2 bg-gray-800 text-white shadow-lg ${
        collapsed ? "w-24" : "w-64"
      } transition-all duration-300`}
    >
      <div className="flex items-center justify-between p-0 md:px-4 md:py-4">
        <Button
          type="normal"
          onClick={toggleCollapsed}
          className="text-white hover:bg-gray-700 hidden md:block"
          icon={
            collapsed ? (
              <MenuUnfoldOutlined className="text-white" />
            ) : (
              <MenuFoldOutlined className="text-white" />
            )
          }
        />
        {!collapsed && <h1 className="text-xl hidden md:block font-bold">LogistiSync</h1>}
      </div>

      <Menu
        defaultSelectedKeys={selectedKey}
        defaultOpenKeys={["management"]}
        mode="inline"
        inlineCollapsed={collapsed}
        items={items}
        onClick={handleMenuClick}
        className="bg-gray-800 border-none text-white"
        theme="dark"
      />
    </div>
  );
};

export default SideNav;
