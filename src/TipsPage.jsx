import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthProvider";
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import "./css/LP-Styling.css"
import "./css/R-Styling.css"
import "./css/User-tips.css"


export default function UserTips() {
    
    const [tips, setTips] = useState([]); // Define tips state
    const [modalContent, setModalContent] = useState(''); // Define modalContent state
    const [showModal, setShowModal] = useState(false); // Define showModal state
    const [selectedTip, setSelectedTip] = useState(null);

    const userDetails = JSON.parse(localStorage.getItem('userDetails'))
  
    useEffect(() => {
        // Fetch existing tips from the server when the component mounts
        axios.get('http://localhost:8080/tips/getAllTips')
            .then(response => {
                setTips(response.data);
            })
            .catch(error => {
                console.error('Error fetching tips', error);
            });
    }, []);

    const handleReadMore = (tip) => {
        setSelectedTip(tip);
        setModalContent(tip.content);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedTip(null);
        setModalContent('');
    };
// Close the modal when the close button or overlay is clicked
document.querySelectorAll('.cancel-btn, .custom-overlay').forEach(item => {
    item.addEventListener('click', () => {
        const modal = document.querySelector('.custom-modal');
        const overlay = document.querySelector('.custom-overlay');
        
        // Hide the modal and overlay
        modal.style.display = 'none';
        overlay.style.display = 'none';
    });
});

    
    

    return (
        <div>

            <div className="navigation">
                <img src="energywise_logo.png" alt="Logo" width="170px" style={{marginLeft:"25px", marginBottom:"50px"}}/>
                <ul className="nav-list">
                    <li><NavLink to="/dashboard" activeClassName="active">Dashboard</NavLink></li>
                    <li><NavLink to="/rate" activeClassName="active">Rate</NavLink></li>
                    <li><NavLink to="/calendar" activeClassName="active">Calendar</NavLink></li>
                    <li><NavLink to="/energy-tips" activeClassName="active">Tips</NavLink></li>
                    <li><NavLink to="/goals" activeClassName="active">Goals</NavLink></li>
                    <li><NavLink to="/login" activeClassName="active">Logout</NavLink></li>
                </ul>
            </div>
            <div>
                <h3>Energy Tips</h3>
                <p className="user">Hi, Welcome {userDetails.username}!</p>
               <hr>
               </hr>
            </div>

            <div className="admin-content">
                <h1 className="title-tips">Tips for the Month of <span className="month">December</span></h1>
                <div className="tip-cards">
                    {tips.map((tip, index) => (
                        <div key={index} className="tip-card-1">
                            <h2>{tip.title}</h2>
                            <p>Date: {tip.date}</p>
                            <p>{tip.content}</p>
                        </div>
                    ))}
                </div>
            </div>

          </div>
    );
}