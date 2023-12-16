import NotificationsIcon from '@mui/icons-material/Notifications';
import { IconButton } from '@mui/material';
import 'aos/dist/aos.css';
import axios from 'axios';
import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import BoxProfile from './BoxProfile';
import { AuthContext } from "./context/AuthProvider";
import "./css/BoxProfile.css";
import "./css/LP-Styling.css";
import "./css/R-Styling.css";

const NotificationItem = ({ message }) => (
    <div className="notification-item" style={{backgroundColor:"#73D2F8", margin:"10px", padding:"10px", borderRadius:"10px"}}>
      {message}
    </div>
  );

export default function RatePage() {
    let navigate = useNavigate();
    const [profileImageUrl, setProfileImageUrl] = useState('');
    const [vnotif, setVNotif] = useState(false);
    const [vprof, setVProf] = useState(false);
    const [notifications, setNotifications] = useState([
        { id: 1, message: "Notification 1" },
        { id: 2, message: "Notification 2" },
    ]);

    const [rates, setRates] = useState({
        month: '',
        price: null,
        price_luzon: null,
        price_mindanao: null,
    });
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const lastMonth = new Date(currentDate.setMonth(currentMonth - 1));
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const lastMonthName = monthNames[lastMonth.getMonth()];
    const [inputtedValue, setInputtedValue] = useState('');
    const [output, setOutput] = useState('');

    const { auth, setAuth } = useContext(AuthContext);

    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    let userId = userDetails.id
    useEffect(() => {
        if (userId) {
            fetchPicture(userId);
        }
    }, [userId]);

    useEffect(() => {
        if(!auth) {
            navigate('/login');
        } else {
            fetchCurrentMonthRate();
        }
    }, [auth, navigate]);

    const fetchPicture = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:8080/user/${userId}/picture`, {
                responseType: 'blob'
            });
    
            const imageUrl = URL.createObjectURL(response.data);
            setProfileImageUrl(imageUrl); 
        } catch(error) {
            console.error('Error fetching the picture:', error);
            setProfileImageUrl(''); 
        }       
    }

    const fetchCurrentMonthRate = async () => {
        try {
            const response = await axios.get('http://localhost:8080/rate/getAllRates');
            const currentMonthIndex = new Date().getMonth(); 
            const currentMonthName = new Date().toLocaleString('default', { month: 'long' });
            const rateForCurrentMonth = response.data.find(rate => {
                const rateMonth = new Date(rate.date).getMonth();
                return rateMonth === currentMonthIndex;
            });

            if(rateForCurrentMonth) {
                setRates({month: currentMonthName, price: rateForCurrentMonth.price, price_luzon: rateForCurrentMonth.price_luzon, price_mindanao: rateForCurrentMonth.price_mindanao,
                });
            }
        } catch(error) {
            console.error('Failed to fetch rates', error);
        }
    };

    function handleNotifVisibility() {
        if(!vnotif) {
            setVNotif(true);
        } else {
            setVNotif(false);
        }
    }

    function handleProfVisibility() {
        if(!vprof) {
            setVProf(true);
        } else {
            setVProf(false);
        }
    }

    const handleLogout = () => {
        localStorage.clear(); 
        setAuth(false); 
        navigate('/login'); 
      };

    const handleCalculation = async (e) => {
        e.preventDefault();
        if(rates.price && inputtedValue) {
            const calculatedOutput = rates.price * inputtedValue;
            setOutput(calculatedOutput.toFixed(2)); 
        }
    };

    return (
        <>

            <div className="navigation">
                <img src="energywise_logo.png" alt="Logo" width="170px" style={{marginLeft:"25px", marginBottom:"50px"}}/>
                <ul className="nav-list">
                    <li><NavLink to="/dashboard" activeClassName="active">Dashboard</NavLink></li>
                    <li><NavLink to="/rate" activeClassName="active">Rate</NavLink></li>
                    <li><NavLink to="/calendar" activeClassName="active">Calendar</NavLink></li>
                    <li><NavLink to="/tips" activeClassName="active">Tips</NavLink></li>
                    <li><NavLink to="/goals" activeClassName="active">Goals</NavLink></li>
                    <hr style={{marginTop:"200px"}}></hr>
                    <li><NavLink to="/login" onClick={handleLogout} activeClassName="active">Logout</NavLink></li>
                </ul>
            </div>
            <div style={{marginLeft:"300px"}}>
                <div style={{display:"flex"}}>
                    <div style={{display:"block"}}>
                        <h3 className="heading" style={{textAlign:"left", marginBottom:"10px", marginTop:"40px", marginLeft:"25px"}}>Energy Rate</h3>
                        <p style={{fontFamily:"Robot-Medium, Helvetica", fontWeight:"550", fontSize:"12.5px", color:"#04364A", marginLeft:"25px"}}>Hi, Welcome {userDetails.firstName} {userDetails.lastName}!</p>
                    </div>
                    <div style={{display:"inline-block", marginTop:"35px", position:"fixed", right:"70px"}}>
                        <IconButton onClick={handleNotifVisibility} style={{border:'none', marginRight:'10px', marginBottom:'30px', background:'none'}}>
                            <NotificationsIcon sx={{ color: '#04364A' }} style={{height: '55px', display: 'block'}} fontSize="large"/>
                        </IconButton>
                        <button onClick={handleProfVisibility} style={{border:'none', padding:'0px', margin:'0px', background:"none"}}>
                            <img src={profileImageUrl} style={{width: '55px', height: '55px', borderRadius: '50%', border: '5px solid #04364A', objectFit: 'cover', display: 'block', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)'}}/>
                        </button>
                    </div>
                        {vnotif && (
                            <div style={{position: "absolute", top:"100px", right:"135px", backgroundColor:"#808080", paddingTop:"10px", paddingRight:"25px", paddingLeft:"25px", paddingBottom:"10px", borderRadius:"20px", zIndex: 100}}>
                                <h1 className="heading" style={{color:"#ffffff", marginBottom:"10px"}}>Notifications</h1>
                                {notifications.map((notif) => (
                                    <NotificationItem key={notif.id} message={notif.message} />
                                ))}
                            </div>
                        )}
                        {vprof && (
                            <div style={{position: "fixed", top:"100px", right:"400px", zIndex: 100}}>
                                <BoxProfile/>
                            </div>
                        )}
                </div>
                <div>
                    <hr style={{width:"98%"}}></hr>
                </div>
            </div>
                <div className="rate-page-container">
                        <div className="rate-info-container">
                                <div className="rate-info-card">
                                    <h3 className="heading" style={{textAlign:"left"}}>Energy Rate</h3>
                                        <div className="region-rates">
                                            <div className="rate-region luzon">
                                                <h3 className="heading">{lastMonthName}</h3> {/* to be changed */}
                                                <div style={{display:"flex", alignItems:"baseline", }}>
                                                    <p className="price" style={{marginTop:"24px", fontSize:"15px"}}>₱</p>
                                                    <p className="price" style={{marginTop:"24px", marginLeft: "12px"}}>{rates.price - 2}</p>
                                                </div>{/* to be changed */}
                                                <p className="unit">1 kWh</p>
                                            </div>
                                            <div className="rate-region mindanao">
                                                <h3 className="heading" style={{color:"#F3DC8B"}}>{rates.month}</h3>
                                                <div style={{display:"flex", alignItems:"baseline", }}>
                                                    <p className="price" style={{marginTop:"24px", fontSize:"15px"}}>₱</p>
                                                    <p className="price" style={{marginTop:"24px", marginLeft: "12px"}}>{rates.price}</p>
                                                </div>
                                                <p className="unit">1 kWh</p>
                                            </div>
                                            <div className="rate-region mindanao">
                                                <h3 className="heading">Expected Change</h3>
                                                <p className="price">-</p>
                                                <p className="unit">1 kWh</p>
                                            </div>
                                        </div>
                                </div>

                                <div className="rate-info-card">
                                    <div className="region-rates">
                                        <div className="rate-region luzon">
                                        <h3 className="heading">Luzon</h3>
                                        <div style={{display:"flex", alignItems:"baseline", }}>
                                            <p className="price" style={{marginTop:"24px", fontSize:"15px"}}>₱</p>
                                            <p className="price" style={{marginTop:"24px", marginLeft: "12px"}}>{rates.price_luzon}</p>
                                        </div>
                                        <p className="unit">1 kWh</p>
                                        </div>
                                        <div className="rate-region mindanao">
                                        <h3 className="heading">Mindanao</h3>
                                        <div style={{display:"flex", alignItems:"baseline", }}>
                                            <p className="price" style={{marginTop:"24px", fontSize:"15px"}}>₱</p>
                                            <p className="price" style={{marginTop:"24px", marginLeft: "12px"}}>{rates.price_mindanao}</p>
                                        </div>
                                        <p className="unit">1 kWh</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="rate-info-card" style={{paddingBottom:"30px"}}>
                                    <h3 className="heading" style={{textAlign:"left"}}>Energy Calculator</h3>
                                    <input type='text'
                                        id='energyUsage'
                                        autoComplete="off"
                                        required
                                        className="input-field"
                                        placeholder="Enter energy usage"
                                        value={inputtedValue}
                                        onChange={(e) => setInputtedValue(e.target.value)}
                                        style={{backgroundColor:"#F6F6F6", color:"#A6A6A6", marginLeft:"50px"}} />
                                    <input type='text'
                                        disabled="true"
                                        className="input-field"
                                        placeholder={output ? `₱ ${output}` : ""}
                                        style={{backgroundColor:"#D9D9D9", color:"#ffffff", marginLeft:"50px"}} />
                                    <button className="button" style={{marginLeft:"50px"}}onClick={handleCalculation}>Calculate</button>
                                </div>
                        </div>
                </div>
        </>
    
    );
};
