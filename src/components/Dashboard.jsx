import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Install this package using `npm install uuid`
import ChatBox from './ChatBox';
import RouteCard from './RouteCard';
import WeatherCard from './WeatherCard';
import PlacesToVisitCard from './PlacesToVisitCard';
import FlightOptionsCard from './FlightOptionsCard';
import RestaurantCard from './RestaurantCard';
import HeadlineCard from './HeadlineCard';
import ItineraryCard from './ItineraryCard';
import HotelCard from './HotelCard';

const Dashboard = () => {
  const [aiConfirmed, setAiConfirmed] = useState(false);

  useEffect(() => {
    const userIdKey = 'user_id';
    const userIdTTLKey = 'user_id_ttl';

    const existingUserId = sessionStorage.getItem(userIdKey);
    const existingTTL = sessionStorage.getItem(userIdTTLKey);

    const now = Date.now();

    if (!existingUserId || !existingTTL || now > parseInt(existingTTL, 10)) {
      // Generate a new UUID and set TTL
      const newUserId = uuidv4();
      const ttl = now + 300 * 1000; // 300 seconds TTL

      sessionStorage.setItem(userIdKey, newUserId);
      sessionStorage.setItem(userIdTTLKey, ttl.toString());

      console.log('Generated new user ID:', newUserId);
    } else {
      console.log('Using existing user ID:', existingUserId);
    }
  }, []);

  const handleAiResponse = (response) => {
    if (response === 'confirmed') {
      setAiConfirmed(true);
    }
  };

  const startNewConversation = () => {
    sessionStorage.removeItem('user_id'); // Remove user_id from session storage
    sessionStorage.removeItem('user_id_ttl'); // Remove TTL from session storage
    window.location.reload(); // Refresh the page
  };

  return (
    <div className="relative flex flex-col items-center">
      {aiConfirmed && (
        <button
          onClick={startNewConversation}
          className="absolute top-4 right-4 px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 shadow-md"
        >
          Start New Conversation
        </button>
      )}
      {!aiConfirmed && (
        <>
          <h1 className="mt-5 text-5xl font-bold text-center">Welcome to Travel AI-Agent</h1>
          <h2 className="mt-5 text-2xl font-bold text-center">Plan your trip with ease!</h2>
          <ChatBox onAiResponse={handleAiResponse} />
        </>
      )}
      {aiConfirmed && (
        <>
          <div className="flex justify-center gap-8 w-full">
            <HeadlineCard source="Washington DC" destination="Miami" fromDate="2025-05-01" toDate="2025-05-10" />
          </div>
          <div className="flex justify-center gap-8 mt-8 w-full">
            <RouteCard />
            <WeatherCard />
          </div>

          <FlightOptionsCard />
          <PlacesToVisitCard />
          <RestaurantCard />
          <HotelCard />
          <div className="mt-8 w-full">
            <ItineraryCard /> {/* ItineraryCard now takes full width */}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;