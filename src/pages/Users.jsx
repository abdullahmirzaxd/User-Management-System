import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card } from 'antd';
import SearchBar from '../components/SearchBar';
import UserTable from '../components/UserTable';
import { setSearchTerm } from '../redux/actions';
import { ThemeContext } from '../context/ThemeContext';

const Users = ({ showForm, setShowForm }) => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.searchTerm);
  const { theme } = useContext(ThemeContext);

  const handleSearchChange = (term) => {
    dispatch(setSearchTerm(term));
  };

  // Outer container with equal padding all around (for consistent spacing)
  const containerStyle = {
    backgroundColor: theme === 'dark' ? '#121212' : '#f5f7fa',
    padding: '20px 40px',  // increased horizontal padding to 40px for better spacing
    minHeight: '100vh',
    color: theme === 'dark' ? '#f0f0f0' : '#000',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  // Card container for SearchBar with fixed max width & full width
  const cardStyle = {
    backgroundColor: theme === 'dark' ? '#1e1e1e' : '#fff',
    color: theme === 'dark' ? '#ccc' : '#000',
    border: theme === 'dark' ? '1px solid #333' : '1px solid #e8e8e8',
    borderRadius: '8px',
    marginBottom: '24px',
    width: '100%',
    maxWidth: '1200px',
    boxSizing: 'border-box',
    padding: '16px 24px',  // add padding inside the card to avoid edge text
  };

  // Wrapper for UserTable with same maxWidth and centered using margin auto
  const tableWrapperStyle = {
    backgroundColor: theme === 'dark' ? '#1e1e1e' : '#fff',
    padding: '16px 24px',
    marginTop: '16px',
    borderRadius: '8px',
    border: theme === 'dark' ? '1px solid #333' : '1px solid #e8e8e8',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    width: '100%',
    maxWidth: '1200px',
    boxSizing: 'border-box',
    marginLeft: 'auto',
    marginRight: 'auto',
  };

  return (
    <div style={containerStyle}>
      <Card style={cardStyle}>
        <SearchBar searchTerm={searchTerm} setSearchTerm={handleSearchChange} />
      </Card>

      <div style={tableWrapperStyle}>
        <UserTable showForm={showForm} setShowForm={setShowForm} searchTerm={searchTerm} />
      </div>
    </div>
  );
};

export default Users;
