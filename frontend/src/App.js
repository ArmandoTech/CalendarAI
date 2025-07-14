import React from 'react';
import GoalList from './components/GoalList';
import ScheduleView from './components/ScheduleView';

function App() {
  return (
    <div className="App">
      <h1>AI Calendar Scheduler</h1>
      <GoalList />
      <ScheduleView />
    </div>
  );
}

export default App;
