import React from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import { FaAward, FaUsers, FaCalendarCheck, FaCheckCircle } from 'react-icons/fa';

const About = () => {
  return (
    <section id="about" className="py-5">
      <Container>
        <Row className="align-items-center">
          <Col lg={6} className="mb-5 mb-lg-0">
            <div className="position-relative">
              <img 
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="NSK Caterers Team" 
                className="img-fluid rounded shadow-lg"
              />
              <div className="experience-badge bg-warning text-dark p-3 rounded shadow position-absolute bottom-0 start-0 m-4">
                <h3 className="mb-0 fw-bold">25+</h3>
                <p className="mb-0">Years Experience</p>
              </div>
            </div>
          </Col>
          
          <Col lg={6}>
            <h6 className="text-warning fw-bold mb-3">ABOUT US</h6>
            <h2 className="display-5 fw-bold mb-4">
              Serving Happiness <span className="text-warning">Since 1995</span>
            </h2>
            
            <p className="lead mb-4">
              NSK Caterers has been at the forefront of the catering industry for over two decades, 
              delivering exceptional culinary experiences for all occasions. Our journey began with 
              a simple vision: to bring authentic flavors and warm hospitality to every event.
            </p>
            
            <ListGroup variant="flush" className="mb-4">
              {[
                { icon: <FaCheckCircle className="text-warning me-2" />, text: "ISO 9001 Certified Kitchen" },
                { icon: <FaCheckCircle className="text-warning me-2" />, text: "Hygiene First Approach" },
                { icon: <FaCheckCircle className="text-warning me-2" />, text: "Fresh Ingredients Daily" },
                { icon: <FaCheckCircle className="text-warning me-2" />, text: "Professional Chef Team" }
              ].map((item, index) => (
                <ListGroup.Item key={index} className="border-0 ps-0">
                  {item.icon} {item.text}
                </ListGroup.Item>
              ))}
            </ListGroup>
            
            <Row className="mt-4">
              {[
                { icon: <FaAward />, count: "5000+", label: "Events Catered" },
                { icon: <FaUsers />, count: "50+", label: "Chef Team" },
                { icon: <FaCalendarCheck />, count: "25+", label: "Cities Served" }
              ].map((stat, index) => (
                <Col key={index} md={4} className="text-center mb-3">
                  <div className="p-3">
                    <div className="text-warning fs-1 mb-2">{stat.icon}</div>
                    <h4 className="fw-bold">{stat.count}</h4>
                    <p className="text-muted mb-0">{stat.label}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default About;