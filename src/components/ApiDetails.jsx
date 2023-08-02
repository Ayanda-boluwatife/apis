import React from 'react';

const ApiDetails = ({ api }) => {
  return (
    <div className="p-4 border rounded">
      {api && (
        <>
          <h2 className="text-xl font-semibold">{api.API}</h2>
          <p>{api.Description}</p>
          <p>Auth: {api.Auth}</p>
          <p>HTTPS: {api.HTTPS.toString()}</p>
          <p>CORS: {api.Cors}</p>
          <a href={api.Link} target="_blank" className="text-blue-500 hover:underline">
            Link
          </a>
          <p>Category: {api.Category}</p>
        </>
      )}
    </div>
  );
};

export default ApiDetails;
