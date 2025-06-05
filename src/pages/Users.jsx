import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Typography } from 'antd';
import SearchBar from '../components/SearchBar';
import UserTable from '../components/UserTable';
import { setSearchTerm } from '../redux/actions';
import { ThemeContext } from '../context/ThemeContext';
import './Users.css'; 

const { Title } = Typography;

const Users = ({ showForm, setShowForm }) => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.searchTerm);
  const { theme } = useContext(ThemeContext);

  const handleSearchChange = (term) => {
    dispatch(setSearchTerm(term));
  };

  const containerClass = `users-container ${theme}`;
  const cardClass = `users-card ${theme}`;
  const titleClass = `users-title ${theme}`;
  const tableWrapperClass = `users-table-wrapper ${theme}`;

  return (
    <div className={containerClass}>
      <Card
        className={cardClass}
        bordered={false}
      >
        <Title level={3} className={titleClass}>
          User Management
        </Title>

        <SearchBar searchTerm={searchTerm} setSearchTerm={handleSearchChange} />
      </Card>

      <div className={tableWrapperClass}>
        <UserTable showForm={showForm} setShowForm={setShowForm} searchTerm={searchTerm} />
      </div>
    </div>
  );
};

export default Users;
