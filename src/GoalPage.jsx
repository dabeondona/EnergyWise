import NotificationsIcon from '@mui/icons-material/Notifications';
import { IconButton } from '@mui/material';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker'; // Import the date picker component
import 'react-datepicker/dist/react-datepicker.css'; // Import the default styles
import { NavLink, useNavigate } from 'react-router-dom';
import BoxProfile from './BoxProfile';
import { AuthContext } from "./context/AuthProvider";
import './css/GP-Styling.css';
import "./css/LP-Styling.css";
import "./css/R-Styling.css";

const NotificationItem = ({ message }) => (
  <div className="notification-item" style={{backgroundColor:"#73D2F8", margin:"10px", padding:"10px", borderRadius:"10px"}}>
    {message}
  </div>
);
 
export default function GoalPage() {
  let navigate = useNavigate();
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState('');
  const [userExists, setUserExists] = useState(false);

  const [editingGoal, setEditingGoal] = useState(null);
  const userDetails = JSON.parse(localStorage.getItem('userDetails')); // userDetails.firstName, lastName, email, username
  const [inputtedValue2, setInputtedValue2] = useState(''); // Add separate state for each input
  const [goalForToday, setGoalForToday] = useState('');
  const [toDoContents, setToDoContents] = useState([]); // Add state for To Do contents
  const [selectedDate, setSelectedDate] = useState(new Date()); // State to hold the selected date
  const [vNotif, setVNotif] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);

  const [vProf, setVProf] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState('');

 
  useEffect(() => {
    fetchGoals();
  }, []);

  let userId = userDetails?.id; 
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

    useEffect(() => {
        if(userId) {
            userExistsChecker(userId);
        }
    }, [userId]);

  function handleNotifVisibility() {
    if(!vNotif) {
        setVNotif(true);
    } else {
        setVNotif(false);
    }
}

function handleProfVisibility() {
  if(!vProf) {
      setVProf(true);
  } else {
      setVProf(false);
  }
}

const [notifications, setNotifications] = useState([
  { id: 1, message: "Notification 1" },
  { id: 2, message: "Notification 2" },
]);
  

