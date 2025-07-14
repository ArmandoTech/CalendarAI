import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API } from '../apiConfig';

const GoalList = () => {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    axios.get(API.GOALS)
      .then(res => setGoals(res.data))
      .catch(err => console.error("Error fetching goals", err));
  }, []);

  return (
    <div>
      <h2>All Goals</h2>
      <ul>
        {goals.map(goal => (
          <li key={goal.id}>
            <strong>{goal.title}</strong>: {goal.description} - {goal.estimatedHours}h ({goal.preferredDays})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GoalList;
