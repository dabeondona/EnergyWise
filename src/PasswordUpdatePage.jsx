import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./css/LP-Styling.css";
import "./css/R-Styling.css";

export default function PasswordUpdatePage() {
    let navigate = useNavigate();

    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

    const togglePasswordVisibility = () => {
        setPasswordShown(passwordShown => !passwordShown);
    };

    const [passwordShown, setPasswordShown] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [validpassword, setValidPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [matchFocus, setMatchFocus] = useState(false);
    const [validconfirmpassword, setValidConfirmPassword] = useState(false);

    const userDetails = JSON.parse(localStorage.getItem('userDetails'));

    useEffect(() => {
        const result = PWD_REGEX.test(password);
        console.log(result);
        console.log(password);
        setValidPassword(result);
        const match = password === confirmPassword;
        setValidConfirmPassword(match);
    }, [password, confirmPassword])
    
    function navigateToSettings() {
        navigate('/profilesettings')
    }

    async function handleUpdatePassword() {
        if (!validpassword || !validconfirmpassword) {
          alert('Password is invalid or does not match.');
          return;
        }
      
        const isConfirmed = window.confirm('Are you sure you want to update your password?');
      
        if (isConfirmed) {
          const apiUpdatePasswordSettingsUrl = 'http://localhost:8080/user/updatePassword';
          const userId = parseInt(userDetails.id, 10);
      
          const passwordUpdateContent = {
            userId: userId,
            newPassword: password,
          };
      
          try {
            const response = await axios.post(apiUpdatePasswordSettingsUrl, passwordUpdateContent);
            console.log('Password updated successfully:', response.data);
            navigate('/dashboard');
            alert('Password updated successfully!');
          } catch (error) {
            if (error.response) {
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
              alert(error.response.data || "Failed to update password.");
            } else if (error.request) {
              console.log(error.request);
              alert("Failed to update password.");
            } else {
              console.log('Error', error.message);
              alert("An error occurred.");
            }
          }
        }
      }
      

    return (
        <div>
             <button onClick={navigateToSettings} style={{border:'none', padding:'0px', margin:'0px'}}>
                <img src="back.png" style={{height: '50px' }}/>
             </button>

            <div style={{display:"flex", justifyContent:"center", gap:"250px", alignItems:"center", height:"28vh"}}>
            </div>

            <div style={{marginLeft:"400px"}}>
                <h3 className="heading" style={{textAlign:"left", marginLeft:"25px"}}>Password Settings</h3>
                <hr style={{width:"80%"}}></hr>
            </div>

            <div style={{display:"flex", justifyContent:"center", gap:"100px", alignItems:"center", height:"10vh", marginLeft:"0px"}}>
                <div style={{display:"flex"}}>
                    <h5 className="regular" style={{marginTop:"22px"}}>Password:</h5>
                    <input type={passwordShown ? "text" : "password"}
                        className="input-field" 
                        placeholder="Enter Password" 
                        onFocus={() => setPasswordFocus(true)} 
                        onBlur={() => setPasswordFocus(false)} 
                        onChange={(e) => setPassword(e.target.value)}
                        style={{backgroundColor:"#F6F6F6", color:"#A6A6A6", marginLeft:"30px", marginRight:"40px", width:"230%"}}/>
                    <button className="button" onClick={togglePasswordVisibility}>
                        {passwordShown ? "Hide" : "Show"}
                    </button>
                </div>

                <div style={{display:"flex"}}>
                    <h5 className="regular" style={{marginTop:"15px"}}>Re-enter Password:</h5>
                    <input type='password' 
                        className="input-field" 
                        onFocus={() => setMatchFocus(true)} 
                        onBlur={() => setMatchFocus(false)}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        style={{backgroundColor:"#F6F6F6", color:"#A6A6A6", marginLeft:"20px"}}/>
                </div>
            </div>

            <div>
                <div style={{marginLeft:"720px", marginTop:"40px", justifyContent:"center", alignItems:"center"}}>
                    <div style={{marginRight:"700px"}}>
                        {passwordFocus && !validpassword ? <><p style={{letterSpacing:'1px', fontFamily:'"Roboto-SemiBold", Helvetica',color:'#ff2400',  textAlign:"center", fontWeight:'400', marginBottom:'10px', fontSize:"15px"}}>8 to 24 characters. Must include a combination of uppercase and <br></br>lowercase letters, as well as special characters.<br/><br/>Allowed special characters: ! @ # $ %</p></>:<></>}
                        {matchFocus && !validconfirmpassword ? <><p id='pwdnote' style={{letterSpacing:'1px', fontFamily:'"Roboto-SemiBold", Helvetica', textAlign:'center',color:'#ff2400', fontWeight:'400', marginBottom:'10px', fontSize:"15px"}}>Must match the primary password field.</p></>:<></>}
                    </div>
                    <button 
                        disabled={!validpassword || !validconfirmpassword}
                        className="button" 
                        style={{width:"40%", backgroundColor: !validpassword || !validconfirmpassword ? 'gray' : '#73D2F8', marginBottom:"15px"}}
                        onClick={handleUpdatePassword}
                    >CONFIRM</button>
                </div>
            </div>

        </div>
    );
}