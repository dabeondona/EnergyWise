import { addDays, addMonths, endOfMonth, endOfWeek, format, isSameDay, isSameMonth, startOfMonth, startOfWeek, subMonths } from 'date-fns';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './css/Calendar.css';

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
        <div className="event-details-modal">
          <div className="event-details-content">
            <p>Event details for {currentEventDate ? format(currentEventDate, 'MMMM dd, yyyy') : ''}:</p>
            <p>{events[currentEventDate ? format(currentEventDate, 'yyyy-MM-dd') : '']}</p>
            <button onClick={closeEventDetails}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;