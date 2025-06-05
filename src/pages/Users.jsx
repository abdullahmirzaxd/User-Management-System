import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Typography } from 'antd';
import SearchBar from '../components/SearchBar';
import UserTable from '../components/UserTable';
import { setSearchTerm } from '../redux/actions';
import { ThemeContext } from '../context/ThemeContext';

const { Title } = Typography;

const Users = ({ showForm, setShowForm }) => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.searchTerm);
  const { theme } = useContext(ThemeContext);

  const handleSearchChange = (term) => {
    dispatch(setSearchTerm(term));
  };

  // Outer container: center content, add responsive padding, and full height
  const containerStyle = {
    backgroundColor: theme === 'dark' ? '#121212' : '#f5f7fa',
    padding: '30px 20px',
    minHeight: '100vh',
    color: theme === 'dark' ? '#f0f0f0' : '#000',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  // Card container for SearchBar: modern rounded card with subtle shadow and padding
  const cardStyle = {
    backgroundColor: theme === 'dark' ? '#1f1f1f' : '#fff',
    color: theme === 'dark' ? '#ccc' : '#000',
    border: theme === 'dark' ? '1px solid #333' : '1px solid #e8e8e8',
    borderRadius: 12,
    marginBottom: 32,
    width: '100%',
    maxWidth: 1100,
    boxSizing: 'border-box',
    padding: 24,
    boxShadow: theme === 'dark'
      ? '0 4px 12px rgba(0,0,0,0.8)'
      : '0 4px 12px rgba(0,0,0,0.1)',
    transition: 'box-shadow 0.3s ease',
  };

  // Add subtle hover effect on card for better interactivity
  const cardHoverStyle = {
    boxShadow: theme === 'dark'
      ? '0 6px 20px rgba(0,0,0,0.9)'
      : '0 6px 20px rgba(0,0,0,0.15)',
  };

  // Wrapper for UserTable with similar styling, spacing, and shadow
  const tableWrapperStyle = {
    backgroundColor: theme === 'dark' ? '#1f1f1f' : '#fff',
    padding: 24,
    borderRadius: 12,
    border: theme === 'dark' ? '1px solid #333' : '1px solid #e8e8e8',
    boxShadow: theme === 'dark'
      ? '0 4px 12px rgba(0,0,0,0.8)'
      : '0 4px 12px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: 1100,
    boxSizing: 'border-box',
    marginLeft: 'auto',
    marginRight: 'auto',
  };

  return (
    <div style={containerStyle}>
      <Card
        style={cardStyle}
        onMouseEnter={(e) => (e.currentTarget.style.boxShadow = cardHoverStyle.boxShadow)}
        onMouseLeave={(e) => (e.currentTarget.style.boxShadow = cardStyle.boxShadow)}
        bordered={false}
      >
        <Title level={3} style={{ color: theme === 'dark' ? '#1890ff' : '#096dd9', marginBottom: 16 }}>
          User Management
        </Title>

        <SearchBar searchTerm={searchTerm} setSearchTerm={handleSearchChange} />
      </Card>

      <div style={tableWrapperStyle}>
        <UserTable showForm={showForm} setShowForm={setShowForm} searchTerm={searchTerm} />
      </div>
    </div>
  );
};

export default Users;
