import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import AppNavbar from '../NavBar/Navbar';
import Slidebar from '../NavBar/Slidebar';
import Footer from '../NavBar/footer';

const calculateTDS = (salary) => {
  // Implement your TDS calculation logic here
  // Example: 10% TDS on salary
  return salary * 0.1;
};
const  vfe=localStorage.getItem('email');
const PayrollPage = () => {
  const [employees, setEmployees] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [totalSalary, setTotalSalary] = useState(0);
  const [showAddEmployee, setShowAddEmployee] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const authToken = localStorage.getItem('token');
        if (!authToken) {
          console.error('User is not authenticated. Redirect to login or show error message.');
          return;
        }

        const response = await axios.get(`http://localhost:8181/api/employees/${vfe}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        setEmployees(response.data);
        const total = response.data.reduce((acc, emp) => acc + emp.salary, 0);
        setTotalSalary(total);
      } catch (error) {
        console.error('Failed to fetch employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleEmployeeAdd = async (event) => {
    event.preventDefault();
    const { name, role, salary, profilePhoto } = event.target.elements;
    const newEmployee = {
      id: Date.now(),
      name: name.value,
      role: role.value,
      salary: parseFloat(salary.value),
      tds: calculateTDS(parseFloat(salary.value)),
      profilePhoto: profilePhoto.value,
      selected: false,
      mail: localStorage.getItem('email')
    };

    try {
      const authToken = localStorage.getItem('token');
      if (!authToken) {
        console.error('User is not authenticated. Redirect to login or show error message.');
        return;
      }

      const response = await axios.post('http://localhost:8181/api/employees', newEmployee, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      setEmployees((prevEmployees) => [...prevEmployees, response.data]);
      setTotalSalary((prevTotalSalary) => prevTotalSalary + response.data.salary);

    event.target.reset();
    } catch (error) {
      console.error('Failed to add employee:', error);
    }
  };

  const handleEmployeeDelete = async (id) => {
    try {
      const authToken = localStorage.getItem('token');
      if (!authToken) {
        console.error('User is not authenticated. Redirect to login or show error message.');
        return;
      }

      await axios.delete(`http://localhost:8181/api/employees/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

    setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee.id !== id));
    } catch (error) {
      console.error('Failed to delete employee:', error);
    }
  };

  const handleCheckboxChange = (id) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((employee) =>
        employee.id === id ? { ...employee, selected: !employee.selected } : employee
      )
    );
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setEmployees((prevEmployees) =>
      prevEmployees.map((employee) => ({ ...employee, selected: !selectAll }))
    );
  };

  const handleCreditSalary = async () => {
    try {
      const authToken = localStorage.getItem('token');
      if (!authToken) {
        console.error('User is not authenticated. Redirect to login or show error message.');
        return;
      }

    const selectedEmployees = employees.filter((employee) => employee.selected);
      const updatedEmployees = await Promise.all(
        selectedEmployees.map(async (employee) => {
          const updatedSalary = employee.salary - employee.tds;
          const response = await axios.put(
            `http://localhost:8181/api/employees/${employee.id}`,
            { ...employee, salary: updatedSalary },
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
          );
          return response.data;
        })
      );

      setEmployees((prevEmployees) =>
        prevEmployees.map((employee) =>
          updatedEmployees.find((updatedEmp) => updatedEmp.id === employee.id) || employee
        )
      );
    } catch (error) {
      console.error('Failed to update salary:', error);
    }
  };

  return (
    <div className="container">
      <Container fluid>
        <Row>
          <Col md={1}><Slidebar /></Col>
          <AppNavbar />
        </Row>
      </Container>
      <h2 className="mt-4 mb-4">Payroll Page</h2>

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Total Employees</Card.Title>
              <Card.Text>{employees.length}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Total Salary</Card.Title>
              <Card.Text>${totalSalary.toFixed(2)}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="text-right mt-4">
        <Button variant="primary" onClick={() => setShowAddEmployee(!showAddEmployee)}>
          {showAddEmployee ? 'Close' : 'Add Employee'}
        </Button>
      </div>

      {showAddEmployee && (
        <Card className="mt-4">
          <Card.Body>
            <Card.Title>Add Employee</Card.Title>
            <Form onSubmit={handleEmployeeAdd}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" required />
              </Form.Group>
              <Form.Group controlId="role">
                <Form.Label>Role</Form.Label>
                <Form.Control type="text" placeholder="Enter role" required />
              </Form.Group>
              <Form.Group controlId="salary">
                <Form.Label>Salary</Form.Label>
                <Form.Control type="number" placeholder="Enter salary" required />
              </Form.Group>
              <Form.Group controlId="profilePhoto">
                <Form.Label>Profile Photo Link</Form.Label>
                <Form.Control type="text" placeholder="Enter photo link" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Add Employee
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}

      <div className="row mt-4">
        <div className="col">
          <Button variant="primary" onClick={handleSelectAll}>
            {selectAll ? 'Deselect All' : 'Select All'}
          </Button>
        </div>
      </div>

      <div className="row mt-3">
        {employees.map((employee) => (
          <div className="col-md-3 mb-3" key={employee.id}>
            <Card style={{ width: '300px',marginLeft:'30px' }}>
              <Card.Body>
                <div className="d-flex align-items-center">
                  <div>
                    <Card.Title>{employee.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{employee.role}</Card.Subtitle>
                    <Card.Text>Salary: ${employee.salary.toFixed(2)}</Card.Text>
                    <Card.Text>TDS: ${employee.tds.toFixed(2)}</Card.Text>
                    <Card.Text>
                      Total: ${employee.salary.toFixed(2) - employee.tds.toFixed(2)}
                    </Card.Text>
                    <Form.Check
                      type="checkbox"
                      label="Select"
                      checked={employee.selected}
                      onChange={() => handleCheckboxChange(employee.id)}
                    />
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleEmployeeDelete(employee.id)}
                      className="mt-2"
                    >
                      Delete
                    </Button>
                  </div>
                  <div className="ml-auto">
                    <Card.Img
                      variant="top"
                      src={employee.profilePhoto}
                      style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                    />
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      <div className="row mt-4">
        <div className="col d-flex justify-content-center align-items-end">
          <Button variant="success" onClick={handleCreditSalary} href='https://razorpay.com'>
            Credit Salary
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PayrollPage;
