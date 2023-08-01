import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import Slidebar from '../NavBar/Slidebar';
import AppNavbar from '../NavBar/Navbar';
import Footer from '../NavBar/footer';

const SettingsPage = () => {
  const [showFullPrivacyPolicy, setShowFullPrivacyPolicy] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  const togglePrivacyPolicy = () => {
    setShowFullPrivacyPolicy(!showFullPrivacyPolicy);
  };

  return (
    <Container>
      <Slidebar />
      <AppNavbar />
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Header>
              <h4>Site Settings</h4>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="siteName">
                  <Form.Label>Site Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter site name" />
                </Form.Group>
                <Form.Group controlId="siteUrl">
                  <Form.Label>Site URL</Form.Label>
                  <Form.Control type="url" placeholder="Enter site URL" />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Save
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <Card className="mt-4">
            <Card.Header>
              <h4>Cookie Settings</h4>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="cookieConsent">
                  <Form.Check
                    type="switch"
                    id="cookieConsentSwitch"
                    label="Enable Cookie Consent"
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Save
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <Card className="mt-4">
            <Card.Header>
              <h4>MFA (Multi-Factor Authentication)</h4>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="mfaEnabled">
                  <Form.Check
                    type="switch"
                    id="mfaEnabledSwitch"
                    label="Enable MFA"
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Save
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <Card className="mt-4">
          <Card.Header>
              <h4>Privacy Policy</h4>
            </Card.Header>
            <Card.Body style={{ maxHeight: showFullPrivacyPolicy ? 'none' : '300px', overflow: 'hidden' }}>
              <p>
              Privacy Policy

Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website [insert website URL].

Please read this Privacy Policy carefully. By accessing or using our website, you acknowledge that you have read, understood, and agree to be bound by the terms of this Privacy Policy. If you do not agree with the terms of this Privacy Policy, please do not access the website.

1. Information We Collect

We may collect both personal and non-personal information from you when you interact with our website. The types of information we may collect include:

- Personal Information: This may include your name, email address, phone number, mailing address, or any other information that you voluntarily provide to us.


              </p>
              {!showFullPrivacyPolicy && (
                <Button variant="primary" onClick={togglePrivacyPolicy}>
                  Read More
                </Button>
              )}
            </Card.Body>
            {showFullPrivacyPolicy && (
              <Card.Footer>
                <p>

2. How We Use Your Information

We may use the information we collect from you for various purposes, including:

- To provide and maintain our website.

- To personalize your experience on our website and improve our services.

- To communicate with you, including responding to your inquiries and providing you with updates and information related to our services.

- To analyze and monitor the usage of our website and improve its functionality.

3. Information Sharing and Disclosure

We may share your information with third parties in the following situations:

- Service Providers: We may engage third-party service providers to assist us in operating our website and providing our services. These service providers have access to your information only to perform specific tasks on our behalf and are obligated to keep your information confidential.

- Legal Requirements: We may disclose your information if required to do so by law or in response to a valid legal request, such as a court order or government inquiry.

- Business Transfers: In the event of a merger, acquisition, or sale of our assets, your information may be transferred as part of the transaction.

4. Data Security

We take appropriate measures to protect your information from unauthorized access, alteration, disclosure, or destruction. However, please note that no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee the absolute security of your information.

5. External Links

Our website may contain links to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites and cannot accept responsibility or liability for their respective privacy policies.

6. Children's Privacy

Our website is not intended for individuals under the age of [insert minimum age]. We do not knowingly collect personal information from children. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us, and we will delete such information from our records.

7. Changes to This Privacy Policy

We reserve the right to update or modify this Privacy Policy at any time without prior notice. Any changes will be effective immediately upon posting the revised Privacy Policy on our website. We encourage you to review this Privacy Policy periodically for any updates.

8. Contact Us

If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us at [insert contact information].


                </p>
                <Button variant="primary" onClick={togglePrivacyPolicy}>
                  Show Less
                </Button>
              </Card.Footer>
            )}
          </Card>
          <Card className="mt-4">
            <Card.Header>
              <h4>Theme</h4>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="themeSelect">
                  <Form.Label>Select Theme</Form.Label>
                  <Form.Control as="select">
                    <option>Default</option>
                    <option>Dark</option>
                    <option>Light</option>
                  </Form.Control>
                </Form.Group><br />
                <Button variant="primary" type="submit">
                  Save
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row><div>

      <Footer />
      </div>
    </Container>
  );
};

export default SettingsPage;
