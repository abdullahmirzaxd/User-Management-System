import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { Provider } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';

import store from './redux/store';

import Header from './components/Header';
import Sidebar from './components/Sidebar';

import Users from './pages/Users';
import Dashboard from './pages/Dashboard';

import { ThemeProvider } from './context/ThemeContext';

const { Content } = Layout;

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setDrawerVisible(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Remove body/html spacing
  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.documentElement.style.margin = '0';
    document.documentElement.style.padding = '0';
    document.getElementById('root').style.height = '100%';
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider>
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
                marginLeft: isMobile ? 0 : 160,
                transition: 'margin-left 0.3s ease',
                overflow: 'auto',
                minHeight: 'calc(100vh - 64px)',
              }}
            >
              <Content>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
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
      </ThemeProvider>
    </Provider>
  );
}

export default App;
