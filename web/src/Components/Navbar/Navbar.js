import React from 'react';
import './Navbar.css'; // Import the CSS file

const Navbar = (name) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        Budget Tracker
      </div>
      <div className="navbar-account">
        <span className="navbar-username">{name}</span>
      </div>
    </nav>
  );
};

export default Navbar;
