import { useEffect, useState } from "react";
import UserNavbar from "../components/UserNavbar";
import UserProfileDropdown from "../components/UserProfileDropdown";

export default function UserTicketHistory() {
  const [tickets, setTickets] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch logged-in user (for dropdown)
    fetch(`${import.meta.env.VITE_BASE_URL}/dashboard`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setUser(data.user))
      .catch(console.error);

    // Fetch tickets
    fetch(`${import.meta.env.VITE_BASE_URL}/user/tickets`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setTickets(data))
      .catch(console.error);
  }, []);

  if (!user) return <p className="p-6">Loading...</p>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <UserNavbar user={user} />

      <div className="flex-1 p-10">
        {/* Header with Dropdown */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-blue-600">
            Ticket History
          </h1>

          <UserProfileDropdown user={user} />
        </div>

        {/* Ticket List */}
        {tickets.length === 0 ? (
          <p>No tickets submitted yet.</p>
        ) : (
          <div className="space-y-6">
            {tickets.map((ticket) => (
              <div
                key={ticket._id}
                className="bg-white p-6 rounded-xl shadow border hover:shadow-md transition"
              >
                <div className="flex justify-between items-center">
                  <h2 className="font-bold text-lg">
                    {ticket.subject}
                  </h2>

                  <span
                    className={`px-3 py-1 text-xs rounded-full font-medium ${
                      ticket.status === "resolved"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {ticket.status}
                  </span>
                </div>

                <p className="text-gray-600 mt-3">
                  {ticket.message}
                </p>

                {ticket.adminReply && (
                  <div className="mt-4 p-3 bg-blue-50 rounded">
                    <strong>Admin Reply:</strong>
                    <p>{ticket.adminReply}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}