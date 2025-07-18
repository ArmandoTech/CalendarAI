import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase"; // Firebase Auth

import GoalList from "./components/GoalList";
import ScheduleView from "./components/ScheduleView";
import Login from "./components/Login";
import Logout from "./components/Logout";

function App() {
  const [user, setUser] = useState(null); // Holds logged-in user info

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className="App p-4">
      <h1 className="text-2xl font-bold mb-4">AI Calendar Scheduler</h1>

      {/* If logged in, show content; otherwise show login */}
      {user ? (
        <>
          <div className="mb-4">
            <p className="text-lg">
              Welcome, <strong>{user.displayName}</strong>!
            </p>
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-16 h-16 rounded-full my-2"
            />
            <p>Email: {user.email}</p>
            <Logout setUser={setUser} />
          </div>

          <h2 className="text-xl font-semibold mt-6">All Goals</h2>
          <GoalList userId={user.uid} />

          <h2 className="text-xl font-semibold mt-6">Weekly Schedule</h2>
          <ScheduleView userId={user.uid} />
        </>
      ) : (
        <div className="mt-6">
          <p className="text-lg mb-4">Please sign in to access your scheduler:</p>
          <Login setUser={setUser} />
        </div>
      )}
    </div>
  );
}

export default App;
