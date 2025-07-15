import React from 'react';
import GoalList from './components/GoalList';
import ScheduleView from './components/ScheduleView';

function App() {
  const userId = "user123";  // TEST

  return (
    <div className="App">
      <h1>AI Calendar Scheduler</h1>
      <h2>All Goals</h2>
      <GoalList userId={userId} />
      <h2>Weekly Schedule</h2>
      <ScheduleView userId={userId} />
    </div>
  );
}

export default App;
