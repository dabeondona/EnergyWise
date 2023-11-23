import React, {useState} from "react";
import {useNavigate, Link} from 'react-router-dom';
import axios from 'axios';
import "./LP-Styling.css";

export default function LoginPage() {
    let navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        axios.get('http://localhost:8080/user/getAllUsers')
            .then(response => {
                const users = response.data;
                const user = users.find(user => user.username === username && user.password === password);

                if (user) {
                    navigate('/testpage');
                } else {
                    alert('Incorrect username or password');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while logging in');
            });
    };

    function NavigationBar() {
        return (
            <nav className="navbar">
                <Link to="/" className="heading-a">HOME</Link>
                <Link to="/aboutus" className="heading-a">ABOUT US</Link>
                <Link to="/pricing" className="heading-a">PRICING</Link>
            </nav>
        );
    }

    function BottomSignIn() {
        return (
            <div className="bottom-signin">
                <div className="regular">Don't have an account?</div>
                <button className="regular-button">Register now</button>
            </div>
        );
    }
   
    return (
            <div className="main">
                <NavigationBar/>
                <div className="signin">
                    <img className="logo-energywise" alt="company_logo" src="logo_energywise.png" />
                    <p className="heading">Log in to your account</p>
                    <div className="components">
                        <input type='text' 
                        className="input-field" 
                        placeholder="Enter username" 
                        value={username}  
                        onChange={(e) => setUsername(e.target.value)} />
                        <input type='password' className="input-field" placeholder="Enter password" value={password}  onChange={(e) => setPassword(e.target.value)} />
                        <button className="button" onClick={handleLogin}>LOGIN</button>
                    </div>
                    <BottomSignIn/>
                </div>
            </div>
    );
};