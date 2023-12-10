import React, {useState, useEffect, useContext} from 'react';
import {AuthContext} from "./context/AuthProvider";
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import "./css/LP-Styling.css"
import "./css/R-Styling.css"

// To be utilized for building and testing functionalities
export default function TestPage() {

    let navigate = useNavigate();

    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [fieldvis1, setFieldVis1] = useState(true);
    const [fieldvis2, setFieldVis2] = useState(true);
    const [fieldvis3, setFieldVis3] = useState(true);
    const [fieldvis4, setFieldVis4] = useState(true);

    const { auth } = useContext(AuthContext);
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));

    function handleVisibility1() {
        if(fieldvis1) {
            setFieldVis1(false);
        } else {
            setFieldVis1(true)
        }
    }

    function handleVisibility2() {
        if(fieldvis2) {
            setFieldVis2(false);
        } else {
            setFieldVis2(true)
        }
    }

    function handleVisibility3() {
        if(fieldvis3) {
            setFieldVis3(false);
        } else {
            setFieldVis3(true)
        }
    }

    function handleVisibility4() {
        if(fieldvis4) {
            setFieldVis4(false);
        } else {
            setFieldVis4(true)
        }
    }

    async function handleUpdate() {   
        const apiUrl = 'http://localhost:8080/user/updateUser';
        const userId = userDetails.user_id; 
    
        const content = {};
    
        if (firstName !== userDetails.firstName && firstName !== '') {
            content.firstName = firstName;
        }
        if (lastName !== userDetails.lastName && lastName !== '') {
            content.lastName = lastName;
        }
        if (email !== userDetails.email && email !== '') {
            content.email = email;
        }
    
        if (Object.keys(content).length === 0) {
            alert('No changes to update.');
            return;
        }
    
        try {
            const response = await axios.put(`${apiUrl}/${userId}`, content);
            console.log('User updated successfully:', response.data);
            navigate('/rate'); 
            localStorage.setItem('userDetails', JSON.stringify({ ...userDetails, ...payload }));
            alert('User updated successfully!');
        } catch (error) {
            console.error('There was an error updating the user:', error);
            alert('Error updating user.');
        }
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

            <div style={{display:"flex", justifyContent:"center", gap:"250px", alignItems:"center", height:"28vh"}}>
                <img src="energywise_logo.png" width="200px"></img>
                <span style={{marginTop:"35px"}}>
                    <h4 className='heading' style={{textAlign:"left"}}>{userDetails.username}</h4>
                    <p style={{fontFamily:"Robot-Medium, Helvetica", fontWeight:"550", color:"#04364A"}}>{userDetails.email}</p>
                </span>
            </div>

            <div style={{marginLeft:"500px"}}>
                <h3 className="heading" style={{textAlign:"left", marginLeft:"25px"}}>Personal Settings</h3>
                <hr style={{width:"80%"}}></hr>
            </div>

            <div style={{display:"grid", justifyContent:"center", alignItems:"center", height:"28vh"}}>
                <div style={{display:"flex"}}>
                    <h5>First Name:</h5>
                    <input type='text' 
                        className="input-field" 
                        disabled={fieldvis1}
                        placeholder={userDetails.firstName} 
                        onChange={(e) => setFirstName(e.target.value)}
                        style={{backgroundColor: fieldvis1 ? "#D9D9D9" : "#F6F6F6", color:"#A6A6A6", marginLeft:"40px", marginRight:"20px"}}/>
                    <button className='button' onClick={handleVisibility1}>CHANGE</button>
                </div>

                <div style={{display:"flex", flex:"1"}}>
                    <h5>Last Name:</h5>
                    <input type='text' 
                        className="input-field" 
                        disabled={fieldvis2}
                        placeholder={userDetails.lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        style={{backgroundColor: fieldvis2 ? "#D9D9D9" : "#F6F6F6", color:"#A6A6A6", marginLeft:"40px", marginRight:"20px"}}/>
                    <button className='button' onClick={handleVisibility2}>CHANGE</button>
                </div>

                <div style={{display:"flex"}}>
                    <h5>Account Email:</h5>
                    <input type='text' 
                        className="input-field" 
                        disabled={fieldvis3}
                        placeholder={userDetails.email} 
                        onChange={(e) => setEmail(e.target.value)}
                        style={{backgroundColor: fieldvis3 ? "#D9D9D9" : "#F6F6F6", color:"#A6A6A6", marginLeft:"30px"}}/>
                    <button className='button' onClick={handleVisibility3}>CHANGE</button>
                </div>
            </div>

            <div style={{marginLeft:"500px"}}>
                <h3 className="heading" style={{textAlign:"left", marginLeft:"25px"}}>Password Settings</h3>
                <hr style={{width:"80%"}}></hr>
            </div>

            <div style={{display:"flex", justifyContent:"center", gap:"250px", alignItems:"center", height:"10vh"}}>
                <div style={{display:"flex"}}>
                    <h5>Password:</h5>
                    <input type={fieldvis4 ? "password" : "text"} 
                        className="input-field" 
                        placeholder="Enter Password" 
                        style={{backgroundColor: fieldvis4 ? "#D9D9D9" : "#F6F6F6", color:"#A6A6A6", marginLeft:"50px", marginRight:"20px"}}/>
                        <button className='button' onClick={handleVisibility4}>CHANGE</button>
                </div>

                <div style={{display:"flex"}}>
                    <h5>Re-enter Password:</h5>
                    <input type='text' 
                        className="input-field" 
                        style={{backgroundColor:"#F6F6F6", color:"#A6A6A6", marginLeft:"50px"}}/>
                </div>
            </div>

            <div style={{display:"flex", justifyContent:"center", alignItems:"center", height:"15vh"}}>
                <div style={{padding:"500px"}}>
                    <button className='button' onClick={handleUpdate}>CONFIRM</button>
                </div>
            </div>

        </div>
    );
}