import { useEffect, useState } from "react";
import UserNavbar from "../components/UserNavbar";
import UserProfileDropdown from "../components/UserProfileDropdown";

function UserDashboard() {
  const [stats, setStats] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch("http://localhost:1122/dashboard", {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message);

        setUser(data.user);
        setStats(data.stats);
      } catch (err) {
        console.error("Dashboard Error:", err.message);
      }
    };

    fetchDashboard();
  }, []);

  if (!stats || !user) {
    return <p className="p-6">Loading dashboard...</p>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <UserNavbar user={user} />

      <div className="flex-1 p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome back!{" "}
            <span className="text-red-500">{user.name}</span>
          </h1>

          <UserProfileDropdown user={user} />
        </div>

        {/* POLICY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card title="Total Policies" value={stats.totalPolicies} color="purple" />
          <Card title="Approved Policies" value={stats.approvedPolicies} color="blue" />
          <Card title="Disapproved Policies" value={stats.disapprovedPolicies} color="pink" />
          <Card title="Waiting for Approval" value={stats.pendingPolicies} color="teal" />
        </div>

        {/* TICKET CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <Card title="Total Tickets" value={stats.totalTickets} color="blue" />
          <Card title="Unresolved Tickets" value={stats.openTickets} color="red" />
          <Card title="Resolved Tickets" value={stats.resolvedTickets} color="green" />
        </div>

      </div>
    </div>
  );
}

/* Tailwind safe colors */
const colorMap = {
  purple: "text-purple-600",
  blue: "text-blue-600",
  pink: "text-pink-600",
  teal: "text-teal-600",
  red: "text-red-600",
  green: "text-green-600",
};

const Card = ({ title, value, color }) => (
  <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
    <h2 className="text-gray-600 text-sm">{title}</h2>
    <p className={`text-3xl font-bold mt-2 ${colorMap[color]}`}>
      {value}
    </p>
  </div>
);

export default UserDashboard;