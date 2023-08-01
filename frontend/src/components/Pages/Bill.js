import React, { useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import { PDFViewer, PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import Footer from '../NavBar/footer';
import Slidebar from '../NavBar/Slidebar';
import AppNavbar from '../NavBar/Navbar';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 12,
    padding: 30,
  },
  section: {
    marginBottom: 10,
  },
  companyDetails: {
    textAlign: 'center',
    marginBottom: 20,
  },
  invoiceTable: {
    marginBottom: 20,
  },
  tableHeader: {
    fontWeight: 'bold',
    borderBottom: '1px solid black',
    padding: '6px 0',
    textAlign: 'center',
  },
  tableRow: {
    borderBottom: '1px solid black',
    padding: '6px 0',
    textAlign: 'center',
  },
  totalAmount: {
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 10,
  },
});

const InvoiceGenerator = () => {
  const [invoice, setInvoice] = useState({
    invoiceNumber: '',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    customerAddress: '',
    customerGstNo: '',
    company: 'ABC Company',
    companyAddress: 'Coimbatore',
    companyPhone: '1234567890',
    companyEmail: 'abc@gmail.com',
    logoUrl: 'data:image/png;base64,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',
    items: [{ description: '', quantity: 0, price: 0 }],
  });

  const [showPreview, setShowPreview] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvoice((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItems = invoice.items.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          [name]: value,
        };
      }
      return item;
    });
    setInvoice((prevState) => ({
      ...prevState,
      items: updatedItems,
    }));
  };

  const addNewItem = () => {
    setInvoice((prevState) => ({
      ...prevState,
      items: [...prevState.items, { description: '', quantity: 0, price: 0 }],
    }));
  };

  const removeItem = (index) => {
    setInvoice((prevState) => {
      const updatedItems = prevState.items.filter((item, i) => i !== index);
      return {
        ...prevState,
        items: updatedItems,
      };
    });
  };

  const calculateSubtotal = () => {
    return invoice.items.reduce((acc, item) => {
      return acc + item.quantity * item.price;
    }, 0);
  };

  const calculateTax = () => {
    const subtotal = calculateSubtotal();
    const taxRate = 0.1; // 10%
    return subtotal * taxRate;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = calculateTax();
    return subtotal + tax;
  };

  const generateInvoice = () => {
    setShowPreview(true);
  };

  const handleClosePreview = () => {
    setShowPreview(false);
  };

  return (

    <div className="container">
      <Slidebar />
      <AppNavbar />
      <h2 className="mt-4 mb-4">Invoice Generator</h2>
      <Card style={{marginLeft:'50px'}}>
        <Card.Body style={{marginLeft:'30px',marginRight:'30px'}}>
          <form>
            <div className="form-group" >
              <label>Invoice Number</label>
              <input
                type="text"
                className="form-control"
                name="invoiceNumber"
                value={invoice.invoiceNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Customer Name</label>
              <input
                type="text"
                className="form-control"
                name="customerName"
                value={invoice.customerName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Customer Email</label>
              <input
                type="email"
                className="form-control"
                name="customerEmail"
                value={invoice.customerEmail}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Customer Phone</label>
              <input
                type="tel"
                className="form-control"
                name="customerPhone"
                value={invoice.customerPhone}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Customer Address</label>
              <input
                type="text"
                className="form-control"
                name="customerAddress"
                value={invoice.customerAddress}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Customer GST No</label>
              <input
                type="text"
                className="form-control"
                name="customerGstNo"
                value={invoice.customerGstNo}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Items</label>
              {invoice.items.map((item, index) => (
                <div key={index} className="row">
                  <div className="col-4">
                    <input
                      type="text"
                      className="form-control"
                      name="description"
                      placeholder="Description"
                      value={item.description}
                      onChange={(e) => handleItemChange(index, e)}
                    />
                  </div>
                  <div className="col-2">
                    <input
                      type="number"
                      className="form-control"
                      name="quantity"
                      placeholder="Quantity"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, e)}
                    />
                  </div>
                  <div className="col-2">
                    <input
                      type="number"
                      className="form-control"
                      name="price"
                      placeholder="Price"
                      value={item.price}
                      onChange={(e) => handleItemChange(index, e)}
                    />
                  </div>
                  <div className="col-2">
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => removeItem(index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="btn btn-primary mt-2"
                onClick={addNewItem}>Add Item</button><br />
            </div><br />
            <center><Button variant="success" onClick={generateInvoice}>Generate Preview</Button></center>
          </form>
        </Card.Body>
      </Card>

      <Modal
        show={showPreview}
        onHide={handleClosePreview}
        centered
        size="lg"
        style={{ maxWidth: 600 }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Generated Invoice Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PDFViewer width="100%" height={500}>
            <Document>
              <Page size="A4" style={styles.page}>
                <View style={styles.companyDetails}>
                <center><Image style={{ width: 100, height: 100,marginLeft:'40%' }} src={invoice.logoUrl} /></center><br /><br />
                  <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{invoice.company}</Text>
                  <Text>{invoice.companyAddress}</Text>
                  <Text>{invoice.companyEmail}</Text>
                  <Text>{invoice.companyPhone}</Text>
                </View>
                <View style={styles.section}>
                  <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Invoice</Text>
                </View>
                <View style={styles.section}>
                  <Text>Invoice Number: {invoice.invoiceNumber}</Text>
                </View>
                <View style={styles.section}>
                  <Text>Customer Name: {invoice.customerName}</Text>
                </View>
                <View style={styles.section}>
                  <Text>Customer Email: {invoice.customerEmail}</Text>
                </View>
                <View style={styles.section}>
                  <Text>Customer Phone: {invoice.customerPhone}</Text>
                </View>
                <View style={styles.section}>
                  <Text>Customer Address: {invoice.customerAddress}</Text>
                </View>
                <View style={styles.section}>
                  <Text>Customer GST No: {invoice.customerGstNo}</Text>
                </View>
                <View style={styles.invoiceTable}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ flex: 2, ...styles.tableHeader }}>Description</Text>
                    <Text style={{ flex: 1, ...styles.tableHeader }}>Quantity</Text>
                    <Text style={{ flex: 1, ...styles.tableHeader }}>Price</Text>
                    <Text style={{ flex: 1, ...styles.tableHeader }}>Amount</Text>
                  </View>
                  {invoice.items.map((item, index) => (
                    <View key={index} style={{ flexDirection: 'row' }}>
                      <Text style={{ flex: 2, ...styles.tableRow }}>{item.description}</Text>
                      <Text style={{ flex: 1, ...styles.tableRow }}>{item.quantity}</Text>
                      <Text style={{ flex: 1, ...styles.tableRow }}>
                        {item.price ? `$${item.price}` : ''}
                      </Text>
                      <Text style={{ flex: 1, ...styles.tableRow }}>
                        {item.price ? `$${(item.quantity * item.price).toFixed(2)}` : ''}
                      </Text>
                    </View>
                  ))}
                </View>
                <View style={styles.section}>
                  <Text style={styles.totalAmount}>
                    Subtotal: ${calculateSubtotal().toFixed(2)}
                  </Text>
                  <Text style={styles.totalAmount}>
                    Tax: ${calculateTax().toFixed(2)}
                  </Text>
                  <Text style={styles.totalAmount}>
                    Total: ${calculateTotal().toFixed(2)}
                  </Text>
                </View>
              </Page>
            </Document>
          </PDFViewer>
        </Modal.Body>
        <Modal.Footer>
          <PDFDownloadLink
            document={
              <Document>
                <Page size="A4" style={styles.page}>
                  <View style={styles.companyDetails}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{invoice.company}</Text>
                    <Text>{invoice.companyAddress}</Text>
                    <Text>{invoice.companyEmail}</Text>
                    <Text>{invoice.companyPhone}</Text>
                    <Image style={{ width: 150, height: 150 }} src={invoice.logoUrl} />
                  </View>
                  <View style={styles.section}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Invoice</Text>
                  </View>
                  <View style={styles.section}>
                    <Text>Invoice Number: {invoice.invoiceNumber}</Text>
                  </View>
                  <View style={styles.section}>
                    <Text>Customer Name: {invoice.customerName}</Text>
                  </View>
                  <View style={styles.section}>
                    <Text>Customer Email: {invoice.customerEmail}</Text>
                  </View>
                  <View style={styles.section}>
                    <Text>Customer Phone: {invoice.customerPhone}</Text>
                  </View>
                  <View style={styles.section}>
                    <Text>Customer Address: {invoice.customerAddress}</Text>
                  </View>
                  <View style={styles.section}>
                    <Text>Customer GST No: {invoice.customerGstNo}</Text>
                  </View>
                  <View style={styles.invoiceTable}>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ flex: 2, ...styles.tableHeader }}>Description</Text>
                      <Text style={{ flex: 1, ...styles.tableHeader }}>Quantity</Text>
                      <Text style={{ flex: 1, ...styles.tableHeader }}>Price</Text>
                      <Text style={{ flex: 1, ...styles.tableHeader }}>Amount</Text>
                    </View>
                    {invoice.items.map((item, index) => (
                      <View key={index} style={{ flexDirection: 'row' }}>
                        <Text style={{ flex: 2, ...styles.tableRow }}>{item.description}</Text>
                        <Text style={{ flex: 1, ...styles.tableRow }}>{item.quantity}</Text>
                        <Text style={{ flex: 1, ...styles.tableRow }}>
                          {item.price ? `$${item.price}` : ''}
                        </Text>
                        <Text style={{ flex: 1, ...styles.tableRow }}>
                          {item.price ? `$${(item.quantity * item.price).toFixed(2)}` : ''}
                        </Text>
                      </View>
                    ))}
                  </View>
                  <View style={styles.section}>
                    <Text style={styles.totalAmount}>
                      Subtotal: ${calculateSubtotal().toFixed(2)}
                    </Text>
                    <Text style={styles.totalAmount}>
                      Tax: ${calculateTax().toFixed(2)}
                    </Text>
                    <Text style={styles.totalAmount}>
                      Total: ${calculateTotal().toFixed(2)}
                    </Text>
                  </View>
                </Page>
              </Document>
            }
            fileName="invoice.pdf"
          >
            {({ blob, url, loading, error }) =>
              loading ? 'Generating PDF...' : 'Download PDF'
            }
          </PDFDownloadLink>
        </Modal.Footer>
      </Modal>
      <Footer />
    </div>
  );
};

const App = () => {
  return <InvoiceGenerator />;
};

export default App;

