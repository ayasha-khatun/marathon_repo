import { useParams, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';

const MarathonDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [marathon, setMarathon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/marathons/${id}`)
      .then(res => res.json())
      .then(data => {
        setMarathon(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center py-20">Loading...</div>;

  if (!marathon) return <p className="text-center text-red-500">Marathon not found</p>;

  const today = new Date();
  const isRegistrationOpen =
    new Date(marathon.registrationStart) <= today &&
    today <= new Date(marathon.registrationEnd);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <img src={marathon.image} alt={marathon.title} className="w-full h-64 object-cover" />
        <div className="p-6 space-y-4">
          <h2 className="text-3xl font-bold">{marathon.title}</h2>
          <p className="text-gray-600 dark:text-gray-300">📍 {marathon.location}</p>
          <p className="text-sm text-gray-500">
            🗓 Registration: {marathon.registrationStart} ➜ {marathon.registrationEnd}
          </p>
          <p className="text-sm text-gray-500">🏁 Marathon Date: {marathon.marathonStartDate}</p>
          <p className="text-sm text-gray-500">🏃 Distance: {marathon.distance}</p>
          <p className="text-gray-700 dark:text-gray-300">{marathon.description}</p>
          <p className="text-sm font-semibold text-blue-600">
            Total Registrations: {marathon.totalRegistration || 0}
          </p>

          {isRegistrationOpen ? (
            <button
              onClick={() => navigate(`/register-marathon/${marathon._id}`)}
              className="btn btn-primary mt-4"
            >
              Register Now
            </button>
          ) : (
            <p className="text-red-500 mt-4 font-medium">
              ⚠️ Registration is closed for this marathon.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarathonDetails;
