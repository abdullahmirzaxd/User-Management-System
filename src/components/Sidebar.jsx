import React, { useState, useEffect, useContext } from 'react';
import { Menu, Layout, Drawer } from 'antd';
import {
  UserOutlined,
  DashboardOutlined,
  SettingOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';  // Import your ThemeContext

const { Sider } = Layout;

function Sidebar() {
  const location = useLocation();
  const { theme } = useContext(ThemeContext);  // Get theme from context

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [drawerVisible, setDrawerVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { key: '/dashboard', icon: <DashboardOutlined />, label: <Link to="/dashboard">Dashboard</Link> },
    { key: '/users', icon: <UserOutlined />, label: <Link to="/users">Users</Link> },
    { key: '/settings', icon: <SettingOutlined />, label: <Link to="/settings">Settings</Link> },
  ];

  const sidebarMenu = (
    <Menu
      theme={theme}  // Use theme from context
      mode="inline"
      selectedKeys={[location.pathname]}
      items={menuItems}
      style={{
        backgroundColor: theme === 'dark' ? '#282c34' : '#fff',
        height: '100%',
        border: 'none',
        boxShadow: 'none',
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
          background-color: #282c34;
          color: white;
        }
        .custom-sider.light {
          background-color: #fff;
          color: black;
          border-right: none !important;
        }
        /* Remove borders/shadows from menu */
        .custom-menu.ant-menu {
          border: none !important;
          box-shadow: none !important;
          background: transparent !important;
          height: 100%;
          padding-top: 8px;
          padding-bottom: 8px;
        }
        /* Style each menu item */
        .custom-menu .ant-menu-item {
          border: none !important;
          box-shadow: none !important;
          margin: 0 !important;
          padding: 12px 24px !important;
          line-height: 1.5;
        }
        .hamburger-icon {
          font-size: 24px;
          margin-top: 20px;
          cursor: pointer;
          color: inherit;
        }
        /* Override ant drawer body background */
        .ant-drawer-body {
          padding: 0 !important;
          transition: background-color 0.3s ease;
        }
      `}</style>

      <Sider
        width={isMobile ? 60 : 160}
        className={`custom-sider ${theme}`}
      >
        {isMobile ? (
          <MenuOutlined
            onClick={() => setDrawerVisible(true)}
            className="hamburger-icon"
          />
        ) : (
          sidebarMenu
        )}
      </Sider>

      <Drawer
        title="Menu"
        placement="left"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        bodyStyle={{
          padding: 0,
          backgroundColor: theme === 'dark' ? '#282c34' : '#fff',
          color: theme === 'dark' ? 'white' : 'black',
        }}
        headerStyle={{
          backgroundColor: theme === 'dark' ? '#282c34' : '#fff',
          color: theme === 'dark' ? 'white' : 'black',
        }}
      >
        {sidebarMenu}
      </Drawer>
    </>
  );
}

export default Sidebar;
