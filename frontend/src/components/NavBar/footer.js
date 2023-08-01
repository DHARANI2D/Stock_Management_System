import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import './footer.css';
const Footer = () => {
  return (
    <footer className="py-4 mt-auto"  >
  <Container>
    <Row className="align-items-center" style={{marginLeft:500}}>
      <Col className="text-right">
        <div className="social-icons">
          <a href="#" target="_blank" rel="noopener noreferrer">
            <FaFacebookF size={20} />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <FaTwitter size={20} style={{ marginLeft: 10 }} />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={20} style={{ marginLeft: 10,marginRight:10 }} />
          </a>
        </div>
      </Col>
    </Row>
  </Container>
</footer>

  );
};

export default Footer;
