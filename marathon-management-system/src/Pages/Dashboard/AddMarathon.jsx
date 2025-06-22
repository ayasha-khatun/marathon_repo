import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthContext/AuthContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';

const AddMarathon = () => {
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    title: '',
    location: '',
    distance: '10K',
    image: '',
    description: '',
  });

  const [regStart, setRegStart] = useState(new Date());
  const [regEnd, setRegEnd] = useState(new Date());
  const [marathonDate, setMarathonDate] = useState(new Date());

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const marathon = {
      ...formData,
      registrationStart: regStart.toISOString().split('T')[0],
      registrationEnd: regEnd.toISOString().split('T')[0],
      marathonStartDate: marathonDate.toISOString().split('T')[0],
      createdAt: new Date(),
      totalRegistration: 0,
      organizerEmail: user?.email
    };

    try {
      const res = await fetch('http://localhost:3000/marathons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(marathon)
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire('Success!', 'Marathon created successfully!', 'success');
        e.target.reset();
      } else {
        Swal.fire('Error!', data.message || 'Failed to create marathon.', 'error');
      }
    } catch (error) {
      Swal.fire('Server Error', error.message, 'error');
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        ➕ Create a New Marathon Event
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="title"
          placeholder="Marathon Title"
          onChange={handleChange}
          required
          className="input input-bordered w-full"
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          onChange={handleChange}
          required
          className="input input-bordered w-full"
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          onChange={handleChange}
          required
          className="input input-bordered w-full"
        />

        <select
          name="distance"
          value={formData.distance}
          onChange={handleChange}
          required
          className="select select-bordered w-full"
        >
          <option value="3K">3K</option>
          <option value="10K">10K</option>
          <option value="25K">25K</option>
        </select>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-1 font-semibold text-sm">Start Registration</label>
            <DatePicker selected={regStart} onChange={(date) => setRegStart(date)} className="input input-bordered w-full" />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-sm">End Registration</label>
            <DatePicker selected={regEnd} onChange={(date) => setRegEnd(date)} className="input input-bordered w-full" />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-sm">Marathon Start Date</label>
            <DatePicker selected={marathonDate} onChange={(date) => setMarathonDate(date)} className="input input-bordered w-full" />
          </div>
        </div>

        <textarea
          name="description"
          placeholder="Description"
          rows="4"
          onChange={handleChange}
          className="textarea textarea-bordered w-full"
        ></textarea>

        <button type="submit" className="btn btn-primary w-full">
          Submit Marathon
        </button>
      </form>
    </div>
  );
};

export default AddMarathon;
