import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card } from 'antd';
import SearchBar from '../components/SearchBar';
import UserTable from '../components/UserTable';
import { setSearchTerm } from '../redux/actions';
import { ThemeContext } from '../context/ThemeContext'; // Import ThemeContext

const Users = ({ showForm, setShowForm }) => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.searchTerm);
  const { theme } = useContext(ThemeContext); // Get current theme

  const handleSearchChange = (term) => {
    dispatch(setSearchTerm(term));
  };

  const containerStyle = {
    display: 'flex',
    gap: '24px',
    backgroundColor: theme === 'dark' ? '#121212' : '#f5f7fa',
    padding: '20px',
    minHeight: '100vh',
    color: theme === 'dark' ? '#f0f0f0' : '#000',
    boxSizing: 'border-box',
  };

  const cardStyle = {
    backgroundColor: theme === 'dark' ? '#1e1e1e' : '#fff',
    color: theme === 'dark' ? '#ccc' : '#000',
    border: theme === 'dark' ? '1px solid #333' : '1px solid #e8e8e8',
    borderRadius: '8px',
  };

  return (
    <div style={containerStyle}>
      <div style={{ width: '300px' }}>
        <Card style={cardStyle}>
          <SearchBar searchTerm={searchTerm} setSearchTerm={handleSearchChange} />
        </Card>
      </div>
      <div style={{ flex: 1 }}>
        <UserTable showForm={showForm} setShowForm={setShowForm} searchTerm={searchTerm} />
      </div>
    </div>
  );
};

export default Users;
