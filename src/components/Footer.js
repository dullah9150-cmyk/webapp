import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-5">
      <Container>
        <Row className="g-4">
          <Col lg={4}>
            <div className="mb-4">
              <h3 className="text-warning fw-bold">SA CATERERS</h3>
              <p className="text-light mt-3">
                Creating memorable dining experiences since 1995. 
                Your trusted partner for all catering needs.
              </p>
            </div>
            
            <div className="social-icons">
              <h6 className="text-warning mb-3">Follow Us</h6>
              <div className="d-flex gap-3">
                {[FaFacebook, FaInstagram, FaTwitter, FaYoutube].map((Icon, index) => (
                  <a 
                    key={index} 
                    href="#!" 
                    className="social-icon d-flex align-items-center justify-content-center bg-warning text-dark rounded-circle"
                    style={{ width: '40px', height: '40px' }}
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>
          </Col>
          
          <Col lg={2} md={4}>
            <h6 className="text-warning mb-4">Quick Links</h6>
            <ul className="list-unstyled">
              {['Home', 'About', 'Menu', 'Branches', 'Contact'].map((item) => (
                <li key={item} className="mb-2">
                  <a href={`#${item.toLowerCase()}`} className="text-light text-decoration-none">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </Col>
          
          <Col lg={3} md={4}>
            <h6 className="text-warning mb-4">Services</h6>
            <ul className="list-unstyled">
              {[
                'Wedding Catering',
                'Corporate Events',
                'Birthday Parties',
                'Anniversary Celebrations',
                'Bulk Orders'
              ].map((service) => (
                <li key={service} className="mb-2">
                  <a href="#!" className="text-light text-decoration-none">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </Col>
          
          <Col lg={3} md={4}>
            <h6 className="text-warning mb-4">Contact Info</h6>
            <div className="contact-info">
              <p className="d-flex align-items-center mb-3">
                <FaPhone className="text-warning me-2" />
                <span>+91 98765 43210</span>
              </p>
              <p className="d-flex align-items-center mb-3">
                <FaEnvelope className="text-warning me-2" />
                <span>info@SAcaterers.com</span>
              </p>
              <p className="mb-0">
                Head Office: 123 Anna Salai, Chennai<br />
                Tamil Nadu - 600017
              </p>
            </div>
          </Col>
        </Row>
        
        <hr className="my-4 bg-secondary" />
        
        <Row>
          <Col md={6}>
            <p className="mb-0">
              © {new Date().getFullYear()} SA Caterers. All rights reserved.
            </p>
          </Col>
          <Col md={6} className="text-md-end">
            <p className="mb-0">
              <a href="#!" className="text-light text-decoration-none me-3">Privacy Policy</a>
              <a href="#!" className="text-light text-decoration-none">Terms & Conditions</a>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;