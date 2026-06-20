import { useState, useEffect } from "react";
import UserNavbar from "../components/UserNavbar";
import UserProfileDropdown from "../components/UserProfileDropdown";
import { useNavigate } from "react-router-dom";

export default function UserGenerateTicket() {
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState(""); // ✅ FIXED
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  // Fetch logged-in user
  useEffect(() => {
    fetch("http://localhost:1122/dashboard", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setUser(data.user))
      .catch(console.error);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subject.trim() || !message.trim() || !category) {
      return alert("All fields are required");
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:1122/user/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          subject,
          message,
          category,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        return alert(data.message || "Failed to create ticket");
      }

      alert("Ticket submitted successfully!");
      navigate("/user/ticket/history");
    } catch (err) {
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <p className="p-6">Loading...</p>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <UserNavbar user={user} />

      <div className="flex-1 p-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-blue-600">
            Generate Support Ticket
          </h1>

          <UserProfileDropdown user={user} />
        </div>

        {/* Form Card */}
        <div className="max-w-xl bg-white p-8 rounded-xl shadow-md border">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Subject */}
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Subject
              </label>

              <input
                type="text"
                placeholder="Enter ticket subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Category Dropdown */}
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Category
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="" disabled>
                  Nature of Issue
                </option>

                <option value="payment">Payment Issue</option>
                <option value="policy">Policy Issue</option>
                <option value="claim">Claim Issue</option>
                <option value="technical">Technical Issue</option>
                <option value="billing">Billing</option>
                <option value="account">Account Problem</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Message
              </label>

              <textarea
                rows="5"
                placeholder="Describe your issue..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 active:bg-blue-800 disabled:opacity-60 transition-all"
            >
              {loading ? "Submitting..." : "Submit Ticket"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}