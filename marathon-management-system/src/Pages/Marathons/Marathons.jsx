// src/Pages/Marathons/Marathons.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router";

const Marathons = () => {
  const [marathons, setMarathons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/marathons")
      .then((res) => res.json())
      .then((data) => {
        setMarathons(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center py-20 font-semibold text-lg">Loading Marathons...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <h2 className="text-3xl font-bold text-center mb-10">All Marathons</h2>

      {marathons.length === 0 ? (
        <p className="text-center text-gray-500">No marathons available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {marathons.map((marathon) => (
            <div
              key={marathon._id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={marathon.image}
                alt={marathon.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{marathon.title}</h3>
                <p className="text-gray-600 mb-1">📍 {marathon.location}</p>
                <p className="text-gray-600 text-sm">
                  🗓 Registration: {marathon.registrationStart} - {marathon.registrationEnd}
                </p>
                <Link
                  to={`/marathon/${marathon._id}`}
                  className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  See Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Marathons;
