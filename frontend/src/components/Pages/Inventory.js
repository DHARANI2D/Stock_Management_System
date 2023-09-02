import axios from 'axios';
import 'jspdf-autotable';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Row, Table } from 'react-bootstrap';
import Navbar from '../NavBar/Navbar';
import Slidebar from '../NavBar/Slidebar';

const API_BASE_URL = 'http://localhost:8181/api';

const InventoryManagementPage = () => {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [purchaseOrderProduct, setPurchaseOrderProduct] = useState('');
  const [purchaseOrderQuantity, setPurchaseOrderQuantity] = useState('');
  const [purchaseOrderPrice, setPurchaseOrderPrice] = useState('');
  const [purchaseOrderCategory, setPurchaseOrderCategory] = useState('');
  const [productName, setProductName] = useState('');

  const [productHistory, setProductHistory] = useState([]);

  useEffect(() => {
    fetchData();
    fetchProductHistory();
  }, []);

  const fetchData = async () => {
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

      const purchaseOrdersResponse = await axios.get(`${API_BASE_URL}/inventory/purchase`, config);
      setPurchaseOrders(purchaseOrdersResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchProductHistory = async () => {
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

      const productHistoryResponse = await axios.get(`${API_BASE_URL}/inventory/all`, config);
      setProductHistory(productHistoryResponse.data);
    } catch (error) {
      console.error('Error fetching product history:', error);
    }
  };

  const addPurchaseOrder = async () => {
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
        product: purchaseOrderProduct,
        quantity: parseInt(purchaseOrderQuantity, 10),
        price: parseFloat(purchaseOrderPrice),
        category: purchaseOrderCategory,
        name: productName,
        date: currentDate,
      };

      await axios.post(`${API_BASE_URL}/inventory/purchase`, newOrder, config);
      fetchData();

      // Clear input fields
      setPurchaseOrderProduct('');
      setPurchaseOrderQuantity('');
      setPurchaseOrderPrice('');
      setPurchaseOrderCategory('');
      setProductName('');
    } catch (error) {
      console.error('Error adding purchase order:', error);
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
            <h1>Purchase Orders</h1>
          </Col>
        </Row>
        <Row>
          <Col>
                <Table  bordered className="purchase-orders-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Category</th>
                      <th>Name of the Product</th>
                      <th>Add</th>
                    </tr>
                  </thead>
                  <tbody>
                    {purchaseOrders.map((order, index) => (
                      <tr key={index}>
                        <td>{order.product}</td>
                        <td>{order.quantity}</td>
                        <td>${order.price.toFixed(2)}</td>
                        <td>{order.category}</td>
                        <td>{order.name}</td>
                      </tr>
                    ))}
                    <tr>
                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                        <input
                          type="text"
                          placeholder="Product"
                          value={purchaseOrderProduct}
                          onChange={(e) => setPurchaseOrderProduct(e.target.value)}
                          style={{ border: 'none', outline: 'none', textAlign: 'center' }}

                        />
                      </td>
                      <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                        <input
                          type="number"
                          placeholder="Quantity"
                          value={purchaseOrderQuantity}
                          style={{ border: 'none', outline: 'none', textAlign: 'center' }}
                          onChange={(e) => setPurchaseOrderQuantity(e.target.value)}
                          inputMode="numeric"
                        />
                      </td>
                      <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                        <input
                          type="number"
                          placeholder="Price"
                          value={purchaseOrderPrice}
                          style={{ border: 'none', outline: 'none', textAlign: 'center' }}
                          onChange={(e) => setPurchaseOrderPrice(e.target.value)}
                        />
                      </td>
                      <td>
                        <Form.Group controlId="category">
                          <Form.Control
                            as="select"
                            value={purchaseOrderCategory}
                            style={{ border: 'none', outline: 'none', textAlign: 'center' }}
                            onChange={(e) => setPurchaseOrderCategory(e.target.value)}
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
                          placeholder="Name of the Product"
                          value={productName}
                          style={{ border: 'none', outline: 'none' }}
                          onChange={(e) => setProductName(e.target.value)}
                        />
                      </td>
                      <td>
                        <Button variant="success" onClick={addPurchaseOrder}>
                          Add
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
          </Col>
        </Row>
        <br /> {/* Add space between cards */}
        <Row>
          <Col>
                <h2>Product History</h2>
                <Table striped bordered className="product-history-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Category</th>
                      <th>Name of the Product</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productHistory.map((historyItem, index) => (
                      <tr key={index}>
                        <td>{historyItem.id}</td>
                        <td>{historyItem.product}</td>
                        <td>{historyItem.quantity}</td>
                        <td>${historyItem.price.toFixed(2)}</td>
                        <td>{historyItem.category}</td>
                        <td>{historyItem.name}</td>
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

export default InventoryManagementPage;
