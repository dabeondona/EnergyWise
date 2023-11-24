import React, {useState} from "react";
import {useNavigate, Link} from 'react-router-dom';
import axios from 'axios';
import "./RP-Styling.css";

export default function RegistrationPage() {
    let navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegistration = () => {
        axios.post('http://localhost:8080/user/register', {
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        })
        .then(response => {
            console.log(response.data);
            alert('Registration successful!');
            navigate('/login'); // Redirect to the home page after successful registration
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred during registration');
        });
    };

    function NavigationBar() {
        return (
            <nav className="navbar-sub">
                <Link to="/" className="heading-a">HOME</Link>
                <Link to="/about-us" className="heading-a">ABOUT US</Link>
                <Link to="/pricing" className="heading-a">PRICING</Link>
            </nav>
        );
    }

   
    return (
            <div className="main">

            <div className="image-container">
                <img src="Register-3D.png" alt="Register-vector-3D" className="register-3D" />
            </div>
                <NavigationBar/>
                <div className="signin">
                    <img className="logo-energywise" alt="company_logo" src="energywise_logo.png" width="250" />
                    <p className="heading">Create an Account</p>
                    <div className="components">
                    <input type='text' className="input-field" placeholder="Enter First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    <input type='text' className="input-field" placeholder="Enter Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    <input type='text' className="input-field" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input type='text' className="input-field" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type='password' className="input-field" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <input type='password' className="input-field" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

                    <button className="button" onClick={handleRegistration}>REGISTER</button>
                    <p className="subtext">By continuing, you agree to EnergyWise’s <span className="sub-link">Terms of Service</span> and acknowledge our <span className="sub-link">Privacy and Policy.</span></p>

                </div>
           
            </div>
        </div>
    );
};