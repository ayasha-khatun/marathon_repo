import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { FaClock } from 'react-icons/fa';

const MarathonDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [marathon, setMarathon] = useState(null);

  useEffect(() => {
    fetch(`https://marathon-server-omega.vercel.app/marathons/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setMarathon(data.data); // Correct structure
        } else {
          throw new Error('Failed to load marathon details.');
        }
      })
      .catch(error => console.error('Fetch error:', error));
  }, [id]);

  if (!marathon) {
    return (
      <div className="text-center py-20 text-xl font-semibold text-gray-600 dark:text-gray-300">
        ⏳ Loading marathon details...
      </div>
    );
  }

  // Date calculations
  const startTime = new Date(marathon.marathonStartDate).getTime();
  const currentTime = Date.now();
  const remainingSeconds = Math.max(0, Math.floor((startTime - currentTime) / 1000));

  const formatTime = (remaining) => {
    const days = Math.floor(remaining / (3600 * 24));
    const hours = Math.floor((remaining % (3600 * 24)) / 3600);
    const minutes = Math.floor((remaining % 3600) / 60);
    return `${days}d ${hours}h ${minutes}m`;
  };

  const isRegistrationOpen = () => {
    const now = Date.now();
    const start = new Date(marathon.registrationStart).getTime();
    const end = new Date(marathon.registrationEnd).getTime();
    return now >= start && now <= end;
  };

  return (
    <div className="max-w-5xl mx-auto p-6 pt-20 bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-xl">
      {/* Title */}
      <h2 className="text-3xl font-bold text-center text-blue-800 dark:text-blue-400 mb-6">
        {marathon.title}
      </h2>

      {/* Grid Layout */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Image */}
        <img
          src={marathon.image}
          alt={marathon.title}
          className="rounded-lg w-full h-[300px] object-cover border-4 border-blue-300 dark:border-blue-600 shadow-md"
        />

        {/* Details */}
        <div className="space-y-3 text-gray-700 dark:text-gray-200">
          <p><strong>📍 Location:</strong> {marathon.location}</p>
          <p><strong>🏃 Distance:</strong> {marathon.distance || 'Not specified'}</p>
          <p><strong>🗓️ Starts on:</strong> {new Date(marathon.marathonStartDate).toLocaleDateString()}</p>
          <p><strong>📋 Description:</strong> {marathon.description}</p>
          <p><strong>👥 Total Registrations:</strong> {marathon.totalRegistration}</p>
          <p>
            <strong>📝 Registration Status:</strong>{' '}
            <span className={isRegistrationOpen() ? 'text-green-600' : 'text-red-500'}>
              {isRegistrationOpen() ? 'Open' : 'Closed'}
            </span>
          </p>
        </div>
      </div>

      {/* Countdown */}
      <div className="mt-10 flex flex-col items-center">
        <h3 className="text-2xl font-semibold mb-4 text-blue-700 dark:text-blue-300 flex items-center gap-2">
          <FaClock /> Time Left Until Start
        </h3>

        {remainingSeconds > 0 ? (
          <CountdownCircleTimer
            isPlaying
            duration={remainingSeconds}
            colors={[['#00BFFF', 0.4], ['#FFD700', 0.4], ['#FF4500', 0.2]]}
            size={200}
            strokeWidth={14}
            trailColor="#e2e8f0"
          >
            {({ remainingTime }) => (
              <div className="text-center text-xl font-bold text-gray-800 dark:text-white animate-pulse">
                {formatTime(remainingTime)}
              </div>
            )}
          </CountdownCircleTimer>
        ) : (
          <p className="text-red-500 text-lg font-bold mt-2">🏁 Marathon has started!</p>
        )}
      </div>

      {/* Register Button */}
      <div className="text-center mt-10">
        {isRegistrationOpen() ? (
          <button
            onClick={() => navigate(`/register-marathon/${marathon._id}`)}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 transition duration-300 text-white text-lg font-semibold rounded-full shadow-lg"
          >
            Register Now
          </button>
        ) : (
          <p className="text-yellow-600 font-medium mt-4">
            🚫 Registration is currently closed.
          </p>
        )}
      </div>
    </div>
  );
};

export default MarathonDetails;
