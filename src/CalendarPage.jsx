import { ArrowBack, ArrowForward } from '@mui/icons-material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Box, Button, IconButton, Modal, Typography } from '@mui/material';
import axios from 'axios';
import { addDays, addMonths, endOfMonth, endOfWeek, format, isSameDay, isSameMonth, startOfMonth, startOfWeek, subMonths } from 'date-fns';
import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import BoxProfile from './BoxProfile';
import { AuthContext } from "./context/AuthProvider";
import './css/CalendarPage.css';

const NotificationItem = ({ message }) => (
  <div className="notification-item" style={{ backgroundColor: "#73D2F8", margin: "10px", padding: "10px", borderRadius: "10px" }}>
    {message}
  </div>
);

const Calendar = () => {
  let navigate = useNavigate();
    const [profileImageUrl, setProfileImageUrl] = useState('');
    const [vnotif, setVNotif] = useState(false);
    const [vprof, setVProf] = useState(false);
    const [notifications, setNotifications] = useState([
        { id: 1, message: "Notification 1" },
        { id: 2, message: "Notification 2" },
    ]);

  const { auth, setAuth } = useContext(AuthContext);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventFormVisible, setEventFormVisible] = useState(false);
  const [events, setEvents] = useState({});
  const [eventDetailsVisible, setEventDetailsVisible] = useState(false);
  const userDetails = JSON.parse(localStorage.getItem('userDetails')) || {};
  const [currentEventDate, setCurrentEventDate] = useState(null);

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
      }
  }, [auth, navigate]);

  useEffect(() => {
    fetchEvents();
  }, []);

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

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/calendar/events');
      const fetchedEvents = await response.json();
      setEvents(fetchedEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const saveEvent = async (eventText) => {
    try {
      await fetch('/api/calendar/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: format(selectedDate, 'yyyy-MM-dd'),
          eventText,
        }),
      });

      fetchEvents();
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  const getDaysInMonth = () => {
    const firstDay = startOfWeek(startOfMonth(currentDate));
    const lastDay = endOfWeek(endOfMonth(currentDate));
    const days = [];
    let currentDay = firstDay;

    while (currentDay <= lastDay) {
      days.push(currentDay);
      currentDay = addDays(currentDay, 1);
    }

    return days;
  };

  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const handleDayClick = (day) => {
    setSelectedDate(day);
    setEventFormVisible(true);
  };

  const handleEventSave = (eventText) => {
    setEvents((prevEvents) => ({
      ...prevEvents,
      [format(selectedDate, 'yyyy-MM-dd')]: eventText,
    }));

    setSelectedDate(null);
    setEventFormVisible(false);
  };

  const handleEventClick = (day) => {
    setCurrentEventDate(day);
    if (events[format(day, 'yyyy-MM-dd')]) {
      setEventDetailsVisible(true);
    }
  };

  const closeEventDetails = () => {
    setEventDetailsVisible(false);
  };

  function handleNotifVisibility() {
    setVNotif((prevVNotif) => !prevVNotif);
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
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

  return (
    <div className="">

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


      <div className='calendar'>
        <div className="header">
          <IconButton onClick={prevMonth} aria-label="previous-month" className="icon-button">
            <ArrowBack />
          </IconButton>
          <h2>{format(currentDate, 'MMMM yyyy')}</h2>
          <IconButton onClick={nextMonth} aria-label="next-month" className="icon-button">
            <ArrowForward />
          </IconButton>
        </div>
        <div className="days">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div
              key={day}
              className={`day-label ${day === 'Sun' ? 'sunday-label' : ''}`}
            >
              {day}
            </div>
          ))}
          {getDaysInMonth().map((day) => (
            <div
              key={day.toString()}
              className={`day ${!isSameMonth(day, currentDate) ? 'outside-month' : ''} ${isSameDay(day, new Date()) ? 'today' : ''}`}
              onClick={() => handleDayClick(day)}
            >
              {format(day, 'd')}
              {events[format(day, 'yyyy-MM-dd')] && (
                <button onClick={(e) => { e.stopPropagation(); handleEventClick(day); }}>View Event</button>
              )}
            </div>
          ))}
        </div>
        {eventFormVisible && (
          <div className="event-form">
            <textarea
              placeholder="Enter event details..."
              onChange={(e) => setEvents((prevEvents) => ({ ...prevEvents, [format(selectedDate, 'yyyy-MM-dd')]: e.target.value }))}
            ></textarea>
            <button onClick={() => handleEventSave(events[format(selectedDate, 'yyyy-MM-dd')])}>Add Event</button>
          </div>
        )}
        {eventDetailsVisible && (
          <Modal
            open={eventDetailsVisible}
            onClose={closeEventDetails}
            aria-labelledby="event-details-modal-title"
            aria-describedby="event-details-modal-description"
          >
            <Box className="event-details-modal" sx={style}>
              <div className="event-details-content">
                <Typography variant="h6" id="event-details-modal-title">
                  Event details for {currentEventDate ? format(currentEventDate, 'MMMM dd, yyyy') : ''}:
                </Typography>
                <Typography id="event-details-modal-description">
                  {events[currentEventDate ? format(currentEventDate, 'yyyy-MM-dd') : '']}
                </Typography>
                <Button onClick={closeEventDetails}>Close</Button>
              </div>
            </Box>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Calendar;
