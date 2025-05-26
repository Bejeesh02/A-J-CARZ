import React from "react";
import './footer.css';
import { SiInstagram, SiFacebook  } from "react-icons/si";
import { FaPhoneAlt } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { MdOutlineMarkEmailRead } from "react-icons/md";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Follow Us Section */}
        <div className="footer-section">
          <h3>Follow Us</h3>
          <ul>
            <li><a href="https://www.justdial.com/Chennai/Aj-Carz-Near-New-Perungalathur/044PXX44-XX44-240510120748-P9J5_BZDET" target="_blank" rel="noopener noreferrer">JustDial</a></li>
            <li><a href="https://www.instagram.com/aj.carz?igsh=a3ZrdTB4Nm45cTJm" target="_blank" rel="noopener noreferrer"><SiInstagram /> Instagram</a></li>
          </ul>
        </div>

        {/* Company Section */}
        <div className="footer-section">
          <h3>Company</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/ride">Our Services</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        {/* Support Section */}
        <div className="footer-section">
          <h3>Support</h3>
          <ul>
            <li><FaPhoneAlt /> +91 8904036394</li>
            <li><FaPhoneAlt /> +91 7708936394</li>
             <li>
              <a href=""><MdOutlineMarkEmailRead /> ajcarz.aj@gmail.com</a>
            </li>
            <li>
              <a href="https://maps.app.goo.gl/XTV9ZPmZsxUe6j6r9" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                <CiLocationOn /> Chennai, Tamil Nadu
              </a>
            </li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} A J CARZ. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
