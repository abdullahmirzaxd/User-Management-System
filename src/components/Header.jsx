import React, { useContext } from "react";
import { Layout, Switch } from "antd";
import { MenuOutlined, AntDesignOutlined } from "@ant-design/icons";
import { ThemeContext } from "../context/ThemeContext";

const { Header: AntHeader } = Layout;

function Header({ isMobile, onHamburgerClick }) {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <>
      <style>{`
        .ant-layout-header {
          position: fixed !important;
          top: 0;
          left: 0;
          width: 100%;
          height: 64px !important;
          line-height: 64px !important;
          padding: 0 16px !important;
          z-index: 1000 !important;
          background: ${theme === "dark" ? "#001529" : "#fff"} !important;
          color: ${theme === "dark" ? "#fff" : "#000"} !important;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: ${
            theme === "dark"
              ? "0 2px 6px rgba(0, 0, 0, 0.5)"
              : "0 2px 6px rgba(0, 0, 0, 0.1)"
          };
          border-bottom: 1px solid ${theme === "dark" ? "#222" : "#eee"};
        }
        .hamburger-icon {
          font-size: 24px;
          cursor: pointer;
          margin-right: 12px;
          color: ${theme === "dark" ? "#fff" : "#000"};
        }
        .ant-design-logo {
          font-size: 28px;
          color: ${theme === "dark" ? "#1890ff" : "#1890ff"};
          cursor: default;
          user-select: none;
          transition: color 0.3s ease;
        }
        /* Responsive tweaks */
        @media (max-width: 768px) {
          .ant-design-logo {
            font-size: 24px;
          }
        }
      `}</style>

      <AntHeader>
        {/* Left side */}
        <div style={{ display: "flex", alignItems: "center" }}>
          {isMobile && (
            <MenuOutlined
              className="hamburger-icon"
              onClick={onHamburgerClick}
              aria-label="Open navigation menu"
            />
          )}
          <AntDesignOutlined className="ant-design-logo" aria-label="Ant Design Logo" />
        </div>

        {/* Right side */}
        <Switch
          checked={theme === "dark"}
          onChange={toggleTheme}
          checkedChildren="🌙"
          unCheckedChildren="☀️"
          aria-label="Toggle theme"
        />
      </AntHeader>
    </>
  );
}

export default Header;
