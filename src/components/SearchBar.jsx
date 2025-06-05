import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import '../components/SearchBar.css'; 

function SearchBar({ searchTerm, setSearchTerm }) {
  const { theme } = useContext(ThemeContext); 
  const isDark = theme === 'dark'; 

  return (
    <div className={`search-bar-container ${isDark ? 'dark' : 'light'}`}>
      <Input
        id="search-users"
        prefix={<SearchOutlined className={`search-icon ${isDark ? 'dark' : 'light'}`} />}
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={`search-input ${isDark ? 'dark' : 'light'}`}
        allowClear
      />
    </div>
  );
}

export default SearchBar;
