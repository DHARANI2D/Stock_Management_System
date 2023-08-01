
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button,Card } from 'react-bootstrap';
import axios from 'axios';
const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    dob: '',
    gstNo: '',
    panNo: '',
    tinNo: '',
    bankName: '',
    accountNo: '',
    balance: '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // First Name validation
    if (formData.firstName.trim() === '') {
      newErrors.firstName = 'First Name is required';
      isValid = false;
    }

    // Email validation
    const emailPattern = /^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})+$/;
    if (!formData.email.match(emailPattern)) {
      newErrors.email = 'Invalid email address';
      isValid = false;
    }

    // Password validation
    if (formData.password.length < 6) {
      newErrors.password = 'Password should be at least 6 characters long';
      isValid = false;
    }

    // Confirm Password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    // Phone validation
    const phonePattern = /^\d{10}$/;
    if (!formData.phone.match(phonePattern)) {
      newErrors.phone = 'Invalid phone number';
      isValid = false;
    }

    // Address validation
    if (formData.address.trim() === '') {
      newErrors.address = 'Address is required';
      isValid = false;
    }

    // DOB validation
    if (formData.dob.trim() === '') {
      newErrors.dob = 'DOB is required';
      isValid = false;
    }

    // GST No validation
    if (formData.gstNo.trim() === '') {
      newErrors.gstNo = 'GST No is required';
      isValid = false;
    }

    // PAN No validation
    if (formData.panNo.trim() === '') {
      newErrors.panNo = 'PAN No is required';
      isValid = false;
    }

    // TIN No validation
    if (formData.tinNo.trim() === '') {
      newErrors.tinNo = 'TIN No is required';
      isValid = false;
    }

    // Bank Name validation
    if (formData.bankName.trim() === '') {
      newErrors.bankName = 'Bank Name is required';
      isValid = false;
    }

    // Account No validation
    if (formData.accountNo.trim() === '') {
      newErrors.accountNo = 'Account No is required';
      isValid = false;
    }

    // Balance validation
    if (formData.balance.trim() === '') {
      newErrors.balance = 'Balance is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(
          "http://localhost:8181/api/v1/auth/register",
          {
            firstName: formData.firstName,
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
            phone: formData.phone,
            address: formData.address,
            dob: formData.dob,
            gstNo: formData.gstNo,
            panNo: formData.panNo,
            tinNo: formData.tinNo,
            bankName: formData.bankName,
            accountNo: formData.accountNo,
            balance: formData.balance,
          }
        );
        console.log(response.data);
        window.alert("Registration Successful");
        console.log('Form submitted:', formData);
        // Reset the form
        setFormData({
          firstName: '',
          email: '',
          password: '',
          confirmPassword: '',
          phone: '',
          address: '',
          dob: '',
          gstNo: '',
          panNo: '',
          tinNo: '',
          bankName: '',
          accountNo: '',
          balance: '',
        });
        setErrors({});
        window.location.href = "/login";
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container fluid >
      <Row className="mainr">
        <Col md={6} style={{ marginTop: "230px" }}>
          <img src='https://media.istockphoto.com/id/1161496973/vector/young-man-with-computer-fills-schedule-calendar-and-complete-business-task-for-work.jpg?s=612x612&w=0&k=20&c=AvapetRgP2Ekb2OTp1WMAwOmknVuOq_3hie3c4feYQI=' alt="Logo" className="logo" />
        </Col>

        <Col md={6}style={{ marginTop: "80px" }}>
          <div className="register">
            <Form onSubmit={(e) => handleSubmit(e)}>
              <h2>Registration</h2>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                    {errors.firstName && <div className="error">{errors.firstName}</div>}
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group>
                <Form.Control
                  type="email"
                  name="email"
                  width={"80%"}
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <div className="error">{errors.email}</div>}
              </Form.Group>

              <Form.Group>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && <div className="error">{errors.password}</div>}
              </Form.Group>

              <Form.Group>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
              </Form.Group>

              <Form.Group>
                <Form.Control
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && <div className="error">{errors.phone}</div>}
              </Form.Group>

              <Form.Group>
                <Form.Control
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                />
                {errors.address && <div className="error">{errors.address}</div>}
              </Form.Group>

              <Form.Group>
                <Form.Control
                  type="text"
                  name="dob"
                  placeholder="Date of Birth (DOB)"
                  value={formData.dob}
                  onChange={handleChange}
                />
                {errors.dob && <div className="error">{errors.dob}</div>}
              </Form.Group>

              <Form.Group>
                <Form.Control
                  type="text"
                  name="gstNo"
                  placeholder="GST No"
                  value={formData.gstNo}
                  onChange={handleChange}
                />
                {errors.gstNo && <div className="error">{errors.gstNo}</div>}
              </Form.Group>

              <Form.Group>
                <Form.Control
                  type="text"
                  name="panNo"
                  placeholder="PAN No"
                  value={formData.panNo}
                  onChange={handleChange}
                />
                {errors.panNo && <div className="error">{errors.panNo}</div>}
              </Form.Group>

              <Form.Group>
                <Form.Control
                  type="text"
                  name="tinNo"
                  placeholder="TIN No"
                  value={formData.tinNo}
                  onChange={handleChange}
                />
                {errors.tinNo && <div className="error">{errors.tinNo}</div>}
              </Form.Group>

              <Form.Group>
                <Form.Control
                  type="text"
                  name="bankName"
                  placeholder="Bank Name"
                  value={formData.bankName}
                  onChange={handleChange}
                />
                {errors.bankName && <div className="error">{errors.bankName}</div>}
              </Form.Group>

              <Form.Group>
                <Form.Control
                  type="text"
                  name="accountNo"
                  placeholder="Account Number"
                  value={formData.accountNo}
                  onChange={handleChange}
                />
                {errors.accountNo && <div className="error">{errors.accountNo}</div>}
              </Form.Group>

              <Form.Group>
                <Form.Control
                  type="text"
                  name="balance"
                  placeholder="Balance"
                  value={formData.balance}
                  onChange={handleChange}
                /><br />
                {errors.balance && <div className="error">{errors.balance}</div>}
              </Form.Group>

              <Button type="submit"style={{ marginLeft: "290px" }}>Register</Button>
            </Form><br />
            <p style={{ marginLeft: "230px" }}>
              Don't you have an account? <Link to="/Login">Sign in</Link>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
