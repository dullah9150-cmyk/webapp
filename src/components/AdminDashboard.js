// src/components/AdminDashboard.js
import React, { useState } from 'react';
import { Container, Card, Button, Tabs, Tab } from 'react-bootstrap';
import { FaSignOutAlt, FaHome, FaCalendarAlt, FaUsers, FaUtensils } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../services/Firebase';
import MenuManagement from './admin/MenuManagement'; // Add this import

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="bg-light min-vh-100">
      {/* Header */}
      <nav className="navbar navbar-dark bg-dark">
        <Container>
          <span className="navbar-brand text-warning fw-bold">
            🍽️ NSK Caterers Admin
          </span>
          <Button variant="outline-warning" onClick={handleLogout}>
            <FaSignOutAlt className="me-2" /> Logout
          </Button>
        </Container>
      </nav>

      <Container className="py-4">
        {/* Tabs Navigation */}
        <div className="mb-4">
          <div className="d-flex border-bottom">
            <Button 
              variant={activeTab === 'dashboard' ? 'warning' : 'outline-secondary'} 
              className={`rounded-0 border-0 ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              Dashboard
            </Button>
            <Button 
              variant={activeTab === 'menu' ? 'warning' : 'outline-secondary'} 
              className={`rounded-0 border-0 ${activeTab === 'menu' ? 'active' : ''}`}
              onClick={() => setActiveTab('menu')}
            >
              <FaUtensils className="me-2" /> Menu Management
            </Button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'dashboard' && (
          <>
            <h2 className="mb-4">Welcome to Admin Dashboard</h2>
            
            <div className="row">
              <div className="col-md-3 mb-3">
                <Card className="h-100">
                  <Card.Body className="text-center">
                    <FaCalendarAlt className="text-primary fs-1 mb-3" />
                    <h5>Bookings</h5>
                    <p className="text-muted">Manage bookings</p>
                  </Card.Body>
                </Card>
              </div>
              
              <div className="col-md-3 mb-3">
                <Card className="h-100">
                  <Card.Body className="text-center">
                    <FaUsers className="text-success fs-1 mb-3" />
                    <h5>Customers</h5>
                    <p className="text-muted">View customers</p>
                  </Card.Body>
                </Card>
              </div>
              
              <div className="col-md-3 mb-3">
                <Card className="h-100">
                  <Card.Body className="text-center">
                    <span className="text-warning fs-1 mb-3">🍽️</span>
                    <h5>Menu</h5>
                    <p className="text-muted">Update menu</p>
                    <Button 
                      variant="outline-warning" 
                      size="sm"
                      className="mt-2"
                      onClick={() => setActiveTab('menu')}
                    >
                      Manage Menu
                    </Button>
                  </Card.Body>
                </Card>
              </div>
              
              <div className="col-md-3 mb-3">
                <Card className="h-100">
                  <Card.Body className="text-center">
                    <FaHome className="text-info fs-1 mb-3" />
                    <Button 
                      variant="link" 
                      className="text-decoration-none"
                      onClick={() => navigate('/')}
                    >
                      Back to Website
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </>
        )}

        {/* Menu Management Tab */}
        {activeTab === 'menu' && <MenuManagement />}
      </Container>
    </div>
  );
};

export default AdminDashboard;