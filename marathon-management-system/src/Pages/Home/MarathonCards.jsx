import { useEffect, useState } from 'react';
import { Link } from 'react-router'; // Fixed import

const MarathonCards = () => {
  const [marathons, setMarathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMarathons = async () => {
      try {
        const response = await fetch('http://localhost:3000/marathons');
        
        // Handle HTTP errors
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `HTTP error! Status: ${response.status} - ${errorText || 'No additional error information'}`
          );
        }
        
        const data = await response.json();
        
        // Handle different API response formats
        let marathonsArray = [];
        
        if (Array.isArray(data)) {
          // Direct array response
          marathonsArray = data;
        } 
        else if (data && Array.isArray(data.marathons)) {
          // Wrapped in marathons property
          marathonsArray = data.marathons;
        } 
        else if (data && Array.isArray(data.results)) {
          // Wrapped in results property
          marathonsArray = data.results;
        } 
        else if (data && Array.isArray(data.data)) {
          // Wrapped in data property
          marathonsArray = data.data;
        }
        else if (data && typeof data === 'object' && !Array.isArray(data)) {
          // Handle single object response by wrapping in array
          marathonsArray = [data];
        }
        else {
          throw new Error('API response is not in a supported format');
        }

        // Additional validation to ensure each item has required properties
        const validatedMarathons = marathonsArray.map(item => ({
          _id: item._id || 'missing-id',
          title: item.title || 'Untitled Marathon',
          location: item.location || 'Location not specified',
          image: item.image || 'https://via.placeholder.com/300x200?text=No+Image',
          registrationStart: item.registrationStart || 'N/A',
          registrationEnd: item.registrationEnd || 'N/A'
        }));

        setMarathons(validatedMarathons);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMarathons();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p>Loading marathons...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-xl mx-auto">
          <h3 className="text-xl font-bold text-red-700 mb-3">⚠️ Error Loading Marathons</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <div className="flex justify-center gap-3">
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Reload Page
            </button>
            <button 
              onClick={() => setError(null)}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Try Again
            </button>
          </div>
          <p className="mt-4 text-sm text-gray-600">
            If the problem persists, contact support at support@marathonexample.com
          </p>
        </div>
      </div>
    );
  }

  if (!marathons.length) {
    return (
      <div className="text-center py-20">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-md mx-auto">
          <h3 className="text-xl font-bold text-yellow-700 mb-2">No Marathons Found</h3>
          <p className="mb-4">There are currently no marathons scheduled</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Check Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="py-12 bg-base-100">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">🏃 Featured Marathons</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {marathons.map((marathon) => (
            <div 
              key={marathon._id} 
              className="card bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-transform hover:scale-[1.02]"
            >
              <figure className="relative">
                <img 
                  src={marathon.image} 
                  alt={marathon.title} 
                  className="h-56 w-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Available';
                    e.target.classList.add('bg-gray-100');
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-xl font-bold text-white">{marathon.title}</h3>
                </div>
              </figure>
              <div className="card-body p-5">
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 dark:text-gray-300 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-gray-600 dark:text-gray-300">
                    {marathon.location}
                  </p>
                </div>
                <div className="flex items-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 dark:text-gray-300 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-gray-600 dark:text-gray-300">
                    {marathon.registrationStart} - {marathon.registrationEnd}
                  </p>
                </div>
                <div className="mt-3">
                  <Link
                    to={`/marathon/${marathon._id}`}
                    className="btn btn-primary w-full py-2 flex items-center justify-center"
                  >
                    View Details
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
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