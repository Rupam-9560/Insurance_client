import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MyProfile() {
  const navigate = useNavigate(); // ✅ add navigation

  const [form, setForm] = useState({
    name: "",
    number: "",
    email: "",
    gender: "male",
  });

  const [message, setMessage] = useState("");

  // ======================
  // Fetch user on load
  // ======================
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/profile`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setForm(data.user));
  }, []);

  // ======================
  // handle change
  // ======================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ======================
  // save profile
  // ======================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      // ✅ redirect to dashboard after update
      navigate("/dashboard", { replace: true });
    } else {
      setMessage(data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">My Profile</h2>

        {/* Name */}
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full border p-2 rounded"
          required
        />

        {/* Number */}
        <input
          name="number"
          value={form.number}
          onChange={handleChange}
          placeholder="Contact Number"
          className="w-full border p-2 rounded"
          required
        />

        {/* Email (readonly) */}
        <div>
          <input
            value={form.email}
            readOnly
            className="w-full border p-2 rounded bg-gray-100"
          />
          <p className="text-xs text-gray-500 mt-1">
            Email cannot be changed
          </p>
        </div>

        {/* Gender */}
        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        {/* Save */}
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Save Changes
        </button>

        {message && (
          <p className="text-red-600 text-center text-sm">{message}</p>
        )}
      </form>
    </div>
  );
}
