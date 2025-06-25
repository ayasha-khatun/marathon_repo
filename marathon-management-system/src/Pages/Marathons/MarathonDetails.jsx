import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

const MarathonDetails = () => {
  const { id } = useParams();
  const [marathon, setMarathon] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/marathons/${id}`)
      .then(res => res.json())
      .then(data => setMarathon(data));
  }, [id]);

  if (!marathon) return <div className="text-center py-20">Loading...</div>;

  // ⏳ Calculate remaining time
  const startTime = new Date(marathon.marathonStartDate).getTime(); // marathon start
  const currentTime = Date.now();
  const remainingSeconds = Math.floor((startTime - currentTime) / 1000);

  const formatTime = (remaining) => {
    const days = Math.floor(remaining / (3600 * 24));
    const hours = Math.floor((remaining % (3600 * 24)) / 3600);
    const minutes = Math.floor((remaining % 3600) / 60);

    return `${days}d ${hours}h ${minutes}m`;
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">{marathon.title}</h2>
      <img src={marathon.image} alt={marathon.title} className="rounded mb-4 w-full max-h-96 object-cover" />
      <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>📍 Location:</strong> {marathon.location}</p>
      <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>🏃 Distance:</strong> {marathon.runningDistance}</p>
      <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>🗓️ Starts on:</strong> {marathon.marathonStartDate}</p>
      <p className="text-gray-700 dark:text-gray-300 mb-4"><strong>📋 Description:</strong> {marathon.description}</p>
      <p className="text-gray-700 dark:text-gray-300 mb-4"><strong>Total Registrations:</strong> {marathon.totalRegistration}</p>

      {/* ⏰ Countdown */}
      <div className="text-center mt-6">
        <h3 className="text-xl font-semibold mb-2">⏳ Time Left to Start</h3>
        {remainingSeconds > 0 ? (
          <CountdownCircleTimer
            isPlaying
            duration={remainingSeconds}
            colors={[['#004777', 0.33], ['#F7B801', 0.33], ['#A30000', 0.33]]}
            size={180}
            strokeWidth={12}
          >
            {({ remainingTime }) => (
              <div className="text-lg font-semibold text-gray-700 dark:text-white">
                {formatTime(remainingTime)}
              </div>
            )}
          </CountdownCircleTimer>
        ) : (
          <p className="text-red-500 font-bold">🏁 Marathon has started!</p>
        )}
      </div>
    </div>
  );
};

export default MarathonDetails;
