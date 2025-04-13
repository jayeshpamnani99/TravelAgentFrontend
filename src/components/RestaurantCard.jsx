import React, { useState, useEffect } from 'react';

const RestaurantCard = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState(null); // State to track errors

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const tripId = sessionStorage.getItem('user_id'); // Retrieve trip_id from session storage
        if (!tripId) {
          console.error('Trip ID not found in session storage.');
          setError('Trip ID not found in session storage.');
          return;
        }

        const response = await fetch('https://xlgwkfw9-8000.use.devtunnels.ms/api/v1/restaurants', {
          method: 'POST', // Use POST request
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ trip_id: tripId }), // Pass trip_id in the request body
        });

        if (!response.ok) {
          throw new Error('Failed to fetch restaurants');
        }

        const data = await response.json();
        setRestaurants(data.restaurants); // Assuming the API returns the schema provided
        setError(null); // Clear any previous errors
      } catch (err) {
        console.error('Error fetching restaurants:', err.message);
        setError('Something went wrong while fetching restaurants. Please try again.');
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <div className="restaurant-card bg-gray-100 p-4 rounded-lg shadow-md w-full mt-6">
      <h3 className="text-lg font-bold mb-4 text-center">Restaurants</h3>
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          <p>{error}</p>
        </div>
      )}
      <div className="flex gap-4 overflow-x-auto">
        {restaurants?.map((restaurant, index) => (
          <div
            key={index}
            className="min-w-[300px] bg-white p-4 rounded-lg shadow-sm flex flex-col items-start"
          >
            <img
              src={restaurant?.photo_url || ''}
              alt={restaurant.name}
              className="w-full h-40 object-cover rounded-md mb-2"
            />
            <h4 className="text-md font-bold mb-1">{restaurant.name}</h4>
            <p className="text-sm text-gray-600">{restaurant.address}</p>
            <p className="text-sm text-gray-500">
              Categories: {restaurant.categories?.join(', ')}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantCard;