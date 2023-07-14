import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import moment from 'moment-timezone';
import Loading from './Loading';
import { useApiUrl } from '../hooks/useApiUrl';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import "react-datepicker/dist/react-datepicker.css";
import '../styles/schedule.css';

function Schedule() {

  const apiUrl = useApiUrl();
  //const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const userEmail = user.email;
  const [isLoading, setIsLoading] = useState(true);
  const [group, setGroup] = useState({
    groupName: '',
    groupStatus: '',
    groupDescription: '',
    leader: userEmail,
    modules: [],
    members: [],
    userRequests: [], 
    scheduleId: null
  });

  const localizer = momentLocalizer(moment);
  const dateTimeFormat = 'yyyy-MM-dd HH:mm:ss'; 

  const [selectedEvent, setSelectedEvent] = useState('');

  //Creating Event Variables
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [events, setEvents] = useState([]);

  useEffect(() => {

    const fetchGroupEventsAndDetails = async() => {
      const groupId = localStorage.getItem('groupId');
      try {
        const schedule = await axios.get(`${apiUrl}/group/schedule/${groupId}`);
        const groupDetails = await axios.get(`${apiUrl}/group/other/${groupId}`);
        setGroup(groupDetails.data);
        setEvents(schedule.data.map(({ title, start, end, description }) => ({
          title: title,
          start: new Date(Date.parse(start)),
          end: new Date(Date.parse(end)),
          description: description,
        })));
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchGroupEventsAndDetails();
  }, [events]);

  const isMember = () => {
    return group.members.includes(userEmail);
  };

  const saveEvent = async (e) => {
    e.preventDefault();
    const eventDetails = {
      title: title,
      start: startDate,
      end: endDate,
      description: description
    }; 
    const scheduleId = group.scheduleId;
    try {
      await axios.put(`${apiUrl}/schedule/addevent/${scheduleId}`, eventDetails);
    } catch (err) {
      console.error(err);
    }
  };

  const closeEventDetails = () => {
    setSelectedEvent('');
  };

  const deleteEvent = async () => {
    const scheduleId = group.scheduleId;
    try {
      await axios.put(`${apiUrl}/schedule/deleteevent/${scheduleId}`, selectedEvent);
      setSelectedEvent('');
    } catch (err) {
      console.error(err);
    }
  }

  if (isLoading) {
    return <Loading />
  }

  /*if (!isMember()) {
    navigate('/groupdetails');
  }*/

  return (
    <div className='schedule-page'>

      <form className='schedule-form' onSubmit={saveEvent}> 
        <h1> Schedule an event here! </h1>
        <input 
          value={title}
          placeholder='Title'
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea 
          value={description}
          placeholder='Description'
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <DatePicker 
          className='start-datepicker'
          selected={startDate} 
          showTimeSelect
          dateFormat='Pp'
          onChange={(date) => setStartDate(date)}/>
        <DatePicker 
          className='end-datepicker'
          selected={endDate} 
          showTimeSelect
          dateFormat='Pp'
          onChange={(date) => setEndDate(date)}/>
        <button className='save-event-button'> Save Event </button>
      </form>

      {selectedEvent && 
      <div className='selected-event-details'>
        <h1> {selectedEvent.title} </h1>
        <button className='close-event-button' onClick={closeEventDetails}> &#x58; </button>
        <p> {selectedEvent.description} </p>
        <p> 
          Start: {new Date(selectedEvent.start).toLocaleString(
            'en-US', {
            timeZone: 'Asia/Singapore',
            dateStyle: 'medium',
            timeStyle: 'short'})} 
        </p>
        <p> 
          End: {new Date(selectedEvent.end).toLocaleString(
            'en-US', {
            timeZone: 'Asia/Singapore',
            dateStyle: 'medium',
            timeStyle: 'short'})} 
        </p>
        <button className='delete-event-button'onClick={deleteEvent}> Delete Event </button>
      </div>}

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor='start'
        endAccessor='end'
        defaultDate={startDate}
        dateFormat={dateTimeFormat}
        onSelectEvent={(e) => setSelectedEvent(e)}
        eventPropGetter={(event) => ({
          className: 'event-details'
        })}
        dayPropGetter={() => ({
          className: 'date-cell'
        })}
        style={{ width: '90%', height: 700, marginTop: 30 }}
      />

    </div>
  )
}

export default Schedule

/*
import { format } from 'date-fns';
const singaporeTimezone = 'Asia/Singapore';
const singaporeDate = utcToZonedTime(startDate, singaporeTimezone);
moment.tz.setDefault('Asia/Singapore');
import { utcToZonedTime } from 'date-fns-tz';
*/