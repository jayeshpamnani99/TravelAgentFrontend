import React, { useState, useEffect } from 'react';

const HotelCard = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        //const tripId="PDjgmjgmjgmjgmhjgmjgm"
        const tripId = sessionStorage.getItem('user_id'); // Retrieve trip_id from session storage
        if (!tripId) {
          console.error('Trip ID not found in session storage.');
          return;
        }

        const response = await fetch('https://xlgwkfw9-8000.use.devtunnels.ms/api/v1/hotels', {
          method: 'POST', // Change to POST request
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ trip_id: tripId }), // Pass trip_id in the request body
        });

        if (!response.ok) {
          throw new Error('Failed to fetch hotels');
        }

        const data = await response.json();
        setHotels(data.hotels); // Assuming the API returns the schema provided
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchHotels();
  }, []);

  return (
    <div className="hotel-card bg-gray-100 p-4 rounded-lg shadow-md w-full mt-6">
      <h3 className="text-lg font-bold mb-4 text-center">Hotels</h3>
      <div className="flex gap-4 overflow-x-auto">
        {hotels.map((hotel, index) => (
          <div
            key={index}
            className="min-w-[300px] bg-white p-4 rounded-lg shadow-sm flex flex-col items-start"
          >
            <img
              src={hotel.photo_url}
              alt={hotel.name}
              className="w-full h-40 object-cover rounded-md mb-2"
            />
            <h4 className="text-md font-bold mb-1">{hotel.name}</h4>
            <p className="text-sm text-gray-600">{hotel.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelCard;