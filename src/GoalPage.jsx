import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthProvider";
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import "./css/LP-Styling.css"
import "./css/R-Styling.css"

export default function GoalPage(){

    const [goalname, goalName] = useState('');
    const [targetvalue, setTargetValue] = useState('');
    const [completiondate, setCompletionDate] = useState(''); 


}

return (
    <div>

        <div className="navigation">
            <img src="energywise_logo.png" alt="Logo" width="170px" style={{marginLeft:"25px", marginBottom:"50px"}}/>
            <ul className="nav-list">
                <li><NavLink to="/dashboard" activeClassName="active">Dashboard</NavLink></li>
                <li><NavLink to="/rate" activeClassName="active">Rate</NavLink></li>
                <li><NavLink to="/calendar" activeClassName="active">Calendar</NavLink></li>
                <li><NavLink to="/tips" activeClassName="active">Tips</NavLink></li>
                <li><NavLink to="/goals" activeClassName="active">Goals</NavLink></li>
                <hr style={{marginTop:"400px"}}></hr>
                <li><NavLink to="/login" activeClassName="active">Logout</NavLink></li>
            </ul>
        </div>
        <div style={{marginLeft:"300px", marginTop:"25px"}}>
            <h3 className="">Energy Tips</h3>
            <p>Hi, Welcome {userDetails.username}!</p>
            <hr></hr>
        </div>
            </div>
            
    

);

