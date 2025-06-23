import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthContext/AuthContext';
import Swal from 'sweetalert2';

const MyMarathons = () => {
  const { user } = useContext(AuthContext);
  const [marathons, setMarathons] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyMarathons = async () => {
    try {
      const res = await fetch(`http://localhost:3000/my-marathons?email=${user?.email}`);
      const data = await res.json();
      setMarathons(data);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) fetchMyMarathons();
  }, [user?.email]);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Delete this marathon?',
      text: 'This action is irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirm.isConfirmed) {
      const res = await fetch(`http://localhost:3000/marathons/${id}`, {
        method: 'DELETE',
      });
      const result = await res.json();

      if (result.deletedCount > 0) {
        Swal.fire('Deleted!', 'Marathon deleted successfully.', 'success');
        fetchMyMarathons();
      }
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">📋 My Created Marathons</h2>

      {marathons.length === 0 ? (
        <p className="text-gray-500">No marathons found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full table-zebra">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Location</th>
                <th>Start</th>
                <th>End</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {marathons.map((marathon, i) => (
                <tr key={marathon._id}>
                  <td>{i + 1}</td>
                  <td>{marathon.title}</td>
                  <td>{marathon.location}</td>
                  <td>{marathon.startRegistrationDate}</td>
                  <td>{marathon.endRegistrationDate}</td>
                  <td>
                    {/* You can add modal for update here */}
                    <button
                      onClick={() => handleDelete(marathon._id)}
                      className="btn btn-xs btn-error"
                    >
                      Delete
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

export default MyMarathons;
