import React from "react";
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import "./css/App.css";
import { Navbar, Nav } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import "./css/LandingPage.css";
import "./css/Aboutus.css";

const AboutUs = () => {
  
  let navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login'); 
  };

  AOS.init();  
  return (
    <div className="about-us">
      <div className="div">
              
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
          
              <div data-aos="fade-up" className="container-1">About Us
                    <p className="p">Every journey comes with a story.</p>
              </div>
          
               <div data-aos="fade-in" className="container-2">
                <div>
                <img
                    className="image-container-1"
                    alt="Streisand"
                    src="streisand.png"
                  />
                </div>
                
                      <div className="p-container">
                        <span className="sub-head">2005</span>
                        <p className="paragraph">
                            The story starts in 2005, when The Streisand Company, a consulting
                            firm founded by Dave Ondona, provided solutions to the ever-growing
                            problems in the Energy Industry. Over the years, their innovative
                            approaches and sustainable solutions made them a beacon in the
                            sector. By 2015, Streisand had established itself as one of the
                            premier consulting businesses in the country.
                          </p>
                      </div>
                 
                 
               </div>

               <div data-aos="fade-in" className="container-3">
               <p className="paragraph">
                  As Streisand celebrated its decade of success, Dave Ondona realized
                  that while they had been instrumental in transforming large-scale
                  energy operations, there was a significant portion of the market
                  they hadn't touched – the homeowners and small businesses. Motivated
                  by this new vision, The company founder embarked on a journey to
                  adapt their expertise for a more diverse clientele.
                </p>
               </div>

              <div data-aos="fade-up"
                  data-aos-offset="200"
                  data-aos-delay="50"
                  data-aos-duration="500"
                  data-aos-easing="ease-in-out"
                  data-aos-mirror="true"
                  data-aos-once="false"
                  data-aos-anchor-placement="top-center" >
               <div className="container-4">
                <div>
                <img
                    className="image-container-2"
                    alt="The Fourward Thinkers"
                    src="fourward-thinkers.png"
                  />
                </div>
                
                      <div className="p-container">
                        <span className="sub-head">2023</span>
                        <p className="paragraph">
                        Fast Forward to 2023, Dave Ondona, with a stroke of luck, gathered a group of like-minded
                         individuals namely, Princess Salaom, Adrian Sepulveda, and Felix Vilocura. united by a shared goal:
                          to innovate within the energy sector for homeowners and businesses alike. Together, they established 
                          The Fourward Thinkers, a company committed to pioneering change. Their mission was clear: to develop an
                           Energy Management Software that harnesses the power of real-time analytical data.
                          </p>
                      </div>       
               </div>
          
      
               <div className="container-5">
                  <div>
                  <img
                      className="image-container-3"
                      alt="Divider"
                      src="divider.png"
                    />
                  </div>
               
                  <img
                      className="image-container-4"
                      alt="EnergyWise Logo"
                      src="energywise_logo.png"
                    />
            
                </div>
                <div>
                <p className="motto">“Progressive Thinking towards Energy Efficiency”</p>
                </div>
              </div>

              <div data-aos="fade-up"
                  data-aos-offset="100"
                  data-aos-delay="50"
                  data-aos-duration="500"
                  data-aos-easing="ease-in-out"
                  data-aos-mirror="true"
                  data-aos-once="false"
                  data-aos-anchor-placement="top-center">
                <div style={{marginTop:"150px"}}>
                <p className="sub-text">Our Team</p>
                </div>

                <div className="container-6">
                  <div className="card-1">
                  <img
                      className="img-person"
                      alt="Dave Francis Ondona"
                      src="ondona-dave.png"
                    />
                    <p className="text">Dave Ondona</p>
                    <p className="position">
                        Co-Founder
                        <br />
                        Chief Executive
                      </p>
                  </div>

                  <div className="card-2">
                  <img
                      className="img-person"
                      alt="Princess Jane Salaom"
                      src="salaom-jane.png"
                    />
                    <p className="text">Jane Salaom</p>
                    <p className="position">
                       Co-Founder
                      <br />
                      Chief of Innovation
                      <br />
                      Chief of Design
                      </p>
                  </div>

                  <div className="card-3">
                  <img
                      className="img-person"
                      alt="Felix Vilocura II"
                      src="vilocura-felix.png"
                    />
                    <p className="text">Felix Vilocura II</p>
                    <p className="position">
                        Co-Founder
                        <br />
                        Chief of Operations
                        <br />
                        Chief of Information
                      </p>
                    
                  </div>

                  <div className="card-4">
                  <img
                      className="img-person"
                      alt="Adrian Sepulveda"
                      src="sepulveda-adrian.png"
                    />
                    <p className="text">Adrian Sepulveda</p>
                    <p className="position">
                        Co-Founder
                        <br />
                        Chief of Technology
                      </p>
                  </div>
                
                </div>
                <p className="motto">When in Doubt, use ChatGPT</p>
            </div>    

        <div className="container-7">
          <p className="copyright">
            © 2023 The Fourward Thinkers. All rights reserved.
          </p>
        </div>

      </div>
    </div>
  );
};

export default AboutUs;
