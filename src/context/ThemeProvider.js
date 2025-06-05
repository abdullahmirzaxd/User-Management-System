import React from 'react';
import { ThemeProvider } from './ThemeContext';
import MainLayout from './components/MainLayout';

function App() {
  return (
    <ThemeProvider>
      <MainLayout />
    </ThemeProvider>
  );
}

export default App;
