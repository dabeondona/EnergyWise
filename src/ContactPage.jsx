import React from "react";
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import {Navbar, Nav } from "react-bootstrap";
import {useNavigate ,Link } from "react-router-dom";
import "./LandingPage.css"; 
import "bootstrap/dist/css/bootstrap.min.css";


export default function ContactPage() {

    let navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login'); 
    };
    
    AOS.init(); 
    return (
      <div className="about-us">
      <div className="div">
              
        <Navbar sticky="top" className="navbar-main">
                <Link to="/" > 
                  <img src="energywise_logo.png" alt="Logo" width="150px" className="logo"/>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                      <Navbar.Collapse id="basic-navbar-nav">
                      <Nav className="nav-links mr-auto">
                        <Link to="/" className="nav-links">HOME</Link>
                        <Link to="/about-us" className="nav-links">ABOUT US</Link>
                        <Link to="/contact-us" className="nav-links">CONTACT</Link>
                      </Nav>
                      <div className="button-main">
                        <button onClick={handleLoginClick}>LOG IN</button>
                      </div>
                    </Navbar.Collapse>
                        </Navbar>
          
              <div data-aos="fade-up" className="container-1" style={{backgroundColor:"#ffffff"}}>Contact Us
              </div>
        </div>
        </div>


    );
}