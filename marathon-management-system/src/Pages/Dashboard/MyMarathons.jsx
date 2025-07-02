import { useContext, useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Contexts/AuthContext/AuthContext';

const MyMarathons = () => {
  const { user } = useContext(AuthContext);
  const [marathons, setMarathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    fetchMarathons();
  }, [user?.email]);

  const fetchMarathons = async () => {
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

      const res = await fetch(`http://localhost:3000/my-marathons?email=${user.email}`, {
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
    } catch (error) {
      console.error('Error fetching marathons:', error);
      setError(error.message || "Failed to load marathons");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this marathon?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    });

    if (confirm.isConfirmed) {
      try {
        const token = localStorage.getItem('access-token');
        if (!token) {
          throw new Error("Authentication token not found");
        }

        const res = await fetch(`http://localhost:3000/marathons/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(
            errorData.message || `HTTP error! Status: ${res.status}`
          );
        }
        
        const result = await res.json();
        
        if (result.deletedCount > 0 || result.success) {
          Swal.fire({
            title: 'Deleted!',
            text: 'Marathon has been deleted.',
            icon: 'success',
            timer: 2000
          });
          fetchMarathons();
        } else {
          throw new Error("Deletion not confirmed by server");
        }
      } catch (error) {
        console.error('Delete error:', error);
        Swal.fire({
          title: 'Error!',
          text: error.message || 'Failed to delete marathon',
          icon: 'error',
        });
      }
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    if (!editData || !editData._id) {
      Swal.fire('Error!', 'Invalid marathon data', 'error');
      return;
    }

    try {
      const token = localStorage.getItem('access-token');
      if (!token) {
        throw new Error("Authentication token not found");
      }

      const updated = {
        title: form.title.value || editData.title,
        location: form.location.value || editData.location,
        registrationStart: form.startDate.value || editData.registrationStart,
        registrationEnd: form.endDate.value || editData.registrationEnd,
        distance: form.distance.value || editData.distance,
      };

      const res = await fetch(`http://localhost:3000/marathons/${editData._id}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updated),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! Status: ${res.status}`
        );
      }

      Swal.fire({
        title: 'Updated!',
        text: 'Marathon updated successfully.',
        icon: 'success',
        timer: 2000
      });
      setEditData(null);
      fetchMarathons();
    } catch (error) {
      console.error('Update error:', error);
      Swal.fire({
        title: 'Error!',
        text: error.message || 'Failed to update marathon',
        icon: 'error',
      });
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p>Loading your marathons...</p>
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
              onClick={fetchMarathons}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        📋 My Created Marathons
      </h2>

      {marathons.length === 0 ? (
        <div className="text-center py-10">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 max-w-md mx-auto">
            <h3 className="text-xl font-bold text-blue-700 mb-3">No Marathons Created Yet</h3>
            <p className="mb-4">You haven't created any marathons. Start organizing your first marathon today!</p>
            <button 
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => window.location.href = '/add-marathon'}
            >
              Create Your First Marathon
            </button>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="table w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left">#</th>
                <th className="py-3 px-4 text-left">Title</th>
                <th className="py-3 px-4 text-left">Location</th>
                <th className="py-3 px-4 text-left">Reg Start</th>
                <th className="py-3 px-4 text-left">Reg End</th>
                <th className="py-3 px-4 text-left">Distance</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {marathons.map((m, i) => (
                <tr key={m._id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">{i + 1}</td>
                  <td className="py-3 px-4 font-medium">{m.title}</td>
                  <td className="py-3 px-4">{m.location}</td>
                  <td className="py-3 px-4">{m.registrationStart}</td>
                  <td className="py-3 px-4">{m.registrationEnd}</td>
                  <td className="py-3 px-4">{m.distance} km</td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex justify-center space-x-2">
                      <button 
                        onClick={() => setEditData(m)} 
                        className="btn btn-xs btn-info text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(m._id)} 
                        className="btn btn-xs btn-error text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for Update */}
      {editData && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <form
            onSubmit={handleEditSubmit}
            className="bg-white p-6 rounded-lg shadow-xl space-y-4 w-full max-w-md"
          >
            <h3 className="text-xl font-bold mb-4">✏️ Edit Marathon</h3>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input 
                  type="text" 
                  name="title" 
                  defaultValue={editData.title} 
                  className="input input-bordered w-full"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <input 
                  type="text" 
                  name="location" 
                  defaultValue={editData.location} 
                  className="input input-bordered w-full"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Reg Start</label>
                  <input 
                    type="date" 
                    name="startDate" 
                    defaultValue={editData.registrationStart} 
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Reg End</label>
                  <input 
                    type="date" 
                    name="endDate" 
                    defaultValue={editData.registrationEnd} 
                    className="input input-bordered w-full"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Distance (km)</label>
                <input 
                  type="number" 
                  name="distance" 
                  defaultValue={editData.distance} 
                  className="input input-bordered w-full"
                  min="1"
                  step="0.5"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button 
                type="button" 
                onClick={() => setEditData(null)} 
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn btn-primary"
              >
                Update Marathon
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default MyMarathons;