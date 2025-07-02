import React, { useEffect, useState } from 'react';

const UpcomingMarathon = () => {
  const [marathons, setMarathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch('http://localhost:3000/upcomingMarathon');
        
        // 1. Check for HTTP errors
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(
            errorData.message || `HTTP error! Status: ${res.status}`
          );
        }
        
        const data = await res.json();
        console.log("API Response:", data); // For debugging
        
        // 2. Handle different API response formats
        let marathonsArray = [];
        
        if (Array.isArray(data)) {
          // Direct array response
          marathonsArray = data;
        } 
        else if (data && Array.isArray(data.marathons)) {
          // Response format: { marathons: [...] }
          marathonsArray = data.marathons;
        } 
        else if (data && Array.isArray(data.results)) {
          // Response format: { results: [...] }
          marathonsArray = data.results;
        } 
        else if (data && Array.isArray(data.data)) {
          // Response format: { data: [...] }
          marathonsArray = data.data;
        } 
        else if (data && data.data && Array.isArray(data.data.results)) {
          // Response format: { data: { results: [...] } }
          marathonsArray = data.data.results;
        }
        else {
          // Handle single object response by wrapping in array
          if (data && typeof data === 'object' && !Array.isArray(data)) {
            marathonsArray = [data];
          } else {
            throw new Error("API response is not in expected format");
          }
        }

        setMarathons(marathonsArray);
      } catch (err) {
        console.error('Failed to load upcoming marathons', err);
        setError(err.message || "Failed to load marathons");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading upcoming marathons...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <div className="text-red-500 text-xl font-medium mb-4">
          ⚠️ Failed to load marathons
        </div>
        <p className="text-gray-600 mb-6">Error: {error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Try Again
        </button>
        <p className="mt-4 text-sm text-gray-500">
          If the problem persists, contact support
        </p>
      </div>
    );
  }

  if (!marathons.length) {
    return (
      <div className="my-10 text-center">
        <h1 className="text-3xl font-bold py-6">
          Get Ready to Run – Upcoming Marathons
        </h1>
        <div className="max-w-md mx-auto bg-yellow-50 rounded-lg p-6 border border-yellow-200">
          <p className="text-lg">🏁 No upcoming marathons found</p>
          <p className="mt-2 text-gray-600">
            Check back later for new marathon announcements
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="my-10">
      <h1 className="text-3xl font-bold py-6 text-center">
        Get Ready to Run – Upcoming Marathons
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {marathons.map((item) => (
          <div 
            key={item._id || item.id} 
            className="rounded-lg shadow-lg border border-gray-100 p-4 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-48 object-cover rounded-lg"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/300x200?text=Marathon+Image';
                  e.target.className = "w-full h-48 object-cover rounded-lg bg-gray-200";
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 rounded-b-lg">
                <h2 className="text-xl font-bold text-white">{item.title}</h2>
              </div>
            </div>
            <div className="mt-3">
              <p className="flex items-center text-sm text-gray-600 mt-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {item.location}
              </p>
              <p className="flex items-center text-sm text-gray-500 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {item.registrationStart} → {item.registrationEnd}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingMarathon;