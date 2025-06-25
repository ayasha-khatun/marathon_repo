import { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Contexts/AuthContext/AuthContext';

const MyMarathons = () => {
  const { user } = useContext(AuthContext);
  const [marathons, setMarathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState(null);

  const fetchMarathons = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/my-marathons?email=${user?.email}`);
      const data = await res.json();
      setMarathons(data);
    } catch (error) {
      console.error('Error fetching marathons:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) fetchMarathons();
  }, [user]);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this marathon?',
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
        Swal.fire('Deleted!', 'Marathon has been deleted.', 'success');
        fetchMarathons();
      }
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updated = {
      title: form.title.value,
      location: form.location.value,
      startRegistrationDate: form.startDate.value,
      endRegistrationDate: form.endDate.value,
      runningDistance: form.distance.value,
    };

    const res = await fetch(`http://localhost:3000/marathons/${editData._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    });

    if (res.ok) {
      Swal.fire('Updated!', 'Marathon updated successfully.', 'success');
      setEditData(null);
      fetchMarathons();
    } else {
      Swal.fire('Error!', 'Failed to update marathon.', 'error');
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
                <th>Reg Start</th>
                <th>Reg End</th>
                <th>Distance</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {marathons.map((m, i) => (
                <tr key={m._id}>
                  <td>{i + 1}</td>
                  <td>{m.title}</td>
                  <td>{m.location}</td>
                  <td>{m.registrationStart}</td>
                  <td>{m.registrationEnd}</td>
                  <td>{m.distance}</td>
                  <td className="space-x-2">
                    <button onClick={() => setEditData(m)} className="btn btn-xs btn-info">Edit</button>
                    <button onClick={() => handleDelete(m._id)} className="btn btn-xs btn-error">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for Update */}
      {editData && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <form
            onSubmit={handleEditSubmit}
            className="bg-white p-6 rounded shadow space-y-4 w-full max-w-md"
          >
            <h3 className="text-lg font-bold mb-2">✏️ Edit Marathon</h3>

            <input type="text" name="title" defaultValue={editData.title} className="input input-bordered w-full" />
            <input type="text" name="location" defaultValue={editData.location} className="input input-bordered w-full" />
            <input type="text" name="startDate" defaultValue={editData.registrationStart} className="input input-bordered w-full" />
            <input type="text" name="endDate" defaultValue={editData.registrationEnd} className="input input-bordered w-full" />
            <input type="text" name="distance" defaultValue={editData.distance} className="input input-bordered w-full" />

            <div className="flex justify-end gap-2">
              <button type="submit" className="btn btn-success btn-sm">Update</button>
              <button type="button" onClick={() => setEditData(null)} className="btn btn-outline btn-sm">Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default MyMarathons;
