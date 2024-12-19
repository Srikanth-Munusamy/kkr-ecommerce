import React, { useState } from 'react';
import { Navbar, Nav, Container,  Row, Col, Card } from 'react-bootstrap';
import User from './user/User';
import Product from './product/Product';
import Category from './category/Category';
import Subcategory from './subcategory/Subcategory';

const sampleCounts = {
  users: 100,
  products: 150,
  categories: 10,
  subCategories: 20,
  cart: 5,
  orders: 50,
};

const Ecommerce = () => {
  const [activeContent, setActiveContent] = useState('Users');

  const handleButtonClick = (content) => {
    setActiveContent(content);
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">KKR Admin Panel</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link onClick={() => handleButtonClick('Users')}>Users</Nav.Link>
            <Nav.Link onClick={() => handleButtonClick('Categories')}>Categories</Nav.Link>
            <Nav.Link onClick={() => handleButtonClick('SubCategories')}>SubCategories</Nav.Link>
            <Nav.Link onClick={() => handleButtonClick('Products')}>Products</Nav.Link>
            <Nav.Link onClick={() => handleButtonClick('Cart')}>Cart</Nav.Link>
            <Nav.Link onClick={() => handleButtonClick('Orders')}>Orders</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Row>
          <Col md={3}>
            <Card>
              <Card.Body>
                <Card.Title>Users</Card.Title>
                <Card.Text>{sampleCounts.users}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card>
              <Card.Body>
                <Card.Title>Products</Card.Title>
                <Card.Text>{sampleCounts.products}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card>
              <Card.Body>
                <Card.Title>Categories</Card.Title>
                <Card.Text>{sampleCounts.categories}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card>
              <Card.Body>
                <Card.Title>SubCategories</Card.Title>
                <Card.Text>{sampleCounts.subCategories}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <div className="mt-4">
    
    
    

          {activeContent === 'Users' && <User/>}
          {activeContent === 'Categories' && <Category/>}
          {activeContent === 'SubCategories' && <Subcategory/>}
          {activeContent === 'Products' && <Product/>}
          {activeContent === 'Cart' && <h3>Displaying Cart Content</h3>}
          {activeContent === 'Orders' && <h3>Displaying Orders Content</h3>}
        </div>
      </Container>
    </div>
  );
};

export default Ecommerce;




