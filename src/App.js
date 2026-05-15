// src/App.js
import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Navigation from './components/Navigation';
import Home from './components/Home';
import About from './components/About';
import Menu from './components/Menu';
import Branches from './components/Branches';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
          <>
            <Navigation />
            <Home />
            <About />
            <Menu />
            <Branches />
            <Contact />
            <Footer />
          </>
        } />
        
        {/* Admin Login */}
        <Route path="/login" element={<Login />} />
        
        {/* Protected Admin Route */}
        <Route path="/admin/dashboard" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;