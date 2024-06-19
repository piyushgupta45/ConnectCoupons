// Footer.js

import React from 'react';
import './footer.scss';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row">
          {/* About Us */}
          <div className="row-content">
            <h4>About Us</h4>
            <p>Welcome to Connect-Coupons, your go-to source for amazing deals and discounts. Explore our coupons to save on your favorite brands and products.</p>
          </div>

          {/* Quick Links */}
          <div className="row-content">
            <h4>Quick Links</h4>
            <ul className="list-unstyled">
              <li><a href="#">Home</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="row-content">
            <h4>Contact Information</h4>
            <p><i className="fas fa-map-marker-alt"></i> 123 Main Street, Cityville</p>
            <p><i className="fas fa-envelope"></i> info@connect-coupons.com</p>
            <p><i className="fas fa-phone"></i> +1 (555) 123-4567</p>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="row">
          <div className="col-lg-12">
            <ul className="social-icons">
              <li><a href="#" target="_blank"><i className="fab fa-facebook"></i></a></li>
              <li><a href="#" target="_blank"><i className="fab fa-twitter"></i></a></li>
              <li><a href="#" target="_blank"><i className="fab fa-instagram"></i></a></li>
              <li><a href="#" target="_blank"><i className="fab fa-linkedin"></i></a></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="row-down">
          <div className="col-lg-12">
            <p className="text-center"> 2024 Connect-Coupons. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
