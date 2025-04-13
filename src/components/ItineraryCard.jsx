import React, { useState, useEffect } from 'react';

const ItineraryCard = () => {
  const [itinerary, setItinerary] = useState('');

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        //const tripId= "PDjgmjgmjgmjgmhjgmjgm"
        const tripId = sessionStorage.getItem('user_id'); // Retrieve trip_id from session storage
        if (!tripId) {
          console.error('Trip ID not found in session storage.');
          return;
        }

        const response = await fetch('https://xlgwkfw9-8000.use.devtunnels.ms/api/v1/itinerary', {
          method: 'POST', // Use POST request
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ trip_id: tripId }), // Pass trip_id in the request body
        });

        if (!response.ok) {
          throw new Error('Failed to fetch itinerary');
        }

        const data = await response.json();
        setItinerary(data.itinerary); // Assuming the API returns the itinerary as a string
      } catch (err) {
        console.error('Error fetching itinerary:', err.message);
      }
    };

    fetchItinerary();
  }, []);

  return (
    <div className="itinerary-card bg-gray-100 p-4 rounded-lg shadow-md w-full">
      <h3 className="text-lg font-bold mb-4 text-center">Itinerary</h3>
      <div className="overflow-y-auto h-64">
        {itinerary ? (
          <p className="text-sm text-gray-700 whitespace-pre-line">{itinerary}</p>
        ) : (
          <p className="text-center text-gray-500">Loading itinerary...</p>
        )}
      </div>
    </div>
  );
};

export default ItineraryCard;