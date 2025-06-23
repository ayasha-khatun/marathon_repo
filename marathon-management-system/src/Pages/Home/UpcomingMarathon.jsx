import React, { useEffect, useState } from 'react';

const UpcomingMarathon = () => {
  const [marathons, setMarathons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch('http://localhost:3000/upcomingMarathon');
        const data = await res.json();
        setMarathons(data);
      } catch (err) {
        console.error('Failed to load upcoming marathons', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <p className="text-center py-4">Loading...</p>;

  return (
    <div className='my-10'>
        <h1 className='text-3xl font-bold py-6 text-center'>Get Ready to Run – Upcoming Marathons</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {marathons.map((item) => (
                <div key={item._id} className="rounded-lg shadow-md border-1 border-gray-100 p-4">
                <img src={item.image} alt={item.title} className="w-full h-48 object-cover rounded" />
                <h2 className="text-xl font-bold mt-2">{item.title}</h2>
                <p className="text-sm text-gray-600">{item.location}</p>
                <p className="text-sm text-gray-500">
                    Registration: {item.registrationStart} → {item.registrationEnd}
                </p>
                
                </div>
            ))}
        </div>
    </div>
  );
};

export default UpcomingMarathon;
