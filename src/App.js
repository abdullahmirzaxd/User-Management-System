import React, { useState } from 'react';
import { Layout } from 'antd';
import { Provider } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';

import store from './redux/store';

import Header from './components/Header';
import Sidebar from './components/Sidebar';

import Users from './pages/Users';
import Dashboard from './pages/Dashboard'; 
import Settings from './pages/Settings';    

const { Content } = Layout;

function App() {
  const [showForm, setShowForm] = useState(false);

  return (
    <Provider store={store}>
  <Layout>
    <Header />
    <Layout>
      <Sidebar />
      <Layout
        style={{
          marginBottom: -8,
          marginLeft: 152,
          marginRight: -8,
          marginTop: 56,
          minHeight: 'calc(100vh - 64px)',
          background: '#f5f5f5',
          padding: 0,
          overflow: 'auto',
        }}
      >
        <Content>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route
              path="/users"
              element={<Users showForm={showForm} setShowForm={setShowForm} />}
            />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  </Layout>
</Provider>

  );
}

export default App;
