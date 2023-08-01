import React from 'react';
import { FaBell } from 'react-icons/fa';
import './bell.css';

const BellIcon = () => {
  return (
    <div className="bell-icon">
      <FaBell className="bell" />
      <div className="notification-dot"></div>
    </div>
  );
};

export default BellIcon;
