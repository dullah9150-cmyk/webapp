import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaMapMarkerAlt, FaPhone, FaClock, FaCar } from 'react-icons/fa';

const Branches = () => {
  const branches = [
    {
      id: 1,
      city: "Chennai",
      address: "123 Anna Salai, T Nagar, Chennai - 600017",
      phone: "+91 98765 43210",
      timing: "7:00 AM - 11:00 PM",
      image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      city: "Bangalore",
      address: "456 MG Road, Brigade Road, Bangalore - 560001",
      phone: "+91 98765 43211",
      timing: "7:00 AM - 11:00 PM",
      image:"https://images.unsplash.com/photo-1596176530529-78163a4f7af2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      city: "Hyderabad",
      address: "789 Jubilee Hills, Hyderabad - 500033",
      phone: "+91 98765 43212",
      timing: "7:00 AM - 11:00 PM",
      image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 4,
      city: "Coimbatore",
      address: "321 RS Puram, Coimbatore - 641002",
      phone: "+91 98765 43213",
      timing: "7:00 AM - 10:30 PM",
      image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    }
  ];

  return (
    <section id="branches" className="py-5 bg-dark">
      <Container>
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold mb-3 text-white">Our Branches</h2>
          <p className="text-light lead">Visit us at any of our conveniently located branches</p>
          <div className="underline bg-warning mx-auto"></div>
        </div>
        
        <Row className="g-4">
          {branches.map((branch) => (
            <Col key={branch.id} md={6} lg={3}>
              <Card className="h-100 border-0 shadow-lg overflow-hidden">
                <div className="position-relative">
                  <Card.Img 
                    variant="top" 
                    src={branch.image} 
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="position-absolute top-0 start-0 bg-dark bg-opacity-75 text-white p-2">
                    <h6 className="mb-0 text-warning fw-bold">{branch.city}</h6>
                  </div>
                </div>
                
                <Card.Body className="bg-dark text-white">
                  <div className="branch-details">
                    <div className="d-flex align-items-start mb-3">
                      <FaMapMarkerAlt className="text-warning mt-1 me-2 flex-shrink-0" />
                      <div>
                        <h6 className="text-warning mb-1">Address</h6>
                        <p className="mb-0 small text-light">{branch.address}</p>
                      </div>
                    </div>
                    
                    <div className="d-flex align-items-center mb-3">
                      <FaPhone className="text-warning me-2 flex-shrink-0" />
                      <div>
                        <h6 className="text-warning mb-1">Phone</h6>
                        <p className="mb-0 small text-light">{branch.phone}</p>
                      </div>
                    </div>
                    
                    <div className="d-flex align-items-center mb-4">
                      <FaClock className="text-warning me-2 flex-shrink-0" />
                      <div>
                        <h6 className="text-warning mb-1">Timing</h6>
                        <p className="mb-0 small text-light">{branch.timing}</p>
                      </div>
                    </div>
                    
                    <div className="d-flex gap-2">
                      <Button 
                        variant="warning" 
                        size="sm"
                        className="flex-grow-1 d-flex align-items-center justify-content-center"
                        onClick={() => window.location.href = `tel:${branch.phone.replace(/\s+/g, '')}`}
                      >
                        <FaPhone className="me-1" /> Call
                      </Button>
                      <Button 
                        variant="outline-light" 
                        size="sm"
                        className="flex-grow-1 d-flex align-items-center justify-content-center"
                        onClick={() => {
                          const address = encodeURIComponent(`${branch.city} ${branch.address}`);
                          window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank');
                        }}
                      >
                        <FaCar className="me-1" /> Map
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        
        <div className="text-center mt-5">
          <div className="bg-warning text-dark p-4 rounded-3 shadow">
            <h4 className="fw-bold mb-3">Catering Services Across India</h4>
            <p className="mb-0">
              We provide catering services for weddings, corporate events, and private parties 
              in all major cities across India. Contact us for bulk orders and special events.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Branches;