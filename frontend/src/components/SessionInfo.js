import React from 'react';
import { Link } from 'react-router-dom';

const SessionInfo = ({ movieSessions, movieId }) => {
  const handleSessionSelect = (session) => {
    localStorage.setItem('movieSession', JSON.stringify(session));
  };

  return (
    <Link to={`/movie/${movieId}`} className='container'>
      <ul>
        {movieSessions.map((session, index) => (
          <li key={index}>
            <button
              onClick={() => handleSessionSelect(session)}
              className='bg-red-500 w-full border rounded-lg text-left text-white text-sm font-semibold p-1 my-1 flex space-x-2'
            >
              <span>{session.time}</span>
              <span className='border rounded px-1'>{session.language}</span>
            </button>
          </li>
        ))}
      </ul>
    </Link>
  );
};

export default SessionInfo;
