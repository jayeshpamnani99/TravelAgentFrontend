import React, { useState, useEffect } from 'react';

const WeatherCard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null); // State to track errors

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const tripId = sessionStorage.getItem('user_id'); // Retrieve trip_id from session storage
        if (!tripId) {
          console.error('Trip ID not found in session storage.');
          setError('Trip ID not found in session storage.');
          return;
        }

        const response = await fetch('https://xlgwkfw9-8000.use.devtunnels.ms/api/v1/smart-weather', {
          method: 'POST', // Use POST request
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ trip_id: tripId }), // Pass trip_id in the request body
        });

        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }

        const data = await response.json();
        setWeatherData(data); // Assuming the API returns the weather data schema
        setError(null); // Clear any previous errors
      } catch (err) {
        console.error('Error fetching weather data:', err.message);
        setError('Something went wrong while fetching weather data. Please try again.');
      }
    };

    fetchWeatherData();
  }, []);

  if (error) {
    return (
      <div className="text-center bg-red-100 text-red-700 p-4 rounded-lg">
        <h3 className="text-lg font-bold">Error</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!weatherData) {
    return <div className="text-center">Loading weather data...</div>;
  }

  const { origin_weather, destination_weather, trip_dates } = weatherData;

  const getWeatherIcon = (condition) => {
    const icons = {
      rain: 'https://cdn-icons-png.flaticon.com/512/1163/1163624.png',
      cloudy: 'https://cdn-icons-png.flaticon.com/512/1163/1163625.png',
      sunny: 'https://cdn-icons-png.flaticon.com/512/869/869869.png',
      default: 'https://cdn-icons-png.flaticon.com/512/869/869869.png',
    };

    if (condition.toLowerCase().includes('rain')) return icons.rain;
    if (condition.toLowerCase().includes('cloudy')) return icons.cloudy;
    if (condition.toLowerCase().includes('sunny')) return icons.sunny;
    return icons.default;
  };

  const renderWeatherRow = (forecast) => {
    return (
      <div className="flex gap-4 overflow-x-auto">
        {Object.entries(forecast).map(([date, details]) => (
          date >= trip_dates.start && date <= trip_dates.end && (
            <div key={date} className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-sm min-w-[150px]">
              <img src={getWeatherIcon(details.condition)} alt={details.condition} className="w-12 h-12 mb-2" />
              <h5 className="text-sm font-bold">{date}</h5>
              <p className="text-sm">{details.condition}</p>
              <p className="text-sm">Temp: {details.avg_temp_c}°C</p>
            </div>
          )
        ))}
      </div>
    );
  };

  return (
    <div className="weather-card bg-blue-100 p-4 rounded-lg shadow-md w-full">
      <h3 className="text-lg font-bold mb-4 text-center">Weather Information</h3>
      <div className="flex flex-col gap-8">
        <div>
          <h4 className="text-md font-bold mb-2 text-center">{origin_weather.city}</h4>
          {origin_weather.forecast && renderWeatherRow(origin_weather?.forecast)}
        </div>
        <div>
          <h4 className="text-md font-bold mb-2 text-center">{destination_weather.city}</h4>
          {destination_weather.forecast && renderWeatherRow(destination_weather?.forecast)}
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;