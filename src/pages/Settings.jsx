import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

function Settings() {
  const { theme } = useContext(ThemeContext);

 
  const pageStyle = {
    backgroundColor: theme === 'dark' ? '#121212' : '#f5f5f5',
    color: theme === 'dark' ? '#e0e0e0' : '#121212',
    minHeight: '100vh',   
    padding: '10px',
    transition: 'all 0.3s ease',
  };

  return (
    <div style={pageStyle}>
      <h1>Settings Page</h1>

    </div>
  );
}

export default Settings;
