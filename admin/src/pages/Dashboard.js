// src/pages/Dashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Container className="mt-4">
      <h2>Dashboard</h2>
      <Row className="mt-4">
        <Col md={6} className="mb-3">
          <Button 
            variant="primary" 
            className="w-100"
            onClick={() => handleNavigation('/ecommerce')}
          >
            Go to Ecommerce
          </Button>
        </Col>
        <Col md={6} className="mb-3">
          <Button 
            variant="secondary" 
            className="w-100"
            onClick={() => handleNavigation('/intern')}
          >
            Go to Intern
          </Button>
        </Col>
        <Col md={6} className="mb-3">
          <Button 
            variant="success" 
            className="w-100"
            onClick={() => handleNavigation('/workshop')}
          >
            Go to Workshop
          </Button>
        </Col>
        <Col md={6} className="mb-3">
          <Button 
            variant="info" 
            className="w-100"
            onClick={() => handleNavigation('/domain')}
          >
            Go to Domain Manager
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
