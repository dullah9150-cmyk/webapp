import React from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const Contact = () => {
  return (
    <section id="contact" className="py-5">
      <Container>
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold text-dark mb-3">Contact Us</h2>
          <p className="text-muted lead">Get in touch for bookings and inquiries</p>
          <div className="underline mx-auto"></div>
        </div>
        
        <Row className="g-4">
          <Col lg={5}>
            <Card className="border-0 shadow h-100">
              <Card.Body className="p-4">
                <h4 className="text-warning fw-bold mb-4">Get In Touch</h4>
                
                <div className="contact-info mb-4">
                  {[
                    { icon: <FaPhone />, title: "Phone", info: "+91 98765 43210", desc: "Mon-Sun, 7AM-11PM" },
                    { icon: <FaEnvelope />, title: "Email", info: "info@nskcaterers.com", desc: "Quick response guaranteed" },
                    { icon: <FaMapMarkerAlt />, title: "Head Office", info: "123 Anna Salai, Chennai", desc: "Tamil Nadu - 600017" },
                    { icon: <FaClock />, title: "Business Hours", info: "7:00 AM - 11:00 PM", desc: "Open all days" }
                  ].map((item, index) => (
                    <div key={index} className="d-flex mb-4">
                      <div className="contact-icon bg-warning text-dark rounded-circle p-3 me-3">
                        {item.icon}
                      </div>
                      <div>
                        <h6 className="fw-bold mb-1">{item.title}</h6>
                        <p className="mb-1">{item.info}</p>
                        <small className="text-muted">{item.desc}</small>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4">
                  <h6 className="fw-bold mb-3">Follow Us</h6>
                  <div className="d-flex gap-3">
                    {['Facebook', 'Instagram', 'Twitter', 'YouTube'].map((social) => (
                      <Button key={social} variant="outline-dark" size="sm">
                        {social}
                      </Button>
                    ))}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col lg={7}>
            <Card className="border-0 shadow">
              <Card.Body className="p-4">
                <h4 className="text-warning fw-bold mb-4">Book Your Event</h4>
                
                <Form>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Full Name *</Form.Label>
                        <Form.Control type="text" placeholder="Enter your name" required />
                      </Form.Group>
                    </Col>
                    
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Phone Number *</Form.Label>
                        <Form.Control type="tel" placeholder="Enter your phone" required />
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Email Address *</Form.Label>
                    <Form.Control type="email" placeholder="Enter your email" required />
                  </Form.Group>
                  
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Event Type</Form.Label>
                        <Form.Select>
                          <option>Select Event Type</option>
                          <option>Wedding</option>
                          <option>Corporate Event</option>
                          <option>Birthday Party</option>
                          <option>Anniversary</option>
                          <option>Other</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Event Date</Form.Label>
                        <Form.Control type="date" />
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Number of Guests</Form.Label>
                    <Form.Select>
                      <option>Select Number of Guests</option>
                      <option>50-100</option>
                      <option>100-250</option>
                      <option>250-500</option>
                      <option>500-1000</option>
                      <option>1000+</option>
                    </Form.Select>
                  </Form.Group>
                  
                  <Form.Group className="mb-4">
                    <Form.Label>Special Requirements</Form.Label>
                    <Form.Control 
                      as="textarea" 
                      rows={4} 
                      placeholder="Tell us about your event requirements..."
                    />
                  </Form.Group>
                  
                  <div className="d-grid">
                    <Button variant="warning" size="lg" type="submit" className="fw-bold">
                      Submit Booking Request
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Contact;