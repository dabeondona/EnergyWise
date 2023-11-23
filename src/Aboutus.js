import React from "react";
import { Group } from "./Group";
import { useNavigate } from "react-router-dom";
import "./App.css";
import "./Aboutus.css";

const App = () => {
  let navigate = useNavigate();

  const loginpage = () => {
    navigate("/")
  }
  return (
    <div className="about-us">
      <div className="div">
        <div className="overlap">
          <div className="overlap-2">
            <div className="group-2">
              <button className="text-wrapper-2">HOME</button>
              <button className="text-wrapper-3">ABOUT US</button>
              <button className="text-wrapper-4">PRICING</button>
              <img className="line" alt="Line" src="line-53.png" />
              <div className="group-3">
                <button className="text-wrapper-5" onClick={loginpage}>LOG IN</button>
              </div>
            </div>
            <Group
              className="group-4"
              divClassName="group-4-instance"
              rectangleClassName="group-instance"
            />
          </div>
          <img
            className="logo-energywise"
            alt="Logo energywise"
            src="logo-energywise-5.png"
          />
          <div className="text-wrapper-6">About Us</div>
          <p className="p">Every journey comes with a story.</p>
        </div>
        <img
          className="img"
          alt="Logo energywise"
          src="logo-energywise-6.png"
        />
        <div className="text-wrapper-7">Our Team</div>
        <p className="text-wrapper-8">
          “Progressive Thinking towards Energy Efficiency”
        </p>
        <div className="overlap-3">
          <p className="text-wrapper-9">
            The story starts in 2005, when The Streisand Company, a consulting
            firm founded by Dave Ondona, provided solutions to the ever-growing
            problems in the Energy Industry. Over the years, their innovative
            approaches and sustainable solutions made them a beacon in the
            sector. By 2015, Streisand had established itself as one of the
            premier consulting businesses in the country.
          </p>
          <p className="as-streisand">
            As Streisand celebrated its decade of success, Dave Ondona realized
            that while they had been instrumental in transforming large-scale
            energy operations, there was a significant portion of the market
            they hadn't touched – the homeowners and small businesses. Motivated
            by this new vision, The company founder embarked on a journey to
            adapt their expertise for a more diverse clientele.
          </p>
          <img
            className="photoshop"
            alt="Photoshop"
            src="photoshop-lgddh6iq8j-1.png"
          />
        </div>
        <div className="text-wrapper-10">2005</div>
        <p className="fast-forward-to">
          <span className="span">Fast Forward to 2023, </span>
          <span className="text-wrapper-11">Dave Ondona</span>
          <span className="span">
            , with a stroke of luck, gathered a group of like-minded individuals
            namely,{" "}
          </span>
          <span className="text-wrapper-11">Princess Salaom</span>
          <span className="span">, </span>
          <span className="text-wrapper-11">Adrian Sepulveda</span>
          <span className="span">, and </span>
          <span className="text-wrapper-11">Felix Vilocura</span>
          <span className="span">
            . united by a shared goal: to innovate within the energy sector for
            homeowners and businesses alike. Together, they established The
            Fourward Thinkers, a company committed to pioneering change. Their
            mission was clear: to develop an Energy Management Software that
            harnesses the power of real-time analytical data.
          </span>
        </p>
        <div className="text-wrapper-12">2023</div>
        <img className="line-2" alt="Line" src="Line-53.png" />
        <img className="ondona" alt="Ondona" src="ondona.png" />
        <img className="ellipse" alt="Ellipse" src="Jane.png" />
        <img className="sepulveda" alt="Sepulveda" src="sepulveda.png" />
        <div className="div-wrapper">
          <p className="text-wrapper-13">
            © 2023 The Fourward Thinkers. All rights reserved.
          </p>
        </div>
        <div className="text-wrapper-14">Dave Ondona</div>
        <div className="co-founder-chief-of">
          Co-Founder
          <br />
          Chief of Technology
        </div>
        <p className="co-founder-chief-of-2">
          Co-Founder
          <br />
          Chief of Operations
          <br />
          Chief of Information
        </p>
        <p className="co-founder-chief-of-3">
          Co-Founder
          <br />
          Chief of Innovation
          <br />
          Chief of Design
        </p>
        <div className="co-founder-chief">
          Co-Founder
          <br />
          Chief Executive
        </div>
        <div className="text-wrapper-15">Adrian Sepulveda</div>
        <div className="text-wrapper-16">Felix Vilocura</div>
        <div className="text-wrapper-17">Jane Salaom</div>
        <img
          className="initial-logo"
          alt="Initial logo"
          src="fourwardthinkers.png"
        />
        <img className="mask-group" alt="Mask group" src="Felix.png" />
      </div>
    </div>
  );
};

export default App;
