import { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import AdminHeader from "../components/AdminHeader";

export default function AdminResolvedTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTickets = async () => {
    try {
      const res = await fetch(
        "http://localhost:1122/admin/tickets/resolved",
        { credentials: "include" }
      );

      const data = await res.json();
      setTickets(data);
    } catch (err) {
      console.log("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminNavbar />

      {/* Main Content */}
      <div className="flex-1 p-10 space-y-6">
        {/* ✅ Top Header With Dropdown */}
        <AdminHeader title="Resolved Tickets" />

        {/* Tickets Section */}
        <div className="space-y-6">
          {loading ? (
            <div className="bg-white p-6 rounded shadow text-center text-gray-500">
              Loading tickets...
            </div>
          ) : tickets.length === 0 ? (
            <div className="bg-white p-6 rounded shadow text-center text-gray-500">
              No resolved tickets found.
            </div>
          ) : (
            tickets.map((ticket) => (
              <div
                key={ticket._id}
                className="bg-white p-6 rounded-2xl shadow-md border hover:shadow-lg transition"
              >
                <h2 className="font-bold text-lg text-gray-800">
                  {ticket.subject}
                </h2>

                <p className="text-gray-600 mt-1">
                  {ticket.user?.name} ({ticket.user?.email})
                </p>

                <p className="mt-3 text-gray-700">{ticket.message}</p>

                <div className="mt-4 p-4 bg-green-50 rounded-xl border border-green-200">
                  <strong className="text-green-700">
                    Admin Reply:
                  </strong>
                  <p className="mt-1 text-gray-800">
                    {ticket.adminReply}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}