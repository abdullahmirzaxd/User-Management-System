import React, { useState, useEffect } from 'react';
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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setDrawerVisible(false); // close drawer on desktop resize
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Provider store={store}>
      <Layout style={{ minHeight: '100vh' }}>
        <Header 
          isMobile={isMobile} 
          onHamburgerClick={() => setDrawerVisible(true)} 
        />
        <Layout style={{ paddingTop: 64 }}>
          <Sidebar 
            isMobile={isMobile} 
            drawerVisible={drawerVisible} 
            onClose={() => setDrawerVisible(false)} 
          />
          <Layout
            style={{
              marginLeft: isMobile ? 0 : 160,  // sidebar width on desktop only
              marginBottom: 16,
              transition: 'margin-left 0.3s ease',
              background: '#f5f5f5',
              overflow: 'auto',
              padding: '16px',
              minHeight: 'calc(100vh - 64px - 16px)',
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
