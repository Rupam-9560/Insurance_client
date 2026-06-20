import { useEffect, useState } from "react";
import AdminNavbar from "../components/Adminnavbar";
import AdminProfileDropdown from "../components/AdminProfileDropdown";

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // dashboard stats
        const res = await fetch("http://localhost:1122/admin/dashboard", {
          credentials: "include",
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message);

        setStats(data.stats);

        // admin info
        const profileRes = await fetch("http://localhost:1122/admin/profile", {
          credentials: "include",
        });

        const profileData = await profileRes.json();
        setAdmin(profileData.admin);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  if (error) return <p className="p-6 text-red-600">{error}</p>;
  if (!stats || !admin) return <p className="p-6">Loading dashboard...</p>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminNavbar />

      <div className="flex-1 p-6">

        {/* Header with dropdown */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <AdminProfileDropdown admin={admin} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card title="Total Users" value={stats.totalUsers} />
          <Card title="Total Policies" value={stats.totalPolicies} />
          <Card title="Open Tickets" value={stats.openTickets} />
        </div>
      </div>
    </div>
  );
}

const Card = ({ title, value }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h2 className="text-gray-600 text-sm">{title}</h2>
    <p className="text-3xl font-bold mt-2">{value}</p>
  </div>
);

export default AdminDashboard;
