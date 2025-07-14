import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API } from '../apiConfig';

const ScheduleView = () => {
  const [schedule, setSchedule] = useState({});

  useEffect(() => {
    axios.get(API.SCHEDULE)
      .then(res => setSchedule(res.data))
      .catch(err => console.error("Error fetching schedule", err));
  }, []);

  return (
    <div>
      <h2>Weekly Schedule</h2>
      {Object.keys(schedule).map(day => (
        <div key={day}>
          <h4>{day}</h4>
          <ul>
            {schedule[day].map((slot, index) => (
              <li key={index}>{slot.goalTitle} - {slot.hours}h</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ScheduleView;
