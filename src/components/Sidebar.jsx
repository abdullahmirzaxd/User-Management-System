import React, { useContext } from "react";
import { Menu, Layout, Drawer } from "antd";
import {
  UserOutlined,
  DashboardOutlined,
 
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

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
      style={{
        backgroundColor: theme === "dark" ? "#282c34" : "#fff",
        height: "100%",
        border: "none",
        boxShadow: "none",
        paddingTop: 8,
        paddingBottom: 8,
      }}
      className="custom-menu"
    />
  );

  return (
    <>
      <style>{`
        .custom-sider {
          height: calc(100vh - 64px);
          position: fixed;
          top: 64px;
          left: 0;
          bottom: 0;
          overflow-y: auto;
          z-index: 900;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          transition: background-color 0.3s ease;
          padding-top: 16px;
          padding-bottom: 16px;
          box-shadow: 2px 0 6px rgba(0,0,0,0.2);
        }
        .custom-sider.dark {
          background-color: #001529;
          color: white;
        }
        .custom-sider.light {
          background-color: #fff;
          color: black;
          border-right: none !important;
        }
        .custom-menu.ant-menu {
          border: none !important;
          box-shadow: none !important;
          background: transparent !important;
          height: 100%;
          padding-top: 8px;
          padding-bottom: 8px;
        }
        .custom-menu .ant-menu-item {
          border: none !important;
          box-shadow: none !important;
          margin: 0 !important;
          padding: 12px 24px !important;
          line-height: 1.5;
        }
      `}</style>

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
