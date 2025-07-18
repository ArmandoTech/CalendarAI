import React from "react";
import { auth } from "../firebase"; 
import { signOut } from "firebase/auth";

const Logout = ({ setUser }) => {
  const handleLogout = () => {
    signOut(auth).then(() => setUser(null)); // Clear user state
  };

  return (
    <button
      className="bg-red-500 text-white px-4 py-2 rounded"
      onClick={handleLogout}
    >
      Sign out
    </button>
  );
};

export default Logout;
