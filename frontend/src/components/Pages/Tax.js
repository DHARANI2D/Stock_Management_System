// src/components/TaxPrepApp.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Card, Table, Modal } from 'react-bootstrap';
import TaxReportDocument from './TaxReportDocument';
import Slidebar from '../NavBar/Slidebar';
import Navbar from '../NavBar/Navbar';
const TaxPrepApp = () => {
  const [formData, setFormData] = useState({
    income: '',
    expenses: '',
    deductions: '',
    credits: '',
    month: '',
    year: '',
    taxJurisdiction: 'India', // Added default tax jurisdiction for simplicity
  });
  const authToken = localStorage.getItem('token');
  const  vfe=localStorage.getItem('email');

  const [taxResult, setTaxResult] = useState({
    taxableIncome: '',
    taxAmount: '',
    totalCredits: '',
    netTax: '',
    isPaid: false,
    mail: localStorage.getItem('email')

  });

  const [showModal, setShowModal] = useState(false);
  const [allTaxData, setAllTaxData] = useState([]);

  // Function to fetch all tax data from the backend
  const fetchAllTaxData = () => {
    axios.get('http://localhost:8181/api/tax', {
      headers: {
        "Authorization": `Bearer ${authToken}`
      }
    })
      .then(response => {
        setAllTaxData(response.data);
      })
      .catch(error => {
        console.error('Error fetching tax data:', error);
      });
  };

  useEffect(() => {
    fetchAllTaxData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const calculateTax = () => {
    const totalIncome = parseFloat(formData.income);
    const totalExpenses = parseFloat(formData.expenses);
    const totalDeductions = parseFloat(formData.deductions);
    const totalCredits = parseFloat(formData.credits);

    const taxableIncome = totalIncome - totalExpenses - totalDeductions;
    let taxAmount = 0;

    // Indian tax slabs and rates
    if (formData.taxJurisdiction === 'India') {
      if (taxableIncome <= 250000) {
        taxAmount = 0;
      } else if (taxableIncome <= 500000) {
        taxAmount = taxableIncome * 0.05;
      } else if (taxableIncome <= 1000000) {
        taxAmount = taxableIncome * 0.2;
      } else {
        taxAmount = taxableIncome * 0.3;
      }
    }

    const netTax = Math.max(taxAmount - totalCredits, 0);

    setTaxResult({
      ...taxResult,
      taxableIncome: taxableIncome,
      taxAmount: taxAmount,
      totalCredits: totalCredits,
      netTax: netTax,
    });
  };

  const generateReport = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handlePaidSwitch = (index) => {
    const taxDataToUpdate = allTaxData[index];
    const idToUpdate = taxDataToUpdate.id;
  
    axios.put(`http://localhost:8181/api/tax/${idToUpdate}?isPaid=${!taxDataToUpdate.isPaid}`, null, {
      headers: {
        "Authorization": `Bearer ${authToken}`
      }
    })
      .then(response => {
        fetchAllTaxData(); // Update the tax data list with the updated data
        console.log('Paid status updated successfully!');
      })
      .catch(error => {
        console.error('Error updating paid status:', error);
      });
  };
  // Function to generate the PDF document
  const generatePDFDocument = () => {
    const pdfDoc = (
      <TaxReportDocument taxResult={taxResult} formData={formData} />
    );
    return pdfDoc;
  };

  // Function to download the PDF report
  const downloadPDFReport = () => {
    const pdfDoc = generatePDFDocument();

    const blob = new Blob([pdfDoc], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    const tempLink = document.createElement('a');
    tempLink.href = url;
    tempLink.setAttribute('download', `TaxReport_${formData.year}_${formData.month}.pdf`);
    tempLink.click();

    URL.revokeObjectURL(url);
  };

  // Function to save tax data to the backend
  const saveTaxDataToDB = () => {
    axios.post('http://localhost:8181/api/tax', taxResult, {
      headers: {
        "Authorization": `Bearer ${authToken}`
      }
    })
      .then(response => {
        fetchAllTaxData(); // Update the tax data list with the new data
        console.log('Data saved successfully!');
      })
      .catch(error => {
        console.error('Error saving data:', error);
      });
  };
  

  return (
    <Container className="mt-4">
      <Slidebar />
      <Navbar />
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <h1 className="mb-4">Tax Preparation Application</h1>
              <Form>
                <Form.Group>
                  <Form.Label>Income:</Form.Label>
                  <Form.Control
                    type="number"
                    name="income"
                    value={formData.income}
                    onChange={handleInputChange}
                    placeholder="Enter your income"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Expenses:</Form.Label>
                  <Form.Control
                    type="number"
                    name="expenses"
                    value={formData.expenses}
                    onChange={handleInputChange}
                    placeholder="Enter your expenses"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Deductions:</Form.Label>
                  <Form.Control
                    type="number"
                    name="deductions"
                    value={formData.deductions}
                    onChange={handleInputChange}
                    placeholder="Enter your deductions"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Credits:</Form.Label>
                  <Form.Control
                    type="number"
                    name="credits"
                    value={formData.credits}
                    onChange={handleInputChange}
                    placeholder="Enter your credits"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Month:</Form.Label>
                  <Form.Control
                    type="text"
                    name="month"
                    value={formData.month}
                    onChange={handleInputChange}
                    placeholder="Enter the month"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Year:</Form.Label>
                  <Form.Control
                    type="text"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    placeholder="Enter the year"
                  />
                </Form.Group>
                <Button variant="primary" onClick={calculateTax}>
                  Calculate Tax
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Row className="h-100">
            <Col className="h-100">
              <div>
                {taxResult.taxableIncome !== '' && (
                  <Card className="h-100 mt-4">
                    <Card.Body>
                      <h3>Tax Calculation Result:</h3>
                      <p>
                        <strong>Taxable Income:</strong> ₹ {taxResult.taxableIncome}<br />
                        <strong>Tax Amount:</strong> ₹ {taxResult.taxAmount}<br />
                        <strong>Total Credits:</strong> ₹ {taxResult.totalCredits}<br />
                        <strong>Net Tax:</strong> ₹ {taxResult.netTax}<br />
                        <strong>Paid:</strong> {taxResult.isPaid ? 'Yes' : 'No'}<br />
                        <strong>Month:</strong> {formData.month}, <strong>Year:</strong> {formData.year}
                      </p>
                      <Button variant="success" onClick={generateReport}>
                        Generate Report
                      </Button>
                    </Card.Body>
                  </Card>
                )}
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Card className="mt-4">
        <Card.Body>
          <h3>All Tax Information:</h3>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Month</th>
                <th>Year</th>
                <th>Taxable Income</th>
                <th>Tax Amount</th>
                <th>Total Credits</th>
                <th>Net Tax</th>
                <th>Paid</th>
              </tr>
            </thead>
            <tbody>
              {allTaxData.map((taxData, index) => (
                <tr key={index}>
                  <td>{taxData.month}</td>
                  <td>{taxData.year}</td>
                  <td>₹ {taxData.taxableIncome}</td>
                  <td>₹ {taxData.taxAmount}</td>
                  <td>₹ {taxData.totalCredits}</td>
                  <td>₹ {taxData.netTax}</td>
                  <td>
                    <Form.Check
                      type="switch"
                      id={`switch-${index}`}
                      label=""
                      checked={taxData.isPaid}
                      onChange={() => handlePaidSwitch(index)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Tax Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Taxable Income:</strong> ₹ {taxResult.taxableIncome}<br />
            <strong>Tax Amount:</strong> ₹ {taxResult.taxAmount}<br />
            <strong>Total Credits:</strong> ₹ {taxResult.totalCredits}<br />
            <strong>Net Tax:</strong> ₹ {taxResult.netTax}<br />
            <strong>Paid:</strong> {taxResult.isPaid ? 'Yes' : 'No'}<br />
            <strong>Month:</strong> {formData.month}, <strong>Year:</strong> {formData.year}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          {taxResult.taxableIncome !== '' && (
            <Button variant="primary" onClick={downloadPDFReport}>
              Download Report
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default TaxPrepApp;
