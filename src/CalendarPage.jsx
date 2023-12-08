import { Box, Button, Modal, Typography } from '@mui/material'; // Import Material-UI components
import { addDays, addMonths, endOfMonth, endOfWeek, format, isSameDay, isSameMonth, startOfMonth, startOfWeek, subMonths } from 'date-fns';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './css/CalendarPage.css';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventFormVisible, setEventFormVisible] = useState(false);
  const [events, setEvents] = useState({});
  const [eventDetailsVisible, setEventDetailsVisible] = useState(false);
  const [currentEventDate, setCurrentEventDate] = useState(null);

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

  return (
    <div className="calendar">
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
      <div className="header">
        <button onClick={prevMonth}>&lt;</button>
        <h2>{format(currentDate, 'MMMM yyyy')}</h2>
        <button onClick={nextMonth}>&gt;</button>
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
          <textarea placeholder="Enter event details..." onChange={(e) => setEvents((prevEvents) => ({ ...prevEvents, [format(selectedDate, 'yyyy-MM-dd')]: e.target.value }))}></textarea>
          <button onClick={() => handleEventSave(events[format(selectedDate, 'yyyy-MM-dd')])}>Save Event</button>
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
  );
};

export default Calendar;
