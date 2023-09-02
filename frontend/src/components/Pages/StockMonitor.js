import React, { useEffect, useState } from 'react';
import emailjs from 'emailjs-com';

const StockMonitor = () => {
  const [stocks, setStocks] = useState([
    { id: 1, name: 'Stock A', quantity: 3 },
    { id: 2, name: 'Stock B', quantity: 0 }, // Example stock with zero quantity
    { id: 3, name: 'Stock C', quantity: 5 },
  ]);

  const [threshold, setThreshold] = useState(10); // Set your threshold value here

  useEffect(() => {
    stocks.forEach((stock) => {
      const sentAlerts = JSON.parse(localStorage.getItem('sentAlerts')) || [];

      // Check if stock is below threshold, zero quantity, not already alerted, and not in sentAlerts
      if (
        (stock.quantity < threshold || stock.quantity === 0) &&
        !sentAlerts.includes(stock.id)
      ) {
        // Send email alert
        sendEmailAlert(stock);
        
        // Update sent alerts in localStorage
        localStorage.setItem(
          'sentAlerts',
          JSON.stringify([...sentAlerts, stock.id])
        );
      }
    });
  }, [threshold, stocks]);

  const sendEmailAlert = (stock) => {
    // Use your email service credentials
    emailjs
      .send('service_wz0kyvg', 'template_u4hcili', {
        to_email: 'to_email',
        to_name:'to_name',
        stock_name: stock.name,
        stock_quantity: stock.quantity,
      },'nbnBJNDV7OcB7mOAZ')
      .then(
        (response) => {
          console.log('Email sent successfully:', response);
        },
        (error) => {
          console.error('Email send error:', error);
        }
      );
  };

  return (
    <div>
      {/* Render your stock monitoring UI here */}
      <h1>Stock Monitoring</h1>
      <p>Threshold: {threshold}</p>
      <ul>
        {stocks.map((stock) => (
          <li key={stock.id}>
            {stock.name} - Quantity: {stock.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockMonitor;