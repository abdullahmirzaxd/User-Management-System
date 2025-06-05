import React, { useContext } from "react";
import { Layout, Switch } from "antd";
import { MenuOutlined, AntDesignOutlined } from "@ant-design/icons";
import { ThemeContext } from "../context/ThemeContext";
import "./Header.css"; // Import new CSS file

const { Header: AntHeader } = Layout;

function Header({ isMobile, onHamburgerClick }) {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <AntHeader className={`custom-header ${theme}`}>
      {/* Left side */}
      <div className="header-left">
        {isMobile && (
          <MenuOutlined
            className="hamburger-icon"
            onClick={onHamburgerClick}
            aria-label="Open navigation menu"
          />
        )}
        <AntDesignOutlined
          className="ant-design-logo"
          aria-label="Ant Design Logo"
        />
      </div>

      {/* Right side - Theme toggle switch */}
      <Switch
        className="theme-switch"
        checked={theme === "dark"}
        onChange={toggleTheme}
        aria-label="Toggle theme"
      />
    </AntHeader>
  );
}

export default Header;
