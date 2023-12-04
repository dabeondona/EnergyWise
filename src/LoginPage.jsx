import React, {useState, useRef, useContext} from "react";
import { AuthContext } from "./context/AuthProvider";
import {useNavigate, Link} from 'react-router-dom';
import axios from 'axios';
import "./css/LP-Styling.css";

export default function LoginPage() {
    const { setAuth } = useContext(AuthContext);
    let navigate = useNavigate();

    const userRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrMsg('');

        try {
            const response = await axios.post('http://localhost:8080/user/login', {
                username,
                password
            });
    
            localStorage.setItem('token', response.data.jwtToken); 
            setAuth(true);
            
            navigate('/testpage'); 
        } catch (err) {
            if (!err.response) {
                setErrMsg('No server response.');
            } else if (err.response.status === 401) {
                setErrMsg('Unauthorized. Please check your username and password.');
            } else {
                setErrMsg('Login failed. Please try again later.');
            }
            errRef.current.focus(); 
        }
    };
    
    const handleRegisterNow = () => {
        navigate('/registration'); 
    };

    function NavigationBar() {
        return (
            <nav className="navbar-sub">
                <Link to="/" className="heading-a">HOME</Link>
                <Link to="/about-us" className="heading-a">ABOUT US</Link>
                <Link to="/contact-us" className="heading-a">CONTACT</Link>
                <Link to="/pricing" className="heading-a">PRICING</Link>
            </nav>
        );
    }

    function BottomSignIn() {
        return (
            <div className="bottom-signin">
                <div className="regular">Don't have an account?</div>
                <button className="regular-button" onClick={handleRegisterNow}>
                Register now
            </button>
            </div>
        );
    }
   
    return (
            <div className="main">

            <div className="image-container">
                <img src="login-3D.png" alt="login-vector-3D" className="login-3D" />
            </div>
                <NavigationBar/>
                <div className="signin">
                    <img className="logo-energywise" alt="company_logo" src="energywise_logo.png" width="250" />
                    <p className="heading">Log in to your account</p>
                    <div className="components">
                        <input type='text' 
                        ref={userRef}
                        id='username'
                        autoComplete="off"
                        required
                        className="input-field" 
                        placeholder="Enter username" 
                        value={username}  
                        onChange={(e) => setUsername(e.target.value)} />
                        <input type='password' 
                        id='password' 
                        className="input-field" 
                        placeholder="Enter password" 
                        value={password}  
                        onChange={(e) => setPassword(e.target.value)} />
                        <button className="button" onClick={handleLogin}>LOG IN</button>
                    </div>
                    <BottomSignIn/>
                </div>
            </div>
    );
};