import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Install this package using `npm install uuid`
import ChatBox from './ChatBox';
import RouteCard from './RouteCard';
import WeatherCard from './WeatherCard';
import PlacesToVisitCard from './PlacesToVisitCard';
import FlightOptionsCard from './FlightOptionsCard';
import RestaurantCard from './RestaurantCard';
import ItineraryCard from './ItineraryCard';
import HotelCard from './HotelCard';

const Dashboard = () => {
  const [aiConfirmed, setAiConfirmed] = useState(false);
  const [error, setError] = useState(null); // State to track errors

  useEffect(() => {
    const initializeUser = async () => {
      try {
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
      } catch (err) {
        console.error('Error initializing user:', err.message);
        setError('Something went wrong while initializing the user.');
      }
    };

    initializeUser();
  }, []);

  const handleAiResponse = (response) => {
    if (response === 'confirmed') {
      setAiConfirmed(true);
    }
  };

  const startNewConversation = () => {
    try {
      sessionStorage.removeItem('user_id'); // Remove user_id from session storage
      sessionStorage.removeItem('user_id_ttl'); // Remove TTL from session storage
      window.location.reload(); // Refresh the page
    } catch (err) {
      console.error('Error starting a new conversation:', err.message);
      setError('Something went wrong while starting a new conversation.');
    }
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold text-red-500 mb-4">Something went wrong</h1>
        <p className="text-lg text-gray-700">{error}</p>
      </div>
    );
  }

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
          <h1 className="mt-5 text-5xl font-bold text-center">Welcome to Travel Buddy AI-Agent</h1>
          <h2 className="mt-5 text-2xl font-bold text-center">Plan your trip with ease!</h2>
          <ChatBox onAiResponse={handleAiResponse} />
        </>
      )}
      {aiConfirmed && (
        <>
          <div className="w-full mt-8">
            <RouteCard />
          </div>
          <div className="flex justify-center gap-8 w-full mt-8">
            <div className="w-[40%] h-[400px] overflow-y-auto">
              <ItineraryCard />
            </div>
            <div className="w-[60%] h-[400px] overflow-y-auto">
              <WeatherCard />
            </div>
          </div>

          <FlightOptionsCard />
          <PlacesToVisitCard />
          <RestaurantCard />
          <HotelCard />
        </>
      )}
    </div>
  );
};

export default Dashboard;