import React, { useEffect, useState } from "react";
import { gapi } from "gapi-script";

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CALENDAR_CLIENT_ID;
const SCOPES = process.env.REACT_APP_GOOGLE_CALENDAR_SCOPE 

const CalendarConnect = ({ onAuthSuccess }) => {
  const [gapiReady, setGapiReady] = useState(false);

  useEffect(() => {
    const initGapiClient = async () => {
      try {
        // Load gapi
        await new Promise((resolve) => gapi.load("client:auth2", resolve));

        // Initialize gapi client
        await gapi.client.init({
          clientId: CLIENT_ID,
          scope: SCOPES,
        });

        // Manually ensure auth2 is initialized
        if (!gapi.auth2.getAuthInstance()) {
          await gapi.auth2.init({
            client_id: CLIENT_ID,
            scope: SCOPES,
          });
        }

        setGapiReady(true);
        console.log("GAPI client ready");
      } catch (error) {
        console.error("Error initializing GAPI:", error);
      }
    };

    initGapiClient();
  }, []);

  const handleAuthClick = async () => {
    if (!gapiReady) {
      console.warn("GAPI not ready yet");
      return;
    }

    const authInstance = gapi.auth2.getAuthInstance();
    if (!authInstance) {
      console.error("Auth instance is null — something went wrong");
      return;
    }

    try {
      const user = await authInstance.signIn();
      const token = user.getAuthResponse().access_token;
      console.log("Access token:", token);
      onAuthSuccess(token);
    } catch (err) {
      console.error("Sign-in failed:", err);
    }
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
