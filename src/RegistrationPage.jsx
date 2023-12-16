import axios from 'axios';
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "./css/RP-Styling.css";

export default function RegistrationPage() {
    let navigate = useNavigate();

    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    const errRef = useRef();
  
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    const [passwordShown, setPasswordShown] = useState(false);
    const [password, setPassword] = useState('');
    const [validpassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState('');
    const [validconfirmpassword, setValidConfirmPassword] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        const result = PWD_REGEX.test(password);
        console.log(result);
        console.log(password);
        setValidPassword(result);
        const match = password === confirmPassword;
        setValidConfirmPassword(match);
    }, [password, confirmPassword])

    useEffect(() => {
        setErrMsg('');
    }, [username, password, confirmPassword])

    const handleRegistration = async (e) => {
        e.preventDefault();

        const verify = PWD_REGEX.test(password);
        if(!verify) {
            setErrMsg('Invalid Entry');
            return;
        } else if(password !== confirmPassword) {
            setErrMsg('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/user/insertUser', {
                firstname: firstName, 
                lastname: lastName,   
                username: username,
                email: email,
                password: password,
            });
    
            if(response.status === 201) { 
                console.log(response.data);
                alert('Registration successful!');
                navigate('/login'); 
            } else {
                throw new Error('Registration failed');
            }
    
        } catch(err) {
            if(!err?.response) {
                setErrMsg('No Server Response');
                console.error('No response received:', err);
            } else if(err.response?.status === 409) { 
                setErrMsg('Username is already taken.');
            } else {
                setErrMsg('Registration failed.');
            }
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordShown(passwordShown => !passwordShown);
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

   
    return (
        <div className="main">
            <div className="image-container">
                <img src="Register-3D.png" alt="Register-vector-3D" className="register-3D" />
            </div>
            
                <NavigationBar/>

                <div className="signin">
                    <img className="logo-energywise" alt="company_logo" src="energywise_logo.png" width="250" />
                    <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} style={{letterSpacing:'1px', fontFamily:'"Roboto-SemiBold", Helvetica',textAlign:'center',color:'#ff2400', fontWeight:'400', marginBottom:'0px', fontSize:"15px"}} aria-live="assertive">{errMsg}</p>
                    <p className="heading">Create an Account</p>
                        <div className="components">
                            <input type='text' id='fn' autoComplete='off' required className="input-field" placeholder="Enter First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            <input type='text' id='ln' autoComplete='off' required className="input-field" placeholder="Enter Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            <input type='text' id='usrn' autoComplete='off' required className="input-field" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                            <input type='text' id='ueml' autoComplete='off' required className="input-field" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <input type={passwordShown ? "text" : "password"} required onFocus={() => setPasswordFocus(true)} onBlur={() => setPasswordFocus(false)} className="input-field" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            
                            {passwordFocus && !validpassword ? <><p id='pwdnote' style={{letterSpacing:'1px', fontFamily:'"Roboto-SemiBold", Helvetica',textAlign:'center',color:'#ff2400', fontWeight:'400', marginBottom:'10px', fontSize:"15px"}}>8 to 24 characters.<br></br>Must include a combination of uppercase and <br></br>lowercase letters, as well as special characters.<br/><br/>Allowed special characters: ! @ # $ %</p></>:<></>}
                            <button className="button" onClick={togglePasswordVisibility}>
                                {passwordShown ? "Hide" : "Show"}
                            </button>
                            <input type='password' required onFocus={() => setMatchFocus(true)} onBlur={() => setMatchFocus(false)} className="input-field" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            
                            {matchFocus && !validconfirmpassword ? <><p id='pwdnote' style={{letterSpacing:'1px', fontFamily:'"Roboto-SemiBold", Helvetica',textAlign:'center',color:'#ff2400', fontWeight:'400', marginBottom:'10px', fontSize:"15px"}}>Must match the primary password field.</p></>:<></>}
                            <button disabled={!validpassword || !validconfirmpassword} className="button" style={{ backgroundColor: !validpassword || !validconfirmpassword ? 'gray' : '#73D2F8' }} onClick={handleRegistration}>
                                REGISTER
                            </button>
                            <p className="subtext">By continuing, you agree to EnergyWise’s <span className="sub-link">Terms of Service</span> and acknowledge our <span className="sub-link">Privacy and Policy.</span></p>
                        </div>
                </div>
        </div>
    );
};