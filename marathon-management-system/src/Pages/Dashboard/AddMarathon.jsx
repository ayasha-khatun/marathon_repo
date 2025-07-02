import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthContext/AuthContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';

const AddMarathon = () => {
  const { user } = useContext(AuthContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    
    // Clear error when field is updated
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.image.trim()) newErrors.image = 'Image URL is required';
    if (regEnd < regStart) newErrors.dates = 'Registration end must be after start';
    if (marathonDate < regEnd) newErrors.marathonDate = 'Marathon date must be after registration end';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    const token = localStorage.getItem('access-token');
    if (!token) {
      Swal.fire('Authentication Error', 'Please login to create a marathon', 'error');
      setIsSubmitting(false);
      return;
    }

    const marathon = {
      ...formData,
      registrationStart: regStart.toISOString().split('T')[0],
      registrationEnd: regEnd.toISOString().split('T')[0],
      marathonStartDate: marathonDate.toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
      totalRegistration: 0,
      creatorEmail: user?.email
    };

    try {
      const res = await fetch('http://localhost:3000/marathons', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`  // Added authorization header
        },
        body: JSON.stringify(marathon)
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          title: 'Success!',
          text: 'Marathon created successfully!',
          icon: 'success',
          timer: 2000
        });
        
        // Reset form
        e.target.reset();
        setFormData({
          title: '',
          location: '',
          distance: '10K',
          image: '',
          description: '',
        });
        setRegStart(new Date());
        setRegEnd(new Date());
        setMarathonDate(new Date());
      } else {
        const errorMsg = data.message || data.error || 'Failed to create marathon';
        Swal.fire('Error!', errorMsg, 'error');
      }
    } catch (error) {
      Swal.fire('Server Error', error.message || 'Network error occurred', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 md:p-8 rounded-lg shadow-xl">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        🏁 Create a New Marathon Event
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 font-medium">Marathon Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter marathon title"
            value={formData.title}
            onChange={handleChange}
            required
            className={`input input-bordered w-full ${errors.title ? 'input-error' : ''}`}
          />
          {errors.title && <p className="mt-1 text-red-500 text-sm">{errors.title}</p>}
        </div>

        <div>
          <label className="block mb-2 font-medium">Location</label>
          <input
            type="text"
            name="location"
            placeholder="Enter location"
            value={formData.location}
            onChange={handleChange}
            required
            className={`input input-bordered w-full ${errors.location ? 'input-error' : ''}`}
          />
          {errors.location && <p className="mt-1 text-red-500 text-sm">{errors.location}</p>}
        </div>

        <div>
          <label className="block mb-2 font-medium">Image URL</label>
          <input
            type="text"
            name="image"
            placeholder="Enter image URL"
            value={formData.image}
            onChange={handleChange}
            required
            className={`input input-bordered w-full ${errors.image ? 'input-error' : ''}`}
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Distance</label>
          <select
            name="distance"
            value={formData.distance}
            onChange={handleChange}
            required
            className="select select-bordered w-full"
          >
            <option value="3K">3K</option>
            <option value="5K">5K</option>
            <option value="10K">10K</option>
            <option value="21K">Half Marathon (21K)</option>
            <option value="42K">Full Marathon (42K)</option>
          </select>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-1 font-semibold">Start Registration</label>
            <DatePicker 
              selected={regStart} 
              onChange={(date) => setRegStart(date)} 
              minDate={new Date()}
              className="input input-bordered w-full" 
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">End Registration</label>
            <DatePicker 
              selected={regEnd} 
              onChange={(date) => setRegEnd(date)} 
              minDate={regStart}
              className="input input-bordered w-full" 
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Marathon Date</label>
            <DatePicker 
              selected={marathonDate} 
              onChange={(date) => setMarathonDate(date)} 
              minDate={regEnd}
              className="input input-bordered w-full" 
            />
          </div>
        </div>
        {errors.dates && <p className="mt-1 text-red-500 text-sm">{errors.dates}</p>}
        {errors.marathonDate && <p className="mt-1 text-red-500 text-sm">{errors.marathonDate}</p>}

        <div>
          <label className="block mb-2 font-medium">Description</label>
          <textarea
            name="description"
            placeholder="Enter description about the marathon..."
            rows="4"
            value={formData.description}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
          ></textarea>
        </div>

        <button 
          type="submit" 
          className="btn btn-primary w-full py-3 text-lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="loading loading-spinner"></span> 
              Creating Marathon...
            </>
          ) : (
            'Submit Marathon'
          )}
        </button>
      </form>
    </div>
  );
};

export default AddMarathon;