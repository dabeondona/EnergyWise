import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import "./css/LP-Styling.css";
import "./css/R-Styling.css";
import "./css/Userlist.css"

export default function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/user/getAllUsers'); 
            setUsers(response.data); // Assuming response.data contains an array of users
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    function UserTable() {
        return (
            <div>
                <h2>User List</h2>
                <br/>
                <div className="user-table-container">
                    <table className="user-table">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.username}</td>
                                    <td>{user.firstname}</td>
                                    <td>{user.lastname}</td>
                                    <td>{user.email}</td>
                                   
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }


    return (
        <div className="admin-content">
            <p className='header-admin'>Welcome, admin!</p>
                <hr /> 
            <div className="navigation">
                <img src="energywise_logo.png" alt="Logo" width="170px" style={{ marginLeft: "25px", marginBottom: "50px" }} />
                <ul className="nav-list">
                    <li><NavLink to="/user-lists" activeClassName="active">Users</NavLink></li>
                    <li><NavLink to="/admin-tips" activeClassName="active">Tips</NavLink></li>
                    <li><NavLink to="/login" activeClassName="active">Logout</NavLink></li>
                </ul>
            </div>
            <div className="user-list-container">
                <UserTable />
            </div>      
        </div>

        
    );
}
