import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Carousel, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./css/LandingPage.css";

const LandingPage = () => {

  let navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login'); 
  };

  return (
    <div>
      {/* NavigationBar */}
      <Navbar sticky="top" className="navbar-main">
        {/* Navbar content */}
        <Link to="/" > 
          <img src="energywise_logo.png" alt="Logo" width="150px" className="logo"/>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav-links mr-auto">
            <Link to="/" className="nav-links">HOME</Link>
            <Link to="/about-us" className="nav-links">ABOUT US</Link>
            <Link to="/contact-us" className="nav-links">CONTACT</Link>
            <Link to="/pricing" className="nav-links">PRICING</Link>
          </Nav>
          <div className="button-main">
            <button onClick={handleLoginClick}>LOG IN</button>
          </div>
        </Navbar.Collapse>
      </Navbar>

      {/* LandingPage */}
      <div className="carousel-container" style={{ margin: "30px 100px", height: "100" }}>
        <Carousel>
          <Carousel.Item>
            <img className="d-block w-100" src="slide1.png" alt="First slide" />
            <Carousel.Caption>
              <div className="button-container">
                <div className="button-sub">
                  <button onClick={handleLoginClick} className="button-sub">GET STARTED</button>
                </div>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src="slide2.png" alt="Second slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src="slide3.png" alt="Third slide" />
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
};

export default LandingPage;
