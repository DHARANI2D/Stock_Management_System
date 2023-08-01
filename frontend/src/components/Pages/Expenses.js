import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, Col, Container, Form, ListGroup, Row } from 'react-bootstrap';
import AppNavbar from '../NavBar/Navbar';
import Slidebar from '../NavBar/Slidebar';
import Footer from '../NavBar/footer';

const API_BASE_URL = 'http://localhost:8181/api';

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [sales, setSales] = useState([]);
  const [newTransaction, setNewTransaction] = useState({
    type: '',
    description: '',
    amount: '',
    category: ''
    
  });
const  vfe=localStorage.getItem('email');

  useEffect(() => {
    // Fetch data from the server
    const fetchTransactions = async () => {
      try {
        const authToken = localStorage.getItem('token');
        if (!authToken) {
          console.error('User is not authenticated. Redirect to login or show error message.');
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        };

        const expensesResponse = await axios.get(`${API_BASE_URL}/expenses`, config);
        setExpenses(expensesResponse.data);

        const salesResponse = await axios.get(`${API_BASE_URL}/sales`, config);
        setSales(salesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTransactions();
  }, []);

  const handleInputChange = (e) => {
    setNewTransaction({
      ...newTransaction,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setNewTransaction({
      ...newTransaction,
      receipt: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const authToken = localStorage.getItem('token');
      if (!authToken) {
        console.error('User is not authenticated. Redirect to login or show error message.');
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      };

      if (newTransaction.type === 'expense') {
        await axios.post(`${API_BASE_URL}/expenses`, newTransaction, config);
      } else if (newTransaction.type === 'sale') {
        await axios.post(`${API_BASE_URL}/sales`, newTransaction, config);
      }

      // Refetch the data after adding the new transaction
      const expensesResponse = await axios.get(`${API_BASE_URL}/expenses`, config);
      setExpenses(expensesResponse.data);

      const salesResponse = await axios.get(`${API_BASE_URL}/sales`, config);
      setSales(salesResponse.data);

      setNewTransaction({
        type: '',
        description: '',
        amount: '',
        category: '',
        mail: localStorage.getItem('email')

      });
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };
  const monthOptions = Array.from({ length: 12 }, (_, index) => {
    const monthValue = index + 1;
    return (
      <option key={monthValue} value={monthValue}>
        {new Date(0, index).toLocaleString('default', { month: 'long' })}
      </option>
    );
  });
  return (
    <Container>
      <Container fluid>
        <Row>
          <Col md={1}>
            <Slidebar />
            </Col>
          <AppNavbar />
        </Row>
      </Container>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <Card>
            <Card.Header as="h5">Expenses and Sales Bills</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="type">
                  <Form.Label>Type</Form.Label>
                  <Form.Control
                    as="select"
                    name="type"
                    value={newTransaction.type}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Type</option>
                    <option value="expense">Expense</option>
                    <option value="sale">Sale</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    name="description"
                    value={newTransaction.description}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="amount">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control
                    type="number"
                    name="amount"
                    value={newTransaction.amount}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="category">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    as="select"
                    name="category"
                    value={newTransaction.category}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Category</option>
                    <option value="Goods">Goods</option>
                    <option value="Services">Services</option>
                    <option value="Loan">Loan</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="month">
                    <Form.Label>Month</Form.Label>
                    <Form.Control
                      as="select"
                      name="month"
                      value={newTransaction.month}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Month</option>
                      {monthOptions}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="year">
                    <Form.Label>Year</Form.Label>
                    <Form.Control
                      type="number"
                      name="year"
                      value={newTransaction.year}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Add Transaction
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center mt-4" style={{ height: '200px' }}>
        <Col md={6}>
          <Card>
            <Card.Header as="h5">Expense List</Card.Header>
            <Card.Body style={{ maxHeight: '300px', overflowY: 'auto' }}>
              <ListGroup>
                {expenses.map((expense, index) => (
                  <ListGroup.Item key={index}>
                    <strong>Description:</strong> {expense.description}
                    <br />
                    <strong>Amount:</strong> ${expense.amount}
                    <br />
                    <strong>Category:</strong> {expense.category}
                    {expense.receipt && (
                      <a href={URL.createObjectURL(expense.receipt)} target="_blank" rel="noreferrer">
                        View Receipt
                      </a>
                    )}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Header as="h5">Sales List</Card.Header>
            <Card.Body style={{ maxHeight: '300px', overflowY: 'auto' }}>
              <ListGroup>
                {sales.map((sale, index) => (
                  <ListGroup.Item key={index}>
                    <strong>Description:</strong> {sale.description}
                    <br />
                    <strong>Amount:</strong> ${sale.amount}
                    <br />
                    <strong>Category:</strong> {sale.category}
                    {sale.receipt && (
                      <a href={URL.createObjectURL(sale.receipt)} target="_blank" rel="noreferrer">
                        View Receipt
                      </a>
                    )}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Footer />
    </Container>
  );
};

export default ExpenseTracker;
