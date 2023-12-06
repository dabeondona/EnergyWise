import React from "react";
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import {Navbar, Nav } from "react-bootstrap";
import {useNavigate ,Link } from "react-router-dom";
import "./css/LandingPage.css"; 
import "./css/C-Styling.css";
import "bootstrap/dist/css/bootstrap.min.css";


export default function PricingPage() {
    let navigate = useNavigate();

    const navigateToLogin = () => {
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
                        <Link to="/pricing" className="nav-links">PRICING</Link>
                    </Nav>
                    <div className="button-main">
                        <button onClick={navigateToLogin}>LOG IN</button>
                    </div>
                    </Navbar.Collapse>
                </Navbar>
            
            <div data-aos="fade-up" className="container-1" style={{backgroundColor:"#ffffff"}}>PRICING</div>

            <div data-aos="fade-in" style={{ display: "flex", justifyContent: "center", alignItems: "center", fontFamily:"Roboto-Bold, Helvetica"}}>
                <div className="shadows" style={{ padding: "40px", marginBottom:"25px", backgroundColor: "#F5FCFF", textAlign: "center", borderRadius:"15px"}}>
                    <h5 className="heading" style={{letterSpacing:"3.5px", color:"#F3DC8B"}}>GOLD</h5>

                    <div className="pricing-display">
                        <span className="currency-symbol">₱</span>
                        <span className="price-amount">1500</span>
                        <span className="per-month">/mo</span>
                    </div>

                    <ul class="checkmark" style={{padding:"15px"}}>
                    <li className="heading" style={{padding:"5px"}}>Track Energy Consumption <br></br>in Real-time</li>
                    <li className="heading" style={{padding:"5px"}}>View and Calculate Power/<br></br>Energy Costs</li>
                    <li className="heading" style={{padding:"5px", textAlign:"justified"}}>Personalize your Energy <br></br>Efficiency through Bill <br></br>Tracking, Goal Setting, and<br></br> More!</li>
                    </ul>
                    <button className="button" onClick={navigateToLogin}>GET STARTED</button>
                </div>
            </div>
        </div>
        </div>


    );
}