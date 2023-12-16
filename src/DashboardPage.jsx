import NotificationsIcon from '@mui/icons-material/Notifications';
import { IconButton } from '@mui/material';
import 'aos/dist/aos.css';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import BoxProfile from './BoxProfile';
import { AuthContext } from "./context/AuthProvider";
import "./css/BoxProfile.css";
import "./css/LP-Styling.css";
import "./css/R-Styling.css";

const NotificationItem = ({ message }) => (
    <div style={{backgroundColor:"#73D2F8", margin:"10px", padding:"10px", borderRadius:"10px"}}>
      {message}
    </div>
  );

export default function DashboardPage() {
    let navigate = useNavigate();
    const [profileImageUrl, setProfileImageUrl] = useState('');
    const [vnotif, setVNotif] = useState(false);
    const [vprof, setVProf] = useState(false);
    const [notifications, setNotifications] = useState([
        { id: 1, message: "Notification 1" },
        { id: 2, message: "Notification 2" },
    ]);
    const { auth, setAuth } = useContext(AuthContext);

    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    let userId = userDetails.id
    useEffect(() => {
        if(userId) {
            fetchPicture(userId);
        }
    }, [userId]);

    useEffect(() => {
        if(!auth) {
            navigate('/login');
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

    function handleLogout() {
        localStorage.clear(); 
        setAuth(false); 
        navigate('/login'); 
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
                        <h3 className="heading" style={{textAlign:"left", marginBottom:"10px", marginTop:"40px", marginLeft:"25px"}}>Dashboard</h3>
                        <p style={{fontFamily:"Robot-Medium, Helvetica", fontWeight:"550", fontSize:"12.5px", color:"#04364A", marginLeft:"25px"}}>Hi, Welcome to your Energy Management Dashboard</p>
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
        </>
    );
}