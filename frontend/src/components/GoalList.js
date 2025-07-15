import React, { useEffect, useState } from 'react';
import { getGoalsByUser } from '../services/api';

const GoalList = ({ userId }) => {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    getGoalsByUser(userId)
      .then(res => setGoals(res.data))
      .catch(err => console.error("Error fetching goals", err));
  }, [userId]);

  return (
    <div>
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
