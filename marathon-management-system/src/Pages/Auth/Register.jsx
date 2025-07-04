import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from './../../Contexts/AuthContext/AuthContext';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { createUser } = useContext(AuthContext);

  const validatePassword = (password) => {
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const isLongEnough = password.length >= 6;

    if (!hasUpper) {
      toast.error('Password must have at least one uppercase letter');
      return false;
    }
    if (!hasLower) {
      toast.error('Password must have at least one lowercase letter');
      return false;
    }
    if (!isLongEnough) {
      toast.error('Password must be at least 6 characters');
      return false;
    }

    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photoURL = form.photo.value;
    const password = form.password.value;

    if (!validatePassword(password)) return;
    

    try {
      // 1. Register in Firebase
      await createUser(email, password);

      // 2. Save user to your own DB
      const res = await fetch('https://your-server.com/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, photoURL }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Registration successful!');
        form.reset();
        setTimeout(() => navigate('/login'), 1500);
      } else {
        toast.error(data.message || 'Registration failed');
      }
    } catch (err) {
      console.error(err);
      toast.error('Registration error. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-base-200">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow space-y-6">
        <h2 className="text-2xl font-bold text-center">Create Account</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input type="text" name="name" placeholder="Full Name" required className="input input-bordered w-full" />
          <input type="email" name="email" placeholder="Email" required className="input input-bordered w-full" />
          <input type="text" name="photo" placeholder="Photo URL" required className="input input-bordered w-full" />

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              required
              className="input input-bordered w-full pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2 text-sm text-gray-600"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          <button onClick={() => navigate('/')} type="submit" className="btn btn-primary w-full">Register</button>
        </form>

        <p className="text-sm text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">Login here</Link>
        </p>
      </div>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default Register;
