import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { FaPhoneAlt, FaShoppingCart } from 'react-icons/fa';

const Navigation = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="py-3">
      <Container>
        <Navbar.Brand href="#home" className="d-flex align-items-center">
          <div className="brand-logo me-2">
            <span className="text-warning fs-3">🍽️</span>
          </div>
          <div>
            <h3 className="mb-0 fw-bold">SA CATERERS</h3>
            <small className="text-muted">Since 1995</small>
          </div>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home" className="mx-2 fw-medium">Home</Nav.Link>
            <Nav.Link href="#about" className="mx-2 fw-medium">About</Nav.Link>
            <Nav.Link href="#menu" className="mx-2 fw-medium">Menu</Nav.Link>
            <Nav.Link href="#branches" className="mx-2 fw-medium">Branches</Nav.Link>
            <Nav.Link href="#contact" className="mx-2 fw-medium">Contact Us</Nav.Link>
          </Nav>
          
          <div className="d-flex mt-3 mt-lg-0 ms-lg-3">
            <Button variant="outline-warning" className="me-2 d-flex align-items-center">
              <FaPhoneAlt className="me-2" /> +91 9585252070
            </Button>
            <Button variant="warning" className="fw-bold d-flex align-items-center">
              <FaShoppingCart className="me-2" /> Book Now
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;