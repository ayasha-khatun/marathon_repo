import { useEffect, useState } from 'react';
import { Link } from 'react-router';

const Marathons = () => {
  const [marathons, setMarathons] = useState([]);
  const [sort, setSort] = useState('newest');
  const [loading, setLoading] = useState(true);

  const fetchMarathons = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/marathons?sort=${sort}`);
      const data = await res.json();
      setMarathons(data);
    } catch (err) {
      console.error('Error fetching marathons:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarathons();
  }, [sort]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">🏁 Marathon Events</h2>
        <select
          className="select select-bordered"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="newest">Sort: Newest First</option>
          <option value="oldest">Sort: Oldest First</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {marathons.map((marathon) => (
            <div key={marathon._id} className="bg-white p-4 rounded shadow">
              <img
                src={marathon.image}
                alt={marathon.title}
                className="w-full h-40 object-cover rounded mb-3"
              />
              <h3 className="text-xl font-semibold">{marathon.title}</h3>
              <p className="text-sm text-gray-600">📍 {marathon.location}</p>
              <p className="text-sm text-gray-500">
                🗓️ {marathon.startRegistrationDate} – {marathon.endRegistrationDate}
              </p>
              <Link
                to={`/marathon/${marathon._id}`}
                className="btn btn-sm btn-primary mt-3"
              >
                See Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Marathons;
