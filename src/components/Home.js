import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaStar, FaUtensils, FaCalendarAlt } from 'react-icons/fa';

const Home = () => {
  return (
    <section id="home" className="hero-section position-relative">
      <div className="hero-overlay"></div>
      <Container className="position-relative py-5" style={{ zIndex: 1 }}>
        <Row className="align-items-center min-vh-80">
          <Col lg={6} className="text-white py-5">
            <h6 className="text-warning mb-3">
              <FaStar className="me-2" /> Premium Catering Service
            </h6>
            <h1 className="display-3 fw-bold mb-4">
              Taste the <span className="text-warning">Perfection</span> in Every Bite
            </h1>
            <p className="lead mb-4">
              NSK Caterers brings you decades of culinary excellence. From intimate gatherings 
              to grand celebrations, we create unforgettable dining experiences with authentic flavors 
              and impeccable service.
            </p>
            
            <div className="d-flex flex-wrap gap-3 mb-4">
              <div className="d-flex align-items-center">
                <FaUtensils className="text-warning fs-4 me-2" />
                <span>500+ Menu Items</span>
              </div>
              <div className="d-flex align-items-center">
                <FaCalendarAlt className="text-warning fs-4 me-2" />
                <span>25+ Years Experience</span>
              </div>
            </div>
            
            <div className="d-flex flex-wrap gap-3">
              <Button variant="warning" size="lg" className="fw-bold px-4">
                Book Your Event
              </Button>
              <Button variant="outline-light" size="lg" className="px-4">
                View Menu
              </Button>
            </div>
          </Col>
          
          <Col lg={6} className="py-5">
            <div className="hero-image-container">
              <img 
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Catering Setup" 
                className="img-fluid rounded shadow-lg"
              />
              <div className="floating-card bg-dark text-white p-3 rounded shadow">
                <h5 className="text-warning">Event Special</h5>
                <p className="mb-0">Get 15% off on wedding bookings</p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Home;