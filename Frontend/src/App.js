import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserList from './pages/UserList';
import RegisterForm from './pages/RegisterForm';
import UserDetails from './pages/UserDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/user/:id" element={<UserDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;