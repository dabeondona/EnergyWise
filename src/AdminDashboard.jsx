import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import "./css/LP-Styling.css";
import "./css/R-Styling.css";

export default function AdminDashboard() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async (e) => {
        try {
            const response = await axios.get('http://localhost:8080/user/getAllUsers'); 
            setUsers(response.data); // Assuming response.data contains an array of users
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };


    return (
        <div className="main">
            <div className="navigation">
                <img src="energywise_logo.png" alt="Logo" width="170px" style={{ marginLeft: "25px", marginBottom: "50px" }} />
                <ul className="nav-list">
                    <li><NavLink to="/admin-dashboard" activeClassName="active">Dashboard</NavLink></li>
                    <li><NavLink to="/user-lists" activeClassName="active">Users</NavLink></li>
                    <li><NavLink to="/calendar" activeClassName="active">Calendar</NavLink></li>
                    <li><NavLink to="/tips" activeClassName="active">Tips</NavLink></li>
                    <li><NavLink to="/goals" activeClassName="active">Goals</NavLink></li>
                    <hr style={{ marginTop: "400px" }}></hr>
                    <li><NavLink to="/login" activeClassName="active">Logout</NavLink></li>
                </ul>
            </div>
           
           
        </div>
    );
}
