import React, { useState, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { Input, Button } from 'antd';
import { SearchOutlined, CloseOutlined } from '@ant-design/icons';


function SearchBar({ searchTerm, setSearchTerm }) {
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  const toggleSearch = () => {
    setIsVisible(prev => !prev);
    if (isVisible) setSearchTerm('');
  };

  return (
    <div
      style={{
        margin: '16px 0',
        padding: '16px',
        backgroundColor: isDark ? '#121212' : '#f9f9f9',
        borderRadius: '12px',
        boxShadow: isDark
          ? '0 2px 6px rgba(255, 255, 255, 0.05)'
          : '0 2px 6px rgba(0, 0, 0, 0.1)',
        transition: 'background-color 0.3s ease',
        textAlign: 'center',
      }}
    >
      <Button
        icon={isVisible ? <CloseOutlined /> : <SearchOutlined />}
        onClick={toggleSearch}
        style={{
          marginBottom: isVisible ? 12 : 0,
          backgroundColor: isDark ? '#555' : '#1890ff',
          borderColor: isDark ? '#777' : '#1890ff',
          color: '#fff',
        }}
      >
        {isVisible ? 'Close Search' : 'Search Users'}
      </Button>

      {isVisible && (
        <Input
          id="search-users"
          className={isDark ? 'dark-input' : 'light-input'}
          prefix={<SearchOutlined style={{ color: isDark ? '#ccc' : '#888' }} />}
          placeholder="Search users by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            maxWidth: '300px',
            borderRadius: '6px',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
            padding: '6px 12px',
            marginTop: '8px',
            backgroundColor: isDark ? '#1f1f1f' : '#fff',
            color: isDark ? '#fff' : '#000',
            border: isDark ? '1px solid #555' : '1px solid #d9d9d9',
            
          }}
        />
      )}
    </div>
  );
}

export default SearchBar;
