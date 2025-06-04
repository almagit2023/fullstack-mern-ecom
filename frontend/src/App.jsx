import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/header/Header';
import Home from './pages/home/Home';
import Create from './pages/create/Create';
import Contact from './pages/contact/Contact';
import UpdateRecords from './components/updateRecords/UpdateRecords';
import LogIn from './pages/login/LogIn';
import SignUp from './pages/signup/SignUp';
import { useState } from 'react';
import RefreshHandler from './components/refreshHandler/RefreshHandler';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <div>
      <Header />
      <RefreshHandler setAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        <Route path="/create" element={<PrivateRoute element={<Create />} />} />
        <Route path="/:id" element={<PrivateRoute element={<UpdateRecords />} />} />
        <Route path="/contact" element={<PrivateRoute element={<Contact />} />} />
      </Routes>
    </div>
  );
}