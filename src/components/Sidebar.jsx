import React, { useContext } from "react";
import { Menu, Layout, Drawer } from "antd";
import {
  UserOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import "./Sidebar.css";

const { Sider } = Layout;

function Sidebar({ isMobile, drawerVisible, onClose }) {
  const location = useLocation();
  const { theme } = useContext(ThemeContext);

  const menuItems = [
    {
      key: "/dashboard",
      icon: <DashboardOutlined />,
      label: <Link to="/dashboard">Dashboard</Link>,
    },
    {
      key: "/users",
      icon: <UserOutlined />,
      label: <Link to="/users">Users</Link>,
    },
  ];

  const sidebarMenu = (
    <Menu
      theme={theme}
      mode="inline"
      selectedKeys={[location.pathname]}
      items={menuItems}
      className="custom-menu"
    />
  );

  return (
    <>
      {!isMobile && (
        <Sider width={160} className={`custom-sider ${theme}`}>
          {sidebarMenu}
        </Sider>
      )}

      {isMobile && (
        <Drawer
          title="Menu"
          placement="left"
          onClose={onClose}
          open={drawerVisible}
          bodyStyle={{
            padding: 0,
            backgroundColor: theme === "dark" ? "#282c34" : "#fff",
            color: theme === "dark" ? "white" : "black",
            height: "100%",
          }}
          headerStyle={{
            backgroundColor: theme === "dark" ? "#282c34" : "#fff",
            color: theme === "dark" ? "white" : "black",
          }}
        >
          {sidebarMenu}
        </Drawer>
      )}
    </>
  );
}

export default Sidebar;
