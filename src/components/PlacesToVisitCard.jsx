import React, { useState, useEffect } from 'react';

const PlacesToVisitCard = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        //const tripId="PDjgmjgmjgmjgmhjgmjgm"
        const tripId = sessionStorage.getItem('user_id'); // Retrieve trip_id from session storage
        if (!tripId) {
          console.error('Trip ID not found in session storage.');
          return;
        }

        const response = await fetch('https://xlgwkfw9-8000.use.devtunnels.ms/api/v1/top-places', {
          method: 'POST', // Use POST request
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ trip_id: tripId }), // Pass trip_id in the request body
        });

        if (!response.ok) {
          throw new Error('Failed to fetch places');
        }

        const data = await response.json();
        setPlaces(data.places_to_visit); // Assuming the API returns the schema provided
      } catch (err) {
        console.error('Error fetching places:', err.message);
      }
    };

    fetchPlaces();
  }, []);

  return (
    <div className="places-to-visit-card bg-gray-100 p-4 rounded-lg shadow-md w-full mt-6">
      <h3 className="text-lg font-bold mb-4 text-center">Places to Visit</h3>
      <div className="flex gap-4 overflow-x-auto">
        {places.map((place, index) => (
          <div
            key={index}
            className="min-w-[300px] bg-white p-4 rounded-lg shadow-sm flex flex-col items-start"
          >
            <img
              src={place.photo_url}
              alt={place.name}
              className="w-full h-40 object-cover rounded-md mb-2"
            />
            <h4 className="text-md font-bold mb-1">{place.name}</h4>
            <p className="text-sm text-gray-600">{place.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlacesToVisitCard;