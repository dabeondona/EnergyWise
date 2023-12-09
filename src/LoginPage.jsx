import React, {useState, useRef, useContext} from "react";
import {AuthContext} from "./context/AuthProvider";
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
            const adminLoginResponse = await axios.post('http://localhost:8080/admin/login', {
                username,
                password
            });
            localStorage.setItem('token', adminLoginResponse.data.jwtToken);
            await fetchAdminDetails(username);
            setAuth(true);
            navigate('/admin-dashboard');

        } catch (adminError) {
            if ((adminError.response && adminError.response.status === 401) || (adminError.response && adminError.response.status === 404)) {
                try {
                    const userLoginResponse = await axios.post('http://localhost:8080/user/login', {
                        username,
                        password
                    });
                    localStorage.setItem('token', userLoginResponse.data.jwtToken);
                    console.log(localStorage.getItem('token'))
                    await fetchUserDetails(username);
                    setAuth(true);
                    navigate('/rate'); 

                } catch (userError) {
                    handleLoginError(userError);
                }
            } else {
                handleLoginError(adminError);
            }
        }
    };

    const fetchUserDetails = async (username) => {
        try {
            const userDetailsResponse = await axios.get(`http://localhost:8080/user/getUserDetails`, {
                params: { username }
            });

            localStorage.setItem('userDetails', JSON.stringify(userDetailsResponse.data));
        } catch (error) {
            console.error('Failed to fetch details:', error);
        }
    };

    const fetchAdminDetails = async (username) => {
        try {
            const adminDetailsResponse = await axios.get(`http://localhost:8080/admin/getAdminDetails`, {
                params: { username }
            });

            localStorage.setItem('adminDetails', JSON.stringify(adminDetailsResponse.data));
        } catch (error) {
            console.error('Failed to fetch details:', error);
        }
    };

    const handleLoginError = (error) => {
        if (!error.response) {
            setErrMsg('No server response.');
        } else if (error.response.status === 401) {
            setErrMsg('Unauthorized. Please check your username and password.');
            console.log(error)
            alert('Incorrect username or password.');
        } else {
            setErrMsg('Login failed. Please try again later.');
            alert('Login failed. Please try again later.');
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