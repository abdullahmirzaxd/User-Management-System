import React, { useContext } from "react";
import { Layout, Switch } from "antd";
import { PushpinFilled } from "@ant-design/icons";
import { ThemeContext } from "../context/ThemeContext"; 
const { Header: AntHeader } = Layout;

function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext); 
  return (
    <AntHeader
      style={{
        background: theme === "dark" ? "#001529" : "#ffffff",
        color: theme === "dark" ? "#fff" : "#000",
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 64,
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
        borderBottom: theme === "dark" ? "1px solid #222" : "1px solid #eee",
      }}
    >
      <PushpinFilled style={{ fontSize: 32, color: theme === "dark" ? "#fff" : "#000" }} />
      <Switch
        checked={theme === "dark"}
        onChange={toggleTheme}
        checkedChildren="🌙"
        unCheckedChildren="☀️"
      />
    </AntHeader>
  );
}

export default Header;
