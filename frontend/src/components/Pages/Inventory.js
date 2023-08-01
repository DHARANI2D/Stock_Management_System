import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Slidebar from '../NavBar/Slidebar';
import Navbar from '../NavBar/Navbar';
import { Button, Card, Col, Container, Row, Table } from 'react-bootstrap';

const API_BASE_URL = 'http://localhost:8181/api';

const InventoryManagementPage = () => {
  const [stockLevels, setStockLevels] = useState([]);
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [salesOutlet, setSalesOutlet] = useState([]);
  const [inventoryReports, setInventoryReports] = useState([]);

  // State variables for input fields
  const [purchaseOrderProduct, setPurchaseOrderProduct] = useState('');
  const [purchaseOrderQuantity, setPurchaseOrderQuantity] = useState('');

  const [salesOutletProduct, setSalesOutletProduct] = useState('');
  const [salesOutletQuantity, setSalesOutletQuantity] = useState('');

  useEffect(() => {
    fetchData();
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

      const stockResponse = await axios.get(`${API_BASE_URL}/inventory/all`, config);
      setStockLevels(stockResponse.data);

      const purchaseOrdersResponse = await axios.get(`${API_BASE_URL}/inventory/purchase`, config);
      setPurchaseOrders(purchaseOrdersResponse.data);

      const salesOutletResponse = await axios.get(`${API_BASE_URL}/inventory/sales`, config);
      setSalesOutlet(salesOutletResponse.data);

      const inventoryReportsResponse = await axios.get(`${API_BASE_URL}/inventory/reports`, config);
      setInventoryReports(inventoryReportsResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
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

      const newOrder = {
        product: purchaseOrderProduct,
        quantity: parseInt(purchaseOrderQuantity, 10),
      };

      await axios.post(`${API_BASE_URL}/inventory/purchase`, newOrder, config);
      fetchData();
      setPurchaseOrderProduct('');
      setPurchaseOrderQuantity('');
    } catch (error) {
      console.error('Error adding purchase order:', error);
    }
  };

  const addSalesOutlet = async () => {
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

      const newOutlet = {
        product: salesOutletProduct,
        quantity: parseInt(salesOutletQuantity, 10),
      };

      await axios.post(`${API_BASE_URL}/inventory/sales`, newOutlet, config);
      fetchData();
      setSalesOutletProduct('');
      setSalesOutletQuantity('');
    } catch (error) {
      console.error('Error adding sales outlet:', error);
    }
  };

  const generateInventoryReport = async () => {
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

      const newReport = {
        date: getCurrentDateAndTime(),
        details: 'Sample Report',
      };

      await axios.post(`${API_BASE_URL}/inventory/reports`, newReport, config);
      fetchData();

      generatePDFReport(calculateCurrentStockLevels(), getCurrentDateAndTime());
    } catch (error) {
      console.error('Error generating inventory report:', error);
    }
  };

  const getCurrentDateAndTime = () => {
    const now = new Date();
    return now.toISOString();
  };

  const generatePDFReport = (stockData, date) => {
    const doc = new jsPDF();
    const tableColumn = ['Product', 'Quantity'];
    const tableRows = [];

    stockData.forEach((item) => {
      const rowData = [item.product, item.quantity];
      tableRows.push(rowData);
    });

    doc.setFontSize(18);
    doc.text('Inventory Stock Levels', 14, 16);

    doc.autoTable(tableColumn, tableRows, { startY: 30 });

    doc.save(`Inventory_Stock_Levels_${date}.pdf`);
  };

  const calculateCurrentStockLevels = () => {
    const productQuantitiesMap = new Map();

    // Calculate the total purchase quantity for each product
    purchaseOrders.forEach((order) => {
      const { product, quantity } = order;
      if (productQuantitiesMap.has(product)) {
        productQuantitiesMap.set(product, productQuantitiesMap.get(product) + quantity);
      } else {
        productQuantitiesMap.set(product, quantity);
      }
    });

    // Subtract the sales quantity from the purchase quantity for each product
    salesOutlet.forEach((outlet) => {
      const { product, quantity } = outlet;
      if (productQuantitiesMap.has(product)) {
        productQuantitiesMap.set(product, productQuantitiesMap.get(product) - quantity);
      } else {
        productQuantitiesMap.set(product, -quantity);
      }
    });

    // Create an array of updated stock levels
    const updatedStockLevels = [];
    productQuantitiesMap.forEach((quantity, product) => {
      updatedStockLevels.push({ product, quantity });
    });

    return updatedStockLevels;
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
            <h1>Inventory Management</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <h2>Stock Levels</h2>
                <Table striped bordered>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stockLevels.map((item, index) => (
                      <tr key={index}>
                        <td >{item.product}</td>
                        <td>{item.quantity}</td>
                        <td>{item.transactionType}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <h2>Purchase Orders</h2>
                <Table striped bordered>
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Product</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {purchaseOrders.map((order, index) => (
                      <tr key={index}>
                        <td>{order.id}</td>
                        <td>{order.product}</td>
                        <td>{order.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <div>
                  <input
                    type="text"
                    placeholder="Product"
                    value={purchaseOrderProduct}
                    onChange={(e) => setPurchaseOrderProduct(e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Quantity"
                    value={purchaseOrderQuantity}
                    onChange={(e) => setPurchaseOrderQuantity(e.target.value)}
                  />
                  <Button variant="primary" onClick={addPurchaseOrder}>
                    Add Purchase Order
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <h2>Sales Outlet</h2>
                <Table striped bordered>
                  <thead>
                    <tr>
                      <th>Outlet ID</th>
                      <th>Product</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salesOutlet.map((outlet, index) => (
                      <tr key={index}>
                        <td>{outlet.id}</td>
                        <td>{outlet.product}</td>
                        <td>{outlet.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <div>
                  <input
                    type="text"
                    placeholder="Product"
                    value={salesOutletProduct}
                    onChange={(e) => setSalesOutletProduct(e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Quantity"
                    value={salesOutletQuantity}
                    onChange={(e) => setSalesOutletQuantity(e.target.value)}
                  />
                  <Button variant="primary" onClick={addSalesOutlet}>
                    Add Sales Outlet
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <h2>Inventory Reports</h2>
                <Table striped bordered>
                  <thead>
                    <tr>
                      <th>Report ID</th>
                      <th>Date</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventoryReports.map((report, index) => (
                      <tr key={index}>
                        <td>{report.id}</td>
                        <td>{report.date}</td>
                        <td>{report.details}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Button variant="success" onClick={generatePDFReport}>
                  Generate Inventory Report
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      </div>
  );
};

export default InventoryManagementPage;
