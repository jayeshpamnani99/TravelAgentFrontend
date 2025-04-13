import React, { useState, useEffect } from 'react';

const FlightOptionsCard = () => {
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState(null); // State to track errors
  const [loading, setLoading] = useState(true); // State to track loading

  useEffect(() => {
    const fetchFlightOptions = async () => {
      try {
        const tripId = sessionStorage.getItem('user_id'); // Retrieve trip_id from session storage
        if (!tripId) {
          console.error('Trip ID not found in session storage.');
          setError('Trip ID not found in session storage.');
          setLoading(false);
          return;
        }

        const response = await fetch('https://xlgwkfw9-8000.use.devtunnels.ms/api/v1/search-flights', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: 'i live in new york', trip_id: tripId }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch flight options');
        }

        const data = await response.json();
        setFlights(data.flights); // Assuming the API returns the schema provided
        setError(null); // Clear any previous errors
      } catch (err) {
        console.error('Error fetching flight options:', err.message);
        setError('Something went wrong while fetching flight options. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchFlightOptions();
  }, []);

  const formatDuration = (duration) => {
    const match = duration.match(/PT(\d+H)?(\d+M)?/);
    const hours = match[1] ? match[1].replace('H', 'h ') : '';
    const minutes = match[2] ? match[2].replace('M', 'm') : '';
    return `${hours}${minutes}`.trim();
  };

  if (loading) {
    return <div className="text-center">Loading flight options...</div>;
  }

  if (error) {
    return (
      <div className="text-center bg-red-100 text-red-700 p-4 rounded-lg">
        <h3 className="text-lg font-bold">Error</h3>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="flight-options-card bg-gray-100 p-4 rounded-lg shadow-md w-full mt-6">
      <h3 className="text-lg font-bold mb-4 text-center">Flight Options</h3>
      <div className="flex flex-col gap-4">
        {flights.map((flight, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-lg shadow-sm"
          >
            {/* Outbound Flight Details */}
            <div className="flex-1">
              <h4 className="text-md font-bold mb-2">Outbound</h4>
              <p>
                <strong>From:</strong> {flight.outbound.departure.airport} ({flight.outbound.departure.terminal || 'N/A'}) at{' '}
                {new Date(flight.outbound.departure.time).toLocaleString()}
              </p>
              <p>
                <strong>To:</strong> {flight.outbound.arrival.airport} ({flight.outbound.arrival.terminal || 'N/A'}) at{' '}
                {new Date(flight.outbound.arrival.time).toLocaleString()}
              </p>
              <p>
                <strong>Duration:</strong> {formatDuration(flight.outbound.duration)}
              </p>
              <p>
                <strong>Airline:</strong> {flight.outbound.airline} {flight.outbound.flight_number}
              </p>
            </div>

            {/* Return Flight Details */}
            <div className="flex-1 mt-4 md:mt-0">
              <h4 className="text-md font-bold mb-2">Return</h4>
              <p>
                <strong>From:</strong> {flight.return.departure.airport} ({flight.return.departure.terminal || 'N/A'}) at{' '}
                {new Date(flight.return.departure.time).toLocaleString()}
              </p>
              <p>
                <strong>To:</strong> {flight.return.arrival.airport} ({flight.return.arrival.terminal || 'N/A'}) at{' '}
                {new Date(flight.return.arrival.time).toLocaleString()}
              </p>
              <p>
                <strong>Duration:</strong> {formatDuration(flight.return.duration)}
              </p>
              <p>
                <strong>Airline:</strong> {flight.return.airline} {flight.return.flight_number}
              </p>
            </div>

            {/* Price */}
            <div className="text-right mt-4 md:mt-0">
              <p className="text-xl font-bold text-green-600">
                {flight.price.currency} {flight.price.total}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlightOptionsCard;