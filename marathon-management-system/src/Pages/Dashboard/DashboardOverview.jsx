import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext/AuthContext";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Swal from "sweetalert2";

const DashboardOverview = () => {
  const { user } = useContext(AuthContext);
  const [marathons, setMarathons] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;
    const token = localStorage.getItem("access-token");

    // Fetch all marathons created by this user
    fetch(`https://marathon-server-omega.vercel.app/my-marathons?email=${user.email}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setMarathons(data.data || []))
      .catch(err => Swal.fire("Error", err.message, "error"));

    // Fetch all registrations
    fetch(`https://marathon-server-omega.vercel.app/registrations?email=${user.email}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setRegistrations(data.data || []))
      .catch(err => Swal.fire("Error", err.message, "error"))
      .finally(() => setLoading(false));
  }, [user]);

  // Compute statistics
  const totalMarathons = marathons.length;
  const totalRegistrations = registrations.length;

  const registrationsPerMarathon = marathons.map(m => ({
    name: m.title,
    registrations: m.totalRegistration || 0,
  }));

  // Example: gender distribution (assuming registration has gender field)
  const genderDistribution = ["Male", "Female", "Other"].map(g => ({
    name: g,
    value: registrations.filter(r => r.gender === g).length,
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-center">🏁 Dashboard Overview</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow text-center">
          <h2 className="text-xl font-semibold mb-2">Total Marathons</h2>
          <p className="text-4xl font-bold text-blue-600">{totalMarathons}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow text-center">
          <h2 className="text-xl font-semibold mb-2">Total Registrations</h2>
          <p className="text-4xl font-bold text-green-600">{totalRegistrations}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow text-center">
          <h2 className="text-xl font-semibold mb-2">Upcoming Marathon</h2>
          <p className="text-lg">{marathons[0]?.title || "N/A"}</p>
          <p className="text-sm text-gray-500">{marathons[0]?.marathonStartDate || ""}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Registrations per Marathon (Bar Chart) */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-center">Registrations per Marathon</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={registrationsPerMarathon} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="registrations" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gender Distribution (Pie Chart) */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-center">Gender Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={genderDistribution} dataKey="value" nameKey="name" outerRadius={100} fill="#82ca9d" label>
                {genderDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
