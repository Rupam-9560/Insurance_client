import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "@/components/Adminnavbar";
import AdminProfileDropdown from "@/components/AdminProfileDropdown";

export default function AddPolicy() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);

  const [categories, setCategories] = useState([]);
  const [allSubs, setAllSubs] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [form, setForm] = useState({
    category: "",
    subCategory: "",
    name: "",
    sumAssured: "",
    premium: "",
    tenure: "",
    details: "",
  });

  /* ================= FETCH ADMIN (FIXED) ================= */
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/admin/profile`, {
          credentials: "include",
        });

        const data = await res.json();

        if (res.ok) {
          setAdmin(data.admin);
        }
      } catch (err) {
        console.log("Admin fetch failed", err);
      }
    };

    fetchAdmin();
  }, []);

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/admin/categories`, {
      credentials: "include",
    })
      .then((r) => r.json())
      .then(setCategories);

    fetch(`${import.meta.env.VITE_BASE_URL}/admin/sub-categories`, {
      credentials: "include",
    })
      .then((r) => r.json())
      .then(setAllSubs);
  }, []);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });

    if (name === "category") {
      const filtered = allSubs.filter(
        (s) => s.category?._id === value
      );
      setSubCategories(filtered);
    }
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`${import.meta.env.VITE_BASE_URL}/admin/policies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(form),
    });

    navigate("/admin/policy/manage");
  };

  return (
    <div className="flex min-h-screen bg-blue-50">
      <AdminNavbar />

      {/* RIGHT SIDE */}
      <div className="flex-1 p-8 space-y-8">

        {/* HEADER WITH DROPDOWN */}
        <div className="flex items-center justify-between bg-white px-6 py-4 rounded-2xl shadow-md border">
          <h1 className="text-2xl font-bold text-blue-700">
            Add Policy
          </h1>

          {admin && <AdminProfileDropdown admin={admin} />}
        </div>

        {/* CENTER FORM */}
        <div className="flex justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className="bg-white w-full max-w-2xl rounded-2xl shadow-lg border p-8 space-y-6"
          >
            <h2 className="text-2xl font-bold text-blue-600 text-center">
              Add Insurance Policy
            </h2>

            {/* Category */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Category
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 mt-1"
                required
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sub Category */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Sub Category
              </label>
              <select
                name="subCategory"
                value={form.subCategory}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 mt-1"
                required
              >
                <option value="">Select Sub Category</option>

                {subCategories.length === 0 ? (
                  <option disabled>No sub categories</option>
                ) : (
                  subCategories.map((s) => (
                    <option key={s._id} value={s._id}>
                      {s.name}
                    </option>
                  ))
                )}
              </select>
            </div>

            {/* Policy Name */}
            <input
              name="name"
              placeholder="Policy Name"
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              required
            />

            {/* Row */}
            <div className="grid grid-cols-3 gap-3">
              <input
                type="number"
                name="sumAssured"
                placeholder="Sum Assured"
                onChange={handleChange}
                className="border rounded-lg px-3 py-2"
              />

              <input
                type="number"
                name="premium"
                placeholder="Premium"
                onChange={handleChange}
                className="border rounded-lg px-3 py-2"
              />

              <input
                type="number"
                name="tenure"
                placeholder="Tenure (Years)"
                onChange={handleChange}
                className="border rounded-lg px-3 py-2"
              />
            </div>

            {/* Details */}
            <textarea
              name="details"
              placeholder="Policy Details"
              onChange={handleChange}
              rows="4"
              className="w-full border rounded-lg px-3 py-2"
            />

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Add Policy
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}