import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';
import { addUser, deleteUser, updateUser } from '../redux/actions';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Space,
  Popconfirm,
  Pagination,
} from 'antd';
import moment from 'moment';
import { ThemeContext } from '../context/ThemeContext';

const { Option } = Select;

function UserTable({ showForm, setShowForm, searchTerm }) {
  const { theme } = useContext(ThemeContext);
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();

  const [editId, setEditId] = useState(null);
  const [form] = Form.useForm();
  const [page, setPage] = useState(1);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const usersPerPage = 5;


  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const start = (page - 1) * usersPerPage;
  const currentUsers = filteredUsers.slice(start, start + usersPerPage);

  useEffect(() => {
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage) || 1;
    if (page > totalPages) setPage(totalPages);
  }, [filteredUsers.length, page]);


  const onEdit = user => {
    setEditId(user.id);
    setShowForm(true);
    form.setFieldsValue({
      name: user.name,
      email: user.email,
      role: user.role,
      date: user.date ? moment(user.date, 'DD-MM-YYYY') : null,
      status: user.status,
    });
  };

  const onDelete = id => {
    dispatch(deleteUser(id));
  };

  const onFinish = values => {
    const userData = {
      ...values,
      date: values.date ? values.date.format('DD-MM-YYYY') : '',
    };

    if (editId === null) {
      dispatch(addUser({ ...userData, id: Date.now() }));
      const totalAfterAdd = filteredUsers.length + 1;
      setPage(Math.ceil(totalAfterAdd / usersPerPage));
    } else {
      dispatch(updateUser({ ...userData, id: editId }));
      setEditId(null);
    }

    setShowForm(false);
    form.resetFields();
  };


  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: text => <div style={{ textAlign: 'center' }}>{text}</div>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      render: text => <div style={{ textAlign: 'center' }}>{text}</div>,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      filters: [
        { text: 'User', value: 'User' },
        { text: 'Admin', value: 'Admin' },
      ],
      onFilter: (value, record) => record.role === value,
      render: text => <div style={{ textAlign: 'center' }}>{text}</div>,
    },
    {
      title: 'Date Created',
      dataIndex: 'date',
      render: text => <div style={{ textAlign: 'center' }}>{text}</div>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      filters: [
        { text: 'Active', value: 'Active' },
        { text: 'unActive', value: 'unActive' },
      ],
      onFilter: (value, record) => record.status === value,
      render: text => <div style={{ textAlign: 'center' }}>{text}</div>,
    },
    {
      title: 'Actions',
      render: (_, user) => (
        <div style={{ textAlign: 'center' }}>
          <Space>
            <Button type="link" onClick={() => onEdit(user)}>
              Edit
            </Button>
            <Popconfirm
              title="Are you sure to delete this user?"
              onConfirm={() => onDelete(user.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="link" danger>
                Delete
              </Button>
            </Popconfirm>
          </Space>
        </div>
      ),
    },
  ];

  return (
    <div
      style={{
        background: theme === 'dark' ? '#1f1f1f' : '#fff',
        color: theme === 'dark' ? '#fff' : '#000',
        padding: 24,
        borderRadius: 8,
        minHeight: '80vh',
        transition: 'background 0.3s ease, color 0.3s ease',
      }}
    >
      <style>{`
        .dark-row td {
          background-color: #1f1f1f !important;
          color: #fff !important;
          border-color: #333 !important;
        }
        .light-row td {
          background-color: #fff !important;
          color: #000 !important;
          border-color: #f0f0f0 !important;
        }
        .dark-table .ant-table-thead > tr > th {
          background-color: #141414 !important;
          color: #fff !important;
          border-color: #333 !important;
        }
        .light-table .ant-table-thead > tr > th {
          background-color: #fafafa !important;
          color: #000 !important;
          border-color: #f0f0f0 !important;
        }
        .custom-pagination .ant-pagination-item {
          background-color: inherit;
          color: inherit;
          border-color: inherit;
        }
        .custom-pagination .ant-pagination-item-active {
          background-color: #1890ff !important;
          color: #fff !important;
          border-color: #1890ff !important;
        }

        /* Responsive flex containers */
        .flex-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }

        /* Card layout for small screens */
        @media (max-width: 767px) {
          .user-card {
            background: ${theme === 'dark' ? '#2a2a2a' : '#fafafa'};
            border: 1px solid ${theme === 'dark' ? '#444' : '#ddd'};
            border-radius: 8px;
            padding: 16px;
            margin-bottom: 16px;
            box-shadow: ${
              theme === 'dark'
                ? '0 2px 8px rgba(255,255,255,0.05)'
                : '0 2px 8px rgba(0,0,0,0.1)'
            };
          }
          .user-card div {
            margin-bottom: 8px;
          }
          .user-card .actions {
            display: flex;
            gap: 8px;
            justify-content: flex-end;
          }
          /* Hide the table on small screens */
          .responsive-table {
            display: none;
          }
        }

        /* Show table on large screens */
        @media (min-width: 768px) {
          .responsive-table {
            display: table !important;
          }
          .user-card {
            display: none;
          }
        }
      `}</style>

      {/* Modal Form */}
      <Modal
        title={editId ? 'Edit User' : 'Add User'}
        open={showForm}
        onCancel={() => {
          setShowForm(false);
          setEditId(null);
          form.resetFields();
        }}
        footer={null}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter name' }]}
          >
            <Input placeholder="Enter user name" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, type: 'email', message: 'Enter valid email' },
            ]}
          >
            <Input placeholder="Enter user email" />
          </Form.Item>
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: 'Select a role' }]}
          >
            <Select placeholder="Select role">
              <Option value="User">User</Option>
              <Option value="Admin">Admin</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="date"
            label="Date Created"
            rules={[{ required: true, message: 'Select date' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Select status' }]}
          >
            <Select placeholder="Select status">
              <Option value="Active">Active</Option>
              <Option value="unActive">unActive</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
              <Button
                onClick={() => {
                  setShowForm(false);
                  setEditId(null);
                  form.resetFields();
                }}
              >
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Add User Button */}
      <div className="flex-container" style={{ marginBottom: 24 }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setShowForm(true);
            setEditId(null);
            form.resetFields();
          }}
        >
          Add User
        </Button>
      </div>

      {/* Responsive User List: Table for desktop, cards for mobile */}
      {windowWidth >= 768 ? (
        <Table
          className={theme === 'dark' ? 'dark-table' : 'light-table'}
          dataSource={currentUsers}
          columns={columns}
          rowKey="id"
          pagination={false}
          rowClassName={(record, index) =>
            theme === 'dark' ? 'dark-row' : 'light-row'
          }
          locale={{ emptyText: 'No users found' }}
        />
      ) : (
        <div>
          {currentUsers.length === 0 && (
            <p style={{ textAlign: 'center' }}>No users found</p>
          )}
          {currentUsers.map(user => (
            <div key={user.id} className="user-card">
              <div>
                <strong>Name:</strong> {user.name}
              </div>
              <div>
                <strong>Email:</strong> {user.email}
              </div>
              <div>
                <strong>Role:</strong> {user.role}
              </div>
              <div>
                <strong>Date Created:</strong> {user.date}
              </div>
              <div>
                <strong>Status:</strong> {user.status}
              </div>
              <div className="actions">
                <Button type="link" onClick={() => onEdit(user)}>
                  Edit
                </Button>
                <Popconfirm
                  title="Are you sure to delete this user?"
                  onConfirm={() => onDelete(user.id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="link" danger>
                    Delete
                  </Button>
                </Popconfirm>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <Pagination
        className="custom-pagination"
        current={page}
        pageSize={usersPerPage}
        total={filteredUsers.length}
        onChange={p => setPage(p)}
        showSizeChanger={false}
        style={{ marginTop: 16, textAlign: 'center' }}
      />
    </div>
  );
}

export default UserTable;