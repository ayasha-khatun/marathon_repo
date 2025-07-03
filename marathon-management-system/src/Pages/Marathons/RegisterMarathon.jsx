import { useParams, useNavigate } from 'react-router';
import { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Contexts/AuthContext/AuthContext';

const RegisterMarathon = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);
  const [marathon, setMarathon] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const API = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  const token = localStorage.getItem('access-token');

  // Fetch marathon details
  useEffect(() => {
    fetch(`${API}/marathons/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setMarathon(data.data);
        } else {
          Swal.fire('Error', 'Marathon not found.', 'error');
          navigate('/marathons');
        }
      })
      .catch(() => {
        Swal.fire('Error', 'Failed to fetch marathon data.', 'error');
      });
  }, [id, API, navigate]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!user) return <div className="text-center py-20 text-red-500">Please login to register.</div>;
  if (!marathon) return <div className="text-center py-20">Loading marathon details...</div>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target;
    const registration = {
      email: user.email,
      marathonId: marathon._id,
      marathonTitle: marathon.title,
      marathonStartDate: marathon.marathonStartDate,
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      contact: form.contact.value,
      info: form.info.value,
    };

    try {
      const res = await fetch(`${API}/registrations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(registration),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Update registration count
        await fetch(`${API}/marathons/${marathon._id}/increment`, {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        Swal.fire('✅ Success', 'You have successfully registered!', 'success');
        navigate('/dashboard/my-apply');
      } else {
        Swal.fire('❌ Error', data.message || 'Registration failed', 'error');
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Server Error', err.message, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-800 rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">🏁 Register for {marathon.title}</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="email" value={user?.email || ''} readOnly className="input input-bordered w-full" />
        <input type="text" value={marathon?.title || ''} readOnly className="input input-bordered w-full" />
        <input type="text" value={marathon?.marathonStartDate || ''} readOnly className="input input-bordered w-full" />

        <input type="text" name="firstName" placeholder="First Name" required className="input input-bordered w-full" />
        <input type="text" name="lastName" placeholder="Last Name" required className="input input-bordered w-full" />
        <input type="tel" name="contact" placeholder="Contact Number" required className="input input-bordered w-full" />
        <textarea name="info" placeholder="Additional Info" className="textarea textarea-bordered w-full"></textarea>

        <button type="submit" disabled={isSubmitting} className="btn btn-primary w-full">
          {isSubmitting ? 'Submitting...' : 'Submit Registration'}
        </button>
      </form>
    </div>
  );
};

export default RegisterMarathon;
