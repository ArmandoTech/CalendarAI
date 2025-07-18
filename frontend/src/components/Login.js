import React from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

const Login = ({ setUser }) => {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider); // Google login popup and sign in
      setUser(result.user);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded"
      onClick={handleLogin}
    >
      Sign in with Google
    </button>
  );
};

export default Login;
