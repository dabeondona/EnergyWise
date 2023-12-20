import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./css/BoxProfile.css";

export default function BoxProfile() {
    const [profileImageUrl, setProfileImageUrl] = useState('');
    let navigate = useNavigate();
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    let userId = userDetails.id
    useEffect(() => {
        if (userId) {
            fetchPicture(userId);
        }
    }, [userId]);

    const fetchPicture = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:8080/user/${userId}/picture`, {
                responseType: 'blob'
            });
    
            const imageUrl = URL.createObjectURL(response.data);
            setProfileImageUrl(imageUrl); 
        } catch (error) {
            console.error('Error fetching the picture:', error);
            setProfileImageUrl(''); 
        }       
    }

    function navigateToProfileSettings() {
        navigate('/profilesettings')
    }

    return (
        <div className="box">
            <div className="group">
                <div className="overlap-group">
                <img className="rectangle" alt="Rectangle" src="rectangle-25.svg" />
                <div className="div" />
                <div className="rectangle-2" />
                <div className="text-wrapper">{userDetails.username}</div>
                <div className="text-wrapper-2">{userDetails.email}</div>
                <div className="text-wrapper-3" onClick={navigateToProfileSettings}>Account Settings</div>
                <img src={profileImageUrl} style={{width: '90px', height: '90px', borderRadius: '50%', border: '5px solid #04364A', objectFit: 'cover', display: 'block'}} className="user-alt-fill-wrapper">
                </img>
                </div>
            </div>
        </div>
    );
}