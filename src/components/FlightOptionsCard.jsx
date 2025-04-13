import React, { useState, useEffect } from 'react';

const FlightOptionsCard = () => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    // Uncomment this block to fetch data from an API in the future
    /*
    const fetchFlightOptions = async () => {
      try {
        const response = await fetch('https://api.example.com/flights'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch flight options');
        }
        const data = await response.json();
        setOptions(data); // Assuming the API returns an array of flight options
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchFlightOptions();
    */

    // Dummy data for now
    const dummyOptions = [
      {
        from: 'Washington DC',
        to: 'Miami',
        date: '2025-05-01',
        duration: '2h 30m',
        price: 250,
      },
      {
        from: 'Washington DC',
        to: 'Miami',
        date: '2025-05-02',
        duration: '2h 45m',
        price: 270,
      },
      {
        from: 'Washington DC',
        to: 'Miami',
        date: '2025-05-03',
        duration: '2h 20m',
        price: 240,
      },
    ];
    setOptions(dummyOptions);
  }, []);

  return (
    <div className="flight-options-card bg-gray-100 p-4 rounded-lg shadow-md w-full mt-6">
      <h3 className="text-lg font-bold mb-4 text-center">Flight Options</h3>
      <div className="flex flex-col gap-4">
        {options.map((option, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm"
          >
            {/* Left Side: Flight Details */}
            <div>
              <p>
                <strong>From:</strong> {option.from}
              </p>
              <p>
                <strong>To:</strong> {option.to}
              </p>
              <p>
                <strong>Date:</strong> {option.date}
              </p>
              <p>
                <strong>Duration:</strong> {option.duration}
              </p>
            </div>

            {/* Right Side: Price */}
            <div className="text-right">
              <p className="text-xl font-bold text-green-600">${option.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlightOptionsCard;