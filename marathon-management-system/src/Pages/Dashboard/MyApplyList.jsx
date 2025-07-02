import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthContext/AuthContext';
import Swal from 'sweetalert2';

const MyApplyList = () => {
  const { user } = useContext(AuthContext);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMyRegistrations = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!user?.email) {
        throw new Error("User email not available");
      }

      const token = localStorage.getItem('access-token');
      if (!token) {
        throw new Error("Authentication token not found");
      }

      const res = await fetch(`http://localhost:3000/registrations?email=${user.email}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Handle HTTP errors
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! Status: ${res.status}`
        );
      }
      
      const data = await res.json();
      
      // Handle different API response formats
      let registrationsArray = [];
      
      if (Array.isArray(data)) {
        registrationsArray = data;
      } 
      else if (data && Array.isArray(data.registrations)) {
        registrationsArray = data.registrations;
      } 
      else if (data && Array.isArray(data.results)) {
        registrationsArray = data.results;
      } 
      else if (data && Array.isArray(data.data)) {
        registrationsArray = data.data;
      }
      else if (data && typeof data === 'object' && !Array.isArray(data)) {
        // Handle single object response by wrapping in array
        registrationsArray = [data];
      } 
      else {
        throw new Error("API response is not in expected format");
      }

      setRegistrations(registrationsArray);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message || "Failed to load registrations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchMyRegistrations();
    }
  }, [user?.email]);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete this registration?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });
    
    if (confirm.isConfirmed) {
      try {
        const token = localStorage.getItem('access-token');
        if (!token) {
          throw new Error("Authentication token not found");
        }
        
        const res = await fetch(`http://localhost:3000/registrations/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(
            errorData.message || `HTTP error! Status: ${res.status}`
          );
        }
        
        const data = await res.json();
        
        if (data.deletedCount > 0 || data.success) {
          Swal.fire({
            title: 'Deleted!',
            text: 'Your registration has been deleted.',
            icon: 'success',
            timer: 2000
          });
          fetchMyRegistrations(); // refresh data
        } else {
          throw new Error("Deletion not confirmed by server");
        }
      } catch (err) {
        console.error('Delete error:', err);
        Swal.fire({
          title: 'Error!',
          text: err.message || 'Failed to delete registration',
          icon: 'error',
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p>Loading your registrations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-xl mx-auto">
          <h3 className="text-xl font-bold text-red-700 mb-3">⚠️ Error Loading Registrations</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={fetchMyRegistrations}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        📋 My Applied Marathons
      </h2>

      {registrations.length === 0 ? (
        <div className="text-center py-10">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 max-w-md mx-auto">
            <h3 className="text-xl font-bold text-blue-700 mb-3">No Marathon Registrations</h3>
            <p className="mb-4">You haven't registered for any marathons yet. Find exciting races to participate in!</p>
            <button 
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => window.location.href = '/marathons'}
            >
              Browse Marathons
            </button>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="table w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left">#</th>
                <th className="py-3 px-4 text-left">Marathon Title</th>
                <th className="py-3 px-4 text-left">Start Date</th>
                <th className="py-3 px-4 text-left">Contact</th>
                <th className="py-3 px-4 text-left">Additional Info</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((r, i) => (
                <tr key={r._id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">{i + 1}</td>
                  <td className="py-3 px-4 font-medium">{r.marathonTitle || 'Untitled Marathon'}</td>
                  <td className="py-3 px-4">{r.marathonStartDate || 'N/A'}</td>
                  <td className="py-3 px-4">{r.contact || 'Not provided'}</td>
                  <td className="py-3 px-4">{r.info || 'N/A'}</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      className="btn btn-error btn-xs text-white px-3 py-1 rounded"
                      onClick={() => handleDelete(r._id)}
                    >
                      Cancel Registration
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyApplyList;