import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRequestOTP = async () => {
    if (!email) {
      setMessage("Email is required");
      return;
    }

    try {
      const res = await fetch("http://localhost:1122/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      alert("OTP sent successfully!");
      navigate("/reset-password", { state: { email } });

    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-6 shadow rounded w-96">
        <h2 className="text-xl font-bold mb-4">Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter your registered email"
          className="border p-2 w-full mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {message && <p className="text-red-500">{message}</p>}

        <button
          onClick={handleRequestOTP}
          className="bg-blue-600 text-white px-4 py-2 w-full rounded"
        >
          Request OTP
        </button>
      </div>
    </div>
  );
}