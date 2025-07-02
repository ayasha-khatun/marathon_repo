import { useEffect, useState } from 'react';
import { Link } from 'react-router'; // Fixed import

const Marathons = () => {
  const [marathons, setMarathons] = useState([]);
  const [sort, setSort] = useState('newest');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMarathons = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:3000/marathons?sort=${sort}`);
      
      // Check for HTTP errors
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! Status: ${res.status}`
        );
      }
      
      const data = await res.json();
      
      // Handle different API response formats
      let marathonsArray = [];
      
      if (Array.isArray(data)) {
        marathonsArray = data;
      } 
      else if (data && Array.isArray(data.marathons)) {
        marathonsArray = data.marathons;
      } 
      else if (data && Array.isArray(data.results)) {
        marathonsArray = data.results;
      } 
      else if (data && Array.isArray(data.data)) {
        marathonsArray = data.data;
      }
      else if (data && typeof data === 'object' && !Array.isArray(data)) {
        // Handle single object response by wrapping in array
        marathonsArray = [data];
      } 
      else {
        throw new Error("API response is not in expected format");
      }

      setMarathons(marathonsArray);
    } catch (err) {
      console.error('Error fetching marathons:', err);
      setError(err.message || "Failed to load marathons");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarathons();
  }, [sort]);

  // Function to format dates in a more readable way
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p className="mt-3">Loading marathons...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center text-red-500 p-6 bg-red-50 rounded-lg">
          <h3 className="text-xl font-bold mb-2">⚠️ Error Loading Marathons</h3>
          <p className="mb-4">{error}</p>
          <button 
            onClick={fetchMarathons}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold">🏁 Marathon Events</h2>
        <div className="flex items-center gap-3">
          <span className="text-gray-600">Sort by:</span>
          <select
            className="select select-bordered w-full md:w-auto"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="closest">Closest Date</option>
          </select>
        </div>
      </div>

      {marathons.length === 0 ? (
        <div className="text-center py-10">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-md mx-auto">
            <h3 className="text-xl font-semibold mb-2">No Marathons Found</h3>
            <p className="mb-4">There are currently no marathons scheduled</p>
            <button 
              onClick={fetchMarathons}
              className="btn btn-outline"
            >
              Refresh List
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {marathons.map((marathon) => (
            <div 
              key={marathon._id} 
              className="bg-white p-4 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="relative">
                <img
                  src={marathon.image}
                  alt={marathon.title}
                  className="w-full h-48 object-cover rounded-md mb-3"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/400x300?text=Marathon+Image';
                    e.target.className = "w-full h-48 object-cover rounded-md mb-3 bg-gray-200";
                  }}
                />
                
              </div>
              
              <div className="space-y-2 mt-2">
                <h3 className="text-xl font-bold">{marathon.title}</h3>
                <p className="text-sm flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {marathon.location}
                </p>
                
                  <p className="text-sm">
                    {formatDate(marathon.registrationStart)} – {formatDate(marathon.registrationEnd)}
                  </p>
              </div>
              
              <Link
                to={`/marathon/${marathon._id}`}
                className="btn btn-primary mt-4 w-full"
              >
                View Details & Register
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Marathons;