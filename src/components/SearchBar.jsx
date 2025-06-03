import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

function SearchBar({ searchTerm, setSearchTerm }) {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  return (
    <>
      <style>{`
        .search-bar-container {
          margin: 16px 0;
          padding: 8px 16px;
          border-radius: 12px;
          transition: background-color 0.3s ease, box-shadow 0.3s ease;
          background-color: ${isDark ? '#1e1e1e' : '#ffffff'};
          box-shadow: ${isDark
            ? '0 2px 8px rgba(255, 255, 255, 0.05)'
            : '0 2px 8px rgba(0, 0, 0, 0.1)'};
        }

        .search-input {
          width: 100%;
          border-radius: 8px;
          padding-left: 40px;
          height: 40px;
          font-size: 15px;
          background-color: ${isDark ? '#2b2b2b' : '#f5f5f5'};
          color: ${isDark ? '#fff' : '#000'};
          border: 1px solid ${isDark ? '#444' : '#ddd'};
        }

        .search-input:focus {
          border-color: ${isDark ? '#888' : '#40a9ff'};
          box-shadow: 0 0 0 2px ${isDark ? 'rgba(136,136,136,0.3)' : 'rgba(24,144,255,0.2)'};
          outline: none;
        }

        .search-icon {
          color: ${isDark ? '#aaa' : '#888'};
          font-size: 16px;
        }
      `}</style>

      <div className="search-bar-container">
        <Input
          id="search-users"
          prefix={<SearchOutlined className="search-icon" />}
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
          allowClear
        />
      </div>
    </>
  );
}

export default SearchBar;
