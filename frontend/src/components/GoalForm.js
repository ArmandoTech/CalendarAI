import React, { useState } from 'react';
import { createGoal } from '../services/api';

export default function GoalForm({ onGoalCreated }) {
  const [goal, setGoal] = useState({
    title: '',
    description: '',
    estimatedHours: 0,
    preferredDays: '',
    userId: 'user123'
  });

  const handleChange = (e) => {
    setGoal({ ...goal, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createGoal(goal);
    onGoalCreated();  // Refresh goal list
    setGoal({ title: '', description: '', estimatedHours: 0, preferredDays: '', userId: 'user123' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Title" value={goal.title} onChange={handleChange} />
      <input name="description" placeholder="Description" value={goal.description} onChange={handleChange} />
      <input name="estimatedHours" type="number" placeholder="Hours" value={goal.estimatedHours} onChange={handleChange} />
      <input name="preferredDays" placeholder="Monday,Tuesday" value={goal.preferredDays} onChange={handleChange} />
      <button type="submit">Add Goal</button>
    </form>
  );
}
