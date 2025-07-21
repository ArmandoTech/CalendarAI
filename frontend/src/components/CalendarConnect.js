import React, { useEffect } from "react";
import { gapi } from "gapi-script";

const CalendarConnect = ({ onAuthSuccess }) => {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: process.env.GOOGLE_CALENDAR_CLIENT_ID,
        scope: process.env.GOOGLE_CALENDAR_SCOPE,
      });
    }

    gapi.load("client:auth2", start);
  }, []);

  const handleAuthClick = () => {
    gapi.auth2.getAuthInstance().signIn().then((googleUser) => {
      const token = googleUser.getAuthResponse().access_token;
      onAuthSuccess(token); // Send token to parent component
    });
  };

  return (
    <button
      onClick={handleAuthClick}
      className="bg-green-500 text-white px-4 py-2 rounded mt-4"
    >
      Connect Google Calendar
    </button>
  );
};

export default CalendarConnect;
