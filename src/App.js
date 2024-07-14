// src/App.jsx
import React from 'react';
import Dashboard from './components/Dashboard';
import { Container } from '@mui/material';
import Header from './components/Header';

const App = () => {
  return (
    <Container>
      <Header/>
      <Dashboard />
    </Container>
  );
};

export default App;