const userExistsChecker = async (userId) => {
  try {
      const response = await axios.get(`http://localhost:8080/energyTable/user/check/${userId}`);
      setUserExists(response.data); 
      console.log("User exists:", response.data);
  } catch(error) {
      console.error('Error checking user:', error);
  }
};

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
 
  const fetchGoals = async () => {
    try {
      const response = await axios.get('http://localhost:8080/goal/getAllGoals');
      setGoals(response.data);
    } catch (error) {
      console.error('Error fetching goals:', error);
    }
  };
  const handleGoalForTodayChange = (event) => {
    setGoalForToday(event.target.value);
    setToDoContents([event.target.value]); // Set To Do contents to a new array with the current value
  };
   const handleDateChange = (date) => {
    setSelectedDate(date);
  };
 
  const createGoalForToday = () => {
    // Check if both input and date are not empty
    if (inputtedValue2.trim() !== '' && selectedDate) {
      // Add the To Do content and deadline to the array
      setToDoContents([...toDoContents, { content: inputtedValue2, deadline: selectedDate }]);
      setInputtedValue2('');
      setSelectedDate(new Date()); // Reset the date picker to the current date
    }
  };
   // Clear the input after creating the goal.
 
  const handleInputChange = (event) => {
    setNewGoal(event.target.value);
  };

  function handleLogout() {
    localStorage.clear(); 
    setAuth(false); 
    navigate('/login'); 
}
 
  const insertGoal = async () => {
    if (newGoal.trim() !== '') {
      try {
        const response = await axios.post('http://localhost:8080/goal/insertGoal', { goalName: newGoal });
 
        // Send the created goal to the backend using the same endpoint
        await axios.put(`http://localhost:8080/goal/updateGoal/${response.data.goal_id}`, response.data);
 
        setGoals([...goals, response.data]);
        setNewGoal('');
      } catch (error) {
        console.error('Error creating goal:', error);
      }
    }
  };
 
  const updateGoal = async () => {
    if (editingGoal !== null && newGoal.trim() !== '') {
      try {
        const response = await axios.put(`http://localhost:8080/goal/updateGoal/${goals[editingGoal].goal_id}`, {
          goalName: newGoal,
        });
 
        const updatedGoals = [...goals];
        updatedGoals[editingGoal] = response.data;
        setGoals(updatedGoals);
        setNewGoal('');
        setEditingGoal(null);
      } catch (error) {
        console.error('Error updating goal:', error);
      }
    }
  };
 
  const deleteGoal = async (index) => {
    try {
      const deletedGoal = goals[index];
      await axios.delete(`http://localhost:8080/goal/deleteGoal/${deletedGoal.goal_id}`);
 
      // You may choose not to send any request to the backend for a deleted goal
 
      const updatedGoals = goals.filter((_, i) => i !== index);
      setGoals(updatedGoals);
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  };
  return (
    <div>
      <div className="navigation">
        <img src="energywise_logo.png" alt="Logo" width="170px" style={{ marginLeft: "25px", marginBottom: "50px" }} />
        <ul className="nav-list">
          <li><NavLink to="/dashboard" activeClassName="active">Dashboard</NavLink></li>
          <li><NavLink to="/rate" activeClassName="active">Rate</NavLink></li>
          <li><NavLink to="/calendar" activeClassName="active">Calendar</NavLink></li>
          <li><NavLink to="/tips" activeClassName="active">Tips</NavLink></li>
          <li><NavLink to="/goals" activeClassName="active">Goals</NavLink></li>
          <hr style={{ marginTop: "200px" }}></hr>
          <li><NavLink to="/login" activeClassName="active">Logout</NavLink></li>
        </ul>
      </div>
      <div style={{marginLeft:"300px"}}>
                <div style={{display:"flex"}}>
                    <div style={{display:"block"}}>
                        <h3 className="heading" style={{textAlign:"left", marginBottom:"10px", marginTop:"40px", marginLeft:"25px"}}>Goals</h3>
                        <p style={{fontFamily:"Roboto-Medium, Helvetica", fontWeight:"550", fontSize:"12.5px", color:"#04364A", marginLeft:"25px"}}>Hi, Welcome {userDetails.firstName} {userDetails.lastName}!</p>
                    </div>
                    <div style={{display:"inline-block", marginTop:"35px", position:"fixed", right:"70px"}}>
                        <IconButton onClick={handleNotifVisibility} style={{border:'none', marginRight:'10px', marginBottom:'30px', background:'none'}}>
                            <NotificationsIcon sx={{ color: '#04364A' }} style={{height: '55px', display: 'block'}} fontSize="large"/>
                        </IconButton>
                        <button onClick={handleProfVisibility} style={{border:'none', padding:'0px', margin:'0px', background:"none"}}>
                            <img src={profileImageUrl} style={{width: '55px', height: '55px', borderRadius: '50%', border: '5px solid #04364A', objectFit: 'cover', display: 'block', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)'}}/>
                        </button>
                    </div>
                    {vNotif && (
                            <div style={{position: "absolute", top:"100px", right:"135px", backgroundColor:"#808080", paddingTop:"10px", paddingRight:"25px", paddingLeft:"25px", paddingBottom:"10px", borderRadius:"20px", zIndex: 100}}>
                                <h1 className="heading" style={{color:"#ffffff", marginBottom:"10px"}}>Notifications</h1>
                                {notifications.map((notif) => (
                                    <NotificationItem key={notif.id} message={notif.message} />
                                ))}
                            </div>
                        )}
                    {vProf && (
                            <div style={{position: "fixed", top:"100px", right:"400px", zIndex: 100}}>
                                <BoxProfile/>
                            </div>
                        )}
                </div>
                <div>
                    <hr style={{width:"98%"}}></hr>
                </div>
                </div>
      <div className="goal-info-container-1">
        <div className="goal-info-card-1" style={{ paddingBottom: "270px", marginLeft: "290px", marginBottom: "295px", height:"400px",maxHeight: "400px", overflowY: "auto" }}>
          <h3 className="heading" style={{ textAlign: "left" }}>To Do</h3>
          {toDoContents.map((item, index) => (
  <div key={index} style={{ display: 'relative', marginBottom: '10px' }}>
   
    <DatePicker
      selected={item.deadline}
      onChange={(date) => {
        const updatedContents = [...toDoContents];
        updatedContents[index].deadline = date;
        setToDoContents(updatedContents);
      }}
      minDate={new Date()}
      dateFormat="MM/dd/yyyy"
      style={{ marginRight: '10px' }}
    />
    <textarea
      autoComplete="off"
      required
      className="input-field"
      placeholder=""
      value={item.content}
      onChange={(e) => {
        const updatedContents = [...toDoContents];
        updatedContents[index].content = e.target.value;
        setToDoContents(updatedContents);
      }}
      style={{ backgroundColor: "#F6F6F6", color: "#A6A6A6", height: "17px", overflowY: "auto" }}
      readOnly={index !== editingGoal} // Make textarea readonly if it's not in edit mode
    />
    {index === editingGoal ? (
      <>
        <button className='update-button' onClick={() => setEditingGoal(null)} style={{height:"30px", paddingBottom:"10px", marginTop:"15px", marginLeft: '50px' }}>
          Update
        </button>
        <button className='cancel-button' onClick={() => setEditingGoal(null)} style={{height:"30px", paddingBottom:"10px", marginTop:"15px", marginLeft: '5px' }}>
          Cancel
        </button>
      </>
    ) : (
      <button className='edit-button' onClick={() => setEditingGoal(index)} style={{height:"30px", paddingBottom:"10px", marginTop:"15px", marginLeft: '90px' }}>
        Edit
      </button>
    )}
    <button className='delete-button' onClick={() => {
      const updatedContents = [...toDoContents];
      updatedContents.splice(index, 1);
      setToDoContents(updatedContents);
    }} style={{height:"30px", paddingBottom:"10px", marginTop:"15px"}}
    >
      Delete
    </button>
  </div>
))}
        </div>
      </div>
      <div className="goal-info-container-2">
  <div className="goal-info-card-2" style={{ paddingBottom: "0px", marginLeft: "280px", marginTop: "-695px", marginRight: "-299px" }}>
    <h3 className="heading" style={{ textAlign: "left" }}>What's your goal for today?</h3>
    <textarea
      id='energyGoal2'
      autoComplete="off"
      required
      className="input-field"
      placeholder=""
      value={inputtedValue2}
      onChange={(e) => setInputtedValue2(e.target.value)}
      style={{ backgroundColor: "#F6F6F6",color: "#A6A6A6",marginLeft: "55px",height: "161px",paddingBottom: "10px",overflowY: "auto",
      }}
    />
     <div style={{ marginTop: '15px' }}>
            {/* Integrate the date picker */}
            <label style={{ display: 'block' }}>Select Deadline:</label>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              minDate={new Date()} // Optionally, set a minimum date (e.g., today)
              dateFormat="MM/dd/yyyy"
            />
          </div>
    <button className='button' onClick={createGoalForToday} style={{ marginLeft: "55px", marginBottom: "15px" }}>Create</button>
  </div>
</div>
 
     </div>
 
   
  );
};
 