import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Row, Table } from 'react-bootstrap';
import Navbar from '../NavBar/Navbar';
import Slidebar from '../NavBar/Slidebar';

const API_BASE_URL = 'http://localhost:8181/api';

const SalesOrderPage = () => {
  const [salesOrders, setSalesOrders] = useState([]);
  const [salesOrderProduct, setSalesOrderProduct] = useState('');
  const [salesOrderQuantity, setSalesOrderQuantity] = useState('');
  const [salesOrderPrice, setSalesOrderPrice] = useState('');
  const [salesOrderCategory, setSalesOrderCategory] = useState('');
  const [customerName, setCustomerName] = useState('');

  const [salesHistory, setSalesHistory] = useState([]);

  useEffect(() => {
    fetchSalesOrders();
    fetchSalesHistory();
  }, []);

  const fetchSalesOrders = async () => {
    try {
      const authToken = localStorage.getItem('token');
      if (!authToken) {
        console.error('User is not authenticated. Redirect to login or show error message.');
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };

      const salesOrdersResponse = await axios.get(`${API_BASE_URL}/expenses`, config);
      setSalesOrders(salesOrdersResponse.data);
    } catch (error) {
      console.error('Error fetching sales orders:', error);
    }
  };

  const fetchSalesHistory = async () => {
    try {
      const authToken = localStorage.getItem('token');
      if (!authToken) {
        console.error('User is not authenticated. Redirect to login or show error message.');
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };

      const salesHistoryResponse = await axios.get(`${API_BASE_URL}/expenses`, config);
      setSalesHistory(salesHistoryResponse.data);
    } catch (error) {
      console.error('Error fetching sales history:', error);
    }
  };

  const addSalesOrder = async () => {
    try {
      const authToken = localStorage.getItem('token');
      if (!authToken) {
        console.error('User is not authenticated. Redirect to login or show error message.');
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };

      const currentDate = getCurrentDateAndTime();

      const newOrder = {
        product: salesOrderProduct,
        quantity: parseInt(salesOrderQuantity, 10),
        price: parseFloat(salesOrderPrice),
        category: salesOrderCategory,
        customer: customerName,
        date: currentDate,
      };

      await axios.post(`${API_BASE_URL}/expenses`, newOrder, config);
      fetchSalesOrders();

      // Clear input fields
      setSalesOrderProduct('');
      setSalesOrderQuantity('');
      setSalesOrderPrice('');
      setSalesOrderCategory('');
      setCustomerName('');
    } catch (error) {
      console.error('Error adding sales order:', error);
    }
  };

  const getCurrentDateAndTime = () => {
    const now = new Date();
    return now.toISOString();
  };

  return (
    <div style={{ marginLeft: '30px' }}>
      <Container fluid>
        <Row>
          <Col md={1}>
            <Slidebar />
          </Col>
          <Col>
            <Navbar />
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
            <h1>Sales Orders</h1>
          </Col>
        </Row>
        <Row>
          <Col>
        
                <Table  bordered className="sales-orders-table">
                  <thead>
                    <tr>
                   
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Category</th>
                      <th>Customer Name</th>
                      <th>Add</th>
                    </tr>
                  </thead>
                  <tbody>
                  
                    <tr>
                    
                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                        <input
                          type="text"
                          placeholder="Product"
                          value={salesOrderProduct}
                          onChange={(e) => setSalesOrderProduct(e.target.value)}
                          style={{ border: 'none', outline: 'none', textAlign: 'center' }}
                        />
                      </td>
                      <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                        <input
                          type="number"
                          placeholder="Quantity"
                          value={salesOrderQuantity}
                          onChange={(e) => setSalesOrderQuantity(e.target.value)}
                          style={{ border: 'none', outline: 'none', textAlign: 'center' }}
                          inputMode="numeric"
                        />
                      </td>
                      <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                        <input
                          type="number"
                          placeholder="Price"
                          value={salesOrderPrice}
                          onChange={(e) => setSalesOrderPrice(e.target.value)}
                          style={{ border: 'none', outline: 'none', textAlign: 'center' }}
                        />
                      </td>
                      <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                        <Form.Group controlId="category">
                          <Form.Control
                            as="select"
                            value={salesOrderCategory}
                            onChange={(e) => setSalesOrderCategory(e.target.value)}
                            style={{ border: 'none', outline: 'none', textAlign: 'center' }}
                          >
                            <option value="Electronics">Electronics</option>
                            <option value="Clothing">Clothing</option>
                            <option value="Furniture">Furniture</option>
                            {/* Add more categories as needed */}
                          </Form.Control>
                        </Form.Group>
                      </td>
                      <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                        <input
                          type="text"
                          placeholder="Customer Name"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          style={{ border: 'none', outline: 'none', textAlign: 'center' }}
                        />
                      </td>
                      <td>
                        <Button variant="success" onClick={addSalesOrder}>
                          Add
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <h2>Sales History</h2>
            <Table striped bordered className="sales-history-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Customer Name</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {salesHistory.map((historyItem, index) => (
                  <tr key={index}>
                    <td>{historyItem.id}</td>
                    <td>{historyItem.product}</td>
                    <td>{historyItem.quantity}</td>
                    <td>${historyItem.price.toFixed(2)}</td>
                    <td>{historyItem.category}</td>
                    <td>{historyItem.customer}</td>
                    <td>{historyItem.date}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SalesOrderPage;
