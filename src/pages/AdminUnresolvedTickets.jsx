import { useEffect, useState } from "react";
import AdminNavbar from "@/components/AdminNavbar";
import AdminHeader from "@/components/AdminHeader";

export default function AdminUnresolvedTickets() {
  const [tickets, setTickets] = useState([]);
  const [reply, setReply] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  // Correct API Route
  const fetchTickets = () => {
    fetch(`${import.meta.env.VITE_BASE_URL}/admin/tickets/unresolved`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setTickets(data);
      })
      .catch((err) => console.log("Fetch error:", err));
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const sendReply = async () => {
    if (!reply) return alert("Reply required");

    try {
      await fetch(
        `${import.meta.env.VITE_BASE_URL}/admin/tickets/${selectedId}/reply`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ reply }),
        }
      );

      setReply("");
      setSelectedId(null);
      fetchTickets();
    } catch (err) {
      console.log("Reply error:", err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminNavbar />

      <div className="flex-1 p-8 space-y-8">
        <AdminHeader title="Unresolved Tickets" />

        {tickets.length === 0 ? (
          <div className="bg-white border rounded-xl shadow-sm p-10 text-center text-gray-500">
            No unresolved tickets found.
          </div>
        ) : (
          <div className="space-y-6">
            {tickets.map((ticket) => (
              <div
                key={ticket._id}
                className="bg-white border rounded-xl shadow-sm p-6 hover:shadow-md transition"
              >
                {/* Header */}
                <div className="flex justify-between items-start border-b pb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {ticket.subject}
                    </h2>

                    <div className="mt-2 text-sm text-gray-500">
                      <p>
                        <span className="font-medium text-gray-700">
                          Sent By:
                        </span>{" "}
                        {ticket.user?.name || "N/A"}
                      </p>
                      <p>
                        <span className="font-medium text-gray-700">
                          Email:
                        </span>{" "}
                        {ticket.user?.email || "N/A"}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs px-3 py-1 rounded-full bg-red-100 text-red-600 font-medium">
                    Unresolved
                  </span>
                </div>

                {/* User Message */}
                <div className="mt-5">
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    User Message:
                  </p>
                  <div className="bg-gray-50 border rounded-lg p-4 text-gray-700">
                    {ticket.message}
                  </div>
                </div>

                {/* Reply Section */}
                <div className="mt-6">
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    Your Reply:
                  </p>

                  <textarea
                    rows="3"
                    className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Write your reply..."
                    value={selectedId === ticket._id ? reply : ""}
                    onChange={(e) => {
                      setReply(e.target.value);
                      setSelectedId(ticket._id);
                    }}
                  />

                  <div className="flex justify-end mt-3">
                    <button
                      onClick={sendReply}
                      disabled={!reply || selectedId !== ticket._id}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition
                        ${
                          reply && selectedId === ticket._id
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
                    >
                      Send Reply
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}