// Header.jsx
import React, { useContext } from "react";
import { Layout, Switch } from "antd";
import { PushpinFilled } from "@ant-design/icons";
import { ThemeContext } from "../context/ThemeContext";

const { Header: AntHeader } = Layout;

function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <>
      <style>{`
        .ant-layout-header {
          padding: 0 16px !important;
          height: 64px !important;
          line-height: 64px !important;
          background: ${theme === "dark" ? "#001529" : "#ffffff"} !important;
          color: ${theme === "dark" ? "#fff" : "#000"} !important;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: ${theme === "dark"
            ? "0 2px 6px rgba(0, 0, 0, 0.5)"
            : "0 2px 6px rgba(0, 0, 0, 0.1)"};
          border-bottom: 1px solid ${theme === "dark" ? "#222" : "#eee"};
        }
      `}</style>

      <AntHeader
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1000,
        }}
      >
        <PushpinFilled
          style={{
            fontSize: 32,
            color: theme === "dark" ? "#fff" : "#000",
          }}
        />
        <Switch
          checked={theme === "dark"}
          onChange={toggleTheme}
          checkedChildren="🌙"
          unCheckedChildren="☀️"
        />
      </AntHeader>
    </>
  );
}

export default Header;
