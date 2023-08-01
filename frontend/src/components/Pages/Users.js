import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import AppNavbar from '../NavBar/Navbar';
import Slidebar from '../NavBar/Slidebar';
import Footer from '../NavBar/footer';
import './css/user.css';

const UserPage = () => {
  // State to store user data
  const [user, setUser] = useState({
    firstName: '',
    email: '',
    phone: '',
    address: '',
    dob: '',
    gstNo: '',
    panNo: '',
    tinNo: '',
    accountNo: '',
    bankName: '',
    balance: ''
  });

  // State to store bank details

  const bankStyle = {
    maxHeight: '370px',
    overflowY: 'auto'
  };
  useEffect(() => {
  // Function to fetch user data and bank details from the API
  const fetchUserData = async () => {
    const email = localStorage.getItem('email');
    const authToken = localStorage.getItem('token');
    
    try {
      const response = await axios.get(`http://localhost:8181/api/v1/users/fetch/${email}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      // Assuming the API response data has properties similar to the user object
      setUser(response.data);
console.log(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      console.log(email);
    }
  };

  
    // Call the function to fetch user data when the component mounts
    fetchUserData();
  }, []);

  return (
    
    <div>
      <AppNavbar />
      <div className="container-fluid">
        <div className="row">
          <div style={{ width: '95px' }}>
            <Slidebar />
          </div>
          <div className="col-md-11">
          <Row>

<div className="container mt-4">
      <Card className="border-0">
        <Card.Body>
          <Row>
            <Col md={6}>
            <center><strong><div style={{ fontSize: '26px' }}>Personal Details</div></strong><br />
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsQ-YHX2i3RvTDDmpfnde4qyb2P8up7Wi3Ww&usqp=CAU"
              alt="Profile"
              className="rounded-circle"
              width="172"
              height="172 "
            />
            <br /><br />
              <p><strong>Name:</strong> {user.firstName}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
              <p><strong>Address:</strong> {user.address}</p>
              <p><strong>Date of Birth:</strong> {user.dob}</p>
              <p><strong>GST No.:</strong> {user.gstNo}</p>
              <p><strong>PAN No.:</strong> {user.panNo}</p>
              <p><strong>TIN No.:</strong> {user.tinNo}</p>
              </center>
            </Col>
            
            <Col md={6} >
                
            <strong><div style={{ fontSize: '26px' }}>Bank Details</div></strong><br />
            <Card className="border-0" style={bankStyle}>
            <Card.Body className="bank-details-card-body border-0">
                <div className="scrollable-card">
                        <Card className="bank-card">
                        <div className="card-row">
                            <div className="card-text" style={{ marginLeft: '10px' ,marginTop:'10px'}}>
                                <p><strong>Account Number</strong> {user.accountNo}</p>
                                <p><strong>Bank Name</strong> {user.bankName}</p>
                                <p><strong>Balance </strong>$ {user.balance}</p>
                            </div>
                            <div className="bank-logo">
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgpG25DXG8DNbRBi8tYWnE4X-rUo6Oq2ROsA&usqp=CAU"
                                    alt="Bank Logo"
                                    width="62"
                                    height="62"
                                    style={{ marginRight: '10px' }}
                                />
                                </div>
                            </div>

                        </Card>
                        <br />
                </div>
                </Card.Body>
                </Card>
              <Card className="mt-3 border-0">
              <strong><div style={{ fontSize: '26px' }}>Permisions</div></strong><br />
                <Row>
                <Col md={6}>
                    <Card>
                        <Card.Body>
                        <div>
                            <p><strong>Employee Name</strong> Michael</p>
                            <p><strong>Role</strong>Accountant</p>
                        </div>
                        <img src="data:image/png;base64,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" alt="Employee" className="float-end" width="32" height="32" style={{ marginTop: '-65px' }}/>
                        </Card.Body>
                    </Card>
                    </Col>

                    <Col md={6}>
                        <Card>
                            <Card.Body>
                            <div>
                                <p><strong>Employee Name</strong> Robert</p>
                                <p><strong>Role</strong> Inventory Manager</p>
                            </div>
                            <img src="data:image/jpeg;base64,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" alt="Employee" className="float-end" width="32" height="32" style={{ marginTop: '-65px'}}/>
                            </Card.Body>
                        </Card>
                        </Col>

                    </Row>
                            </Card>
                            </Col>
                        </Row>
                        </Card.Body>
                    </Card>
                    </div>
            </Row>
            </div>
        </div>
    </div>
    <Footer />
    </div>
  );
};

export default UserPage;
