import React, { useState } from "react";
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import {Navbar, Nav } from "react-bootstrap";
import {useNavigate ,Link } from "react-router-dom";
import "./css/LandingPage.css"; 
import "./css/C-Styling.css";
import "bootstrap/dist/css/bootstrap.min.css";


export default function ContactPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [msg, setMsg] = useState("");

    let navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login'); 
    };
    
    const sendMsg = async (e) => {
      e.preventDefault();

      if(!name.trim() || !email.trim() || !msg.trim()) {
        alert("Please fill in all fields");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
          alert("Please enter a valid email address");
          return;
      }

      const minWordCount = 5; 
      if (msg.trim().split(/\s+/).length < minWordCount) {
          alert(`Please enter a message with at least ${minWordCount} words`);
          return;
      }

        try {
          const response = await axios.post('http://localhost:8080/contact/insertMsg', {
              contact_name: name, 
              contact_email: email,   
              contact_message: msg,
          });

          if (response.status === 200) { 
              console.log(response.data);
              alert('Message Sent!');
              navigate('/'); 
          } else {
              console.log(response.data);
              throw new Error('Unexpected Error');
          }

      } catch (err) {
        console.error('Error:', err);
        alert('Failed to send message. Please try again.');
      }
    }

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
                        <button onClick={handleLoginClick}>LOG IN</button>
                      </div>
                    </Navbar.Collapse>
                        </Navbar>
          
              <div data-aos="fade-up" className="container-1" style={{backgroundColor:"#ffffff"}}>Contact Us
              </div>
              <div data-aos="fade-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'start', flexWrap: 'wrap' }}>
                <div className="contact-form-container" style={{flex: '1', margin: '10px', padding:"25px", backgroundColor:"#F5FCFF", display:"block"}}>
                  <h5 className="heading">Send us a Message!</h5>
                  <input type="text" className="input-field" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}></input>
                  <input type="text" className="input-field" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                  <textarea type="text" className="input-field" style={{paddingTop:"10px", paddingBottom:"50px"}} placeholder="Message" value={msg} onChange={(e) => setMsg(e.target.value)}></textarea>
                  <button className="button" onClick={sendMsg}>SEND</button>
                </div>
                <div><hr></hr></div>
                <div className="address-support-container" style={{flex: '1', margin: '10px', padding:"25px", backgroundColor:"#F5FCFF"}}>
                  <h5 className="heading">Address</h5>
                  <ul>
                  <li style={{color:"#04364a", fontWeight:"0", fontFamily:"Robot-Regular, Helvetica"}}>N. Bacalso Avenue, Cebu City, Philippines</li>
                  </ul>

                  <div style={{paddingTop:"50px"}}>
                    <h5 className="heading">Support</h5>
                    <ul>
                    <li style={{color:"#04364a", fontWeight:"0", fontFamily:"Robot-Regular, Helvetica"}}>energywise.support@energywise.com</li>
                    <li style={{color:"#04364a", fontWeight:"0", fontFamily:"Robot-Regular, Helvetica"}}>+21 1744 868</li>
                    </ul>
                  </div>
                </div>
              </div>
              
             
        </div>

        </div>


    );
}