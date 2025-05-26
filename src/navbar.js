import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';
import { MdMenu, MdClose } from 'react-icons/md';

function Navbar() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('username');
    setMobileMenuOpen(false);
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">AJ CARZ</div>

        <div className="menu-icon" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <MdClose /> : <MdMenu />}
        </div>

        <ul className={isMobileMenuOpen ? "nav-links active" : "nav-links"}>
          {username && (
            <li className="welcome-user">
              Welcome, {username}
            </li>
          )}

          <li><Link to="/" onClick={closeMenu}>HOME</Link></li>
          <li><Link to="/review" onClick={closeMenu}>REVIEW</Link></li>
          <li><Link to="/feedback" onClick={closeMenu}>FEEDBACK / GRIEVANCE</Link></li>
          <li><Link to="/about" onClick={closeMenu}>ABOUT US</Link></li>
          <li><Link to="/bookinfo" onClick={closeMenu}>BOOKING INFO</Link></li>

          {username ? (
            <li>
              <button onClick={handleLogout} className="logout-btn">LOGOUT</button>
            </li>
          ) : (
            <li><Link to="/login" onClick={closeMenu}>LOGIN</Link></li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
