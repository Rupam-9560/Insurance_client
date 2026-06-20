import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Session expired. Please request OTP again.");
      return;
    }

    if (!otp || !newPassword) {
      setMessage("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:1122/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      alert("Password updated successfully!");
      navigate("/login");

    } catch (err) {
      setMessage(err.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-6 shadow rounded w-96">
        <h2 className="text-xl font-bold mb-4 text-center">
          Reset Password
        </h2>

        <form onSubmit={handleReset} className="space-y-3">
          <input
            type="text"
            placeholder="Enter OTP"
            className="border p-2 w-full rounded"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter New Password"
            className="border p-2 w-full rounded"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          {message && (
            <p className="text-red-500 text-sm">{message}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 w-full rounded"
          >
            {loading ? "Updating..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}