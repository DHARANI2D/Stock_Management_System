import React, { useState, useEffect } from 'react';
import { Container, Row, Col ,Card} from 'react-bootstrap';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import Slidebar from '../NavBar/Slidebar';
import Navbar from '../NavBar/Navbar';

function App() {
  const [feedback, setFeedback] = useState('');
  const [feedbackData, setFeedbackData] = useState([]);

  useEffect(() => {
    // Fetch feedback data when the component mounts
    fetchFeedbackData();
  }, []);

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    // Implement your API call to submit feedback using Axios here
    try {
      // Call your feedback API endpoint with the token in the headers
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:8181/api/v1/users/addUserFeedback',
        { feedback },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Update the feedback data state with the new feedback
      setFeedbackData([...feedbackData, response.data.feedback]);
      // Clear the feedback input
      setFeedback('');
    } catch (error) {
      // Handle feedback submission error
      console.log('Feedback submission error:', error);
    }
  };
  const  vfe=localStorage.getItem('email');

  const fetchFeedbackData = async () => {
    try {
      // Call your feedback API endpoint with the token in the headers
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8082/api/v1/feed/getFeedback', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFeedbackData(response.data);
    } catch (error) {
      // Handle error while fetching feedback data
      console.log('Error fetching feedback:', error);
    }
  };

  return (
    <Container className="mt-4">
      <Slidebar />
      <Navbar />
      <Row>
        <Col md={6}>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Feedback Form</h5>
              <form onSubmit={handleSubmitFeedback}>
                {/* Textarea for feedback */}
                <textarea
                  className="form-control mb-3"
                  rows="4"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
                <button type="submit" className="btn btn-primary">
                  Submit Feedback
                </button>
              </form>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={6}>
        <Card>
      <Card.Body>
        <h5>Feedback Display</h5>
        {feedbackData.length === 0 ? (
          <p>No feedback received yet.</p>
        ) : (
          <ul>
            {feedbackData.map((feedbackItem, index) => (
              <li key={index}>
                <strong>Feedback:</strong> {feedbackItem.feedback}
              </li>
            ))}
          </ul>
        )}
      </Card.Body>
    </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
