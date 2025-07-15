import React, { useEffect, useState } from 'react';
import { getSchedule } from '../services/api';

const ScheduleView = ({ userId }) => {
  const [schedule, setSchedule] = useState({});

  useEffect(() => {
    getSchedule(userId).then(res => setSchedule(res.data)).catch(console.error);
  }, [userId]);

  return (
    <div>
      {Object.entries(schedule).map(([day, tasks]) => (
        <div key={day}>
          <h3>{day}</h3>
          <ul>
            {tasks.map((task, idx) => (
              <li key={idx}>{task.title} - {task.hours}h</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ScheduleView;
