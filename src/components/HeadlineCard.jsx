import React from 'react';

const HeadlineCard = ({ source, destination, fromDate, toDate }) => {
  return (
    <div className="headline-card bg-blue-100 p-4 rounded-lg shadow-md w-full">
      <h3 className="text-xl font-bold text-center">Your Trip Details</h3>
      <p className="mt-2 text-center">
        <strong>From:</strong> {source} <br />
        <strong>To:</strong> {destination} <br />
        <strong>Dates:</strong> {fromDate} to {toDate}
      </p>
    </div>
  );
};

export default HeadlineCard;