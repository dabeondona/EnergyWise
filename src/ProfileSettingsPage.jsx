import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import "./css/LP-Styling.css";
import "./css/R-Styling.css";


export default function ProfileSettingsPage() {
    let navigate = useNavigate();
    const [profilePicture, setProfilePicture] = useState(null);
    const [profileImageUrl, setProfileImageUrl] = useState('');

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const [fieldvis1, setFieldVis1] = useState(true);
    const [fieldvis2, setFieldVis2] = useState(true);
    const [fieldvis3, setFieldVis3] = useState(true);

    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    let userId = userDetails.id
    useEffect(() => {
        if(userId) {
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

    const handleImageUpload = async () => {
        if(!profilePicture) {
          alert("Please select a picture to upload.");
          return;
        }
      
        const formData = new FormData();
        formData.append("username", userDetails.username);
        formData.append("picture", profilePicture);
      
        try {
          const response = await axios.post(`http://localhost:8080/user/updatePicture`, formData,
            { headers: {
                "Content-Type": "multipart/form-data",},
            });
          const updatedUserDetails = { ...userDetails, picture: response.data };
          localStorage.setItem("userDetails", JSON.stringify(updatedUserDetails));

          setProfilePicture(null);
          alert("Picture updated successfully!");
          navigate('/rate'); 

        } catch(error) {
          console.error("Failed to upload picture:", error);
          alert("Failed to upload picture.");
        }
      };
      

    const fetchUserDetails = async () => {
        try {
            const userDetailsResponse = await axios.get(`http://localhost:8080/user/getUserDetails`, {
                params: { username: userDetails.username } 
            });
    
            localStorage.setItem('userDetails', JSON.stringify(userDetailsResponse.data));
            setFirstName(userDetailsResponse.data.firstName);
            setLastName(userDetailsResponse.data.lastName);
            setEmail(userDetailsResponse.data.email);

        } catch(error) {
            console.error('Failed to fetch user details:', error);
        }
    };

    const handleUpdate = async () => {
        const isConfirmed = window.confirm('Are you sure you want to do this?');

        if(isConfirmed) {
            const apiUpdateProfileSettingsUrl = 'http://localhost:8080/user/updateUser';
            const userId = parseInt(userDetails.id, 10)
        
            const content = {};  
            if(firstName !== userDetails.firstName && firstName !== '') {
                content.firstname = firstName;
            }
            if(lastName !== userDetails.lastName && lastName !== '') {
                content.lastname = lastName;
            }
            if(email !== userDetails.email && email !== '') {
                content.email = email;
            }
        
            if(Object.keys(content).length === 0) {
                alert('No changes to update.');
                return;
            }
        
            try {
                const response = await axios.put(`${apiUpdateProfileSettingsUrl}/${userId}`, content);
                console.log('User updated successfully:', response.data);

                await fetchUserDetails();
                navigate('/dashboard'); 
                alert('User updated successfully!');
            } catch(error) {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if(error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
            }
        } else {
            navigate('/rate');
        }
    }

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

    function navigateUpdatePassword() {
        navigate('/updatepassword');
    }
    
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
                    <hr style={{marginTop:"400px"}}></hr>
                    <li><NavLink to="/login" activeClassName="active">Logout</NavLink></li>
                </ul>
            </div>

            <div style={{display:"flex", justifyContent:"center", marginLeft:'120px', gap:"30px", alignItems:"center", height:"28vh"}}>
                <div style={{ position: 'relative', display: 'inline-block' }}>
                    <button
                        onClick={() => document.getElementById('fileInput').click()}
                        style={{
                        position: 'absolute',
                        top: '5px', 
                        right: '5px', 
                        background: '#04364A',
                        color: 'white',
                        borderRadius: '50%',
                        width: '30px',
                        height: '30px',
                        textAlign: 'center',
                        lineHeight: '30px',
                        border: 'none',
                        cursor: 'pointer',
                        }}
                    >✏️</button>
                    <img
                        src={profileImageUrl}
                        style={{
                            width: '150px',
                            height: '150px',
                            borderRadius: '50%', 
                            border: '5px solid #04364A',
                            objectFit: 'cover', 
                            display: 'block',
                            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)'
                        }} alt="Profile"/>
                    {profilePicture && (
                        <button
                        onClick={handleImageUpload}
                        style={{
                            position: 'absolute',
                            bottom: '10px', 
                            right: '10px', 
                            background: '#04364A', 
                            color: 'white',
                            borderRadius: '50%',
                            textAlign: 'center',
                            lineHeight: '30px',
                            border: 'none',
                            cursor: 'pointer',
                        }}>✔️</button>
                    )}
                   
                </div>
                <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setProfilePicture(e.target.files[0])}
                    style={{ display: 'none' }}
                />
                    
             

                <span style={{marginTop:"35px"}}>
                    <h4 className='heading' style={{textAlign:"left"}}>{userDetails.username}</h4>
                    <p style={{fontFamily:"Robot-Medium, Helvetica", fontWeight:"550", color:"#04364A"}}>{userDetails.email}</p>
                </span>
            </div>

            <div style={{marginLeft:"500px", marginTop:"25px"}}>
                <h3 className="heading" style={{textAlign:"left", marginLeft:"25px"}}>Personal Settings</h3>
                <hr style={{width:"80%"}}></hr>
            </div>

            <div style={{display:"grid", justifyContent:"center", alignItems:"center", height:"28vh", marginRight:"300px", marginTop:"20px", marginBottom:"30px"}}>
                <div style={{display:"flex"}}>
                    <h5 className="regular" style={{marginTop:"13px"}}>First Name:</h5>
                    <input type='text' 
                        className="input-field" 
                        disabled={fieldvis1}
                        placeholder={userDetails.firstName} 
                        onChange={(e) => setFirstName(e.target.value)}
                        style={{backgroundColor: fieldvis1 ? "#D9D9D9" : "#F6F6F6", color:"#A6A6A6", marginLeft:"43px", marginRight:"40px", width:"230%"}}/>
                    <button className='button' onClick={handleVisibility1}>CHANGE</button>
                </div>

                <div style={{display:"flex", flex:"1"}}>
                    <h5 className="regular" style={{marginTop:"13px"}}>Last Name:</h5>
                    <input type='text' 
                        className="input-field" 
                        disabled={fieldvis2}
                        placeholder={userDetails.lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        style={{backgroundColor: fieldvis2 ? "#D9D9D9" : "#F6F6F6", color:"#A6A6A6", marginLeft:"43px", marginRight:"40px", width:"230%"}}/>
                    <button className='button' onClick={handleVisibility2}>CHANGE</button>
                </div>

                <div style={{display:"flex"}}>
                    <h5 className="regular" style={{marginTop:"13px"}}>Account Email:</h5>
                    <input type='text' 
                        className="input-field" 
                        disabled={fieldvis3}
                        placeholder={userDetails.email} 
                        onChange={(e) => setEmail(e.target.value)}
                        style={{backgroundColor: fieldvis3 ? "#D9D9D9" : "#F6F6F6", color:"#A6A6A6", marginLeft:"30px", marginRight:"40px", width:"230%"}}/>
                    <button className='button' onClick={handleVisibility3}>CHANGE</button>
                </div>
            </div>

            <div>
                <div style={{marginLeft:"800px", marginTop:"40px", justifyContent:"center", alignItems:"center"}}>
                    <button 
                        className="button" 
                        style={{width:"40%", marginBottom:"150px"}}
                        onClick={handleUpdate}
                    >CONFIRM</button>
                </div>
            </div>

            <div style={{marginLeft:"500px"}}>
                <h3 className="heading" style={{textAlign:"left", marginLeft:"25px"}}>Password Settings</h3>
                <hr style={{width:"80%"}}></hr>
            </div>

            <div>
                <div style={{marginLeft:"800px", marginTop:"40px", justifyContent:"center", alignItems:"center"}}>
                    <button 
                        className="button" 
                        style={{width:"40%", marginBottom:"15px"}}
                        onClick={navigateUpdatePassword}
                    >UPDATE</button>
                </div>
            </div>

        </>
    );
}