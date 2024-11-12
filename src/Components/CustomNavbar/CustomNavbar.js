import React, { useState } from 'react';
import { Phone, User,UserRound } from 'lucide-react';
import './CustomNavbar.css';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (

    <nav className="navbar navbar-expand-lg fixed-top" style={{borderBottom: '1px solid #97AABE'}}>
      <div className="container-fluid  d-flex">
        <div className='nav_wrapper'>
        <div className="d-none d-lg-flex nav_left">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link active" href="#" >Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Listing</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Contact</a>
            </li>
          </ul>
        </div>
      
        <a className="navbar-brand mx-auto" href="#">
          <div className="align-items-center">
            {/* <img 
              src="/api/placeholder/40/40" 
              alt="Next Navigate Logo" 
              className="me-2"
              style={{ width: '40px', height: '40px' }}
            /> */}
            <span>Next Navigate</span>
          </div>
        </a>

        <div className="d-none d-lg-flex align-items-center nav_right_section">
          <a href="tel:+1234567890" className="text-decoration-none me-4">
            <div className="d-flex align-items-center text-dark">
              <Phone size={20} className="me-2" />
              <span>+68 685 88666</span>
            </div>
          </a>
          <button className="btn text-dark me-3 user_icon">
            <UserRound size={20} />
          </button>
          <button className="btn rounded-pill px-4 add_property_btn">
            Add Property<span></span>
          </button>
        </div>
        </div>

        <button 
          className={`hamburger-button d-lg-none ${isOpen ? 'active' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
          <ul className="navbar-nav d-lg-none mt-3">
            <li className="nav-item">
              <a className="nav-link" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Services</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Contact</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="tel:+1234567890">
                <Phone size={20} className="me-2" />
                +123 456 7890
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <UserRound size={20} className="me-2" />
                Account
              </a>
            </li>
            <li className="nav-item mt-2">
              <button className="btn rounded-pill px-4 w-100 add_property_btn">
                Add Property
              </button>
            </li>
          </ul>
        </div>
        
      </div>
    </nav>
  );
};

export default Navbar;
