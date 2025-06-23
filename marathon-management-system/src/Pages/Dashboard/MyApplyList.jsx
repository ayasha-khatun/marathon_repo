import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthContext/AuthContext';
import Swal from 'sweetalert2';

const MyApplyList = () => {
  const { user } = useContext(AuthContext);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyRegistrations = async () => {
    try {
      const res = await fetch(`http://localhost:3000/registrations?email=${user?.email}`);
      const data = await res.json();
      setRegistrations(data);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchMyRegistrations();
    }
  }, [user?.email]);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete this registration?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch(`http://localhost:3000/registrations/${id}`, {
          method: 'DELETE',
        });
        const data = await res.json();

        if (data.deletedCount > 0) {
          Swal.fire('Deleted!', 'Your registration has been deleted.', 'success');
          fetchMyRegistrations(); // refresh
        }
      }
    });
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">📋 My Applied Marathons</h2>
      {registrations.length === 0 ? (
        <p className="text-gray-500">No registrations found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full table-zebra">
            <thead>
              <tr>
                <th>#</th>
                <th>Marathon Title</th>
                <th>Start Date</th>
                <th>Contact</th>
                <th>Info</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((r, i) => (
                <tr key={r._id}>
                  <td>{i + 1}</td>
                  <td>{r.marathonTitle}</td>
                  <td>{r.marathonStartDate}</td>
                  <td>{r.contact}</td>
                  <td>{r.info || 'N/A'}</td>
                  <td>
                    {/* Future: Update functionality here */}
                    <button
                      className="btn btn-xs btn-error"
                      onClick={() => handleDelete(r._id)}
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

export default MyApplyList;
