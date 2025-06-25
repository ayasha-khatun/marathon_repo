import { useEffect, useState } from 'react';
import { Link } from 'react-router';

const MarathonCards = () => {
  const [marathons, setMarathons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/marathons')
      .then((res) => res.json())
      .then((data) => {
        setMarathons(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <section className="py-12 bg-base-100">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">🏃 Featured Marathons</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {marathons.map((marathon) => (
            <div key={marathon._id} className="card bg-white dark:bg-gray-800 shadow-md border">
              <figure>
                <img src={marathon.image} alt={marathon.title} className="h-48 w-full object-cover" />
              </figure>
              <div className="card-body">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">{marathon.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  📍 {marathon.location}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  🗓️ {marathon.registrationStart} - {marathon.registrationEnd}
                </p>
                <div className="mt-3">
                  <Link
                    to={`/marathon/${marathon._id}`}
                    className="btn btn-sm btn-primary w-full"
                  >
                    See Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarathonCards;
