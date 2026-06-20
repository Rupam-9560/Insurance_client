import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminNavbar from "@/components/AdminNavbar";

export default function EditPolicy() {
  const { id } = useParams();
  const navigate = useNavigate();

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

    fetch(`${import.meta.env.VITE_BASE_URL}/admin/policies/${id}`, {
      credentials: "include",
    })
      .then((r) => r.json())
      .then((data) => {
        setForm(data);
        setSubCategories(
          allSubs.filter((s) => s.category?._id === data.category)
        );
      });
  }, [id]);

  /* ================= CHANGE ================= */
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

  /* ================= UPDATE ================= */
  const handleUpdate = async (e) => {
    e.preventDefault();

    await fetch(`${import.meta.env.VITE_BASE_URL}/admin/policies/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(form),
    });

    navigate("/admin/policy/manage");
  };

  return (
    <div className="flex min-h-screen bg-blue-50">
      <AdminNavbar />

      <div className="flex-1 flex justify-center items-center p-10">

        <form
          onSubmit={handleUpdate}
          className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-8 space-y-6"
        >
          <h2 className="text-2xl font-bold text-blue-600 text-center">
            Edit Insurance Policy
          </h2>

          {/* Category */}
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Sub Category */}
          <select
            name="subCategory"
            value={form.subCategory}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">Select Sub Category</option>
            {subCategories.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name}
              </option>
            ))}
          </select>

          {/* Name */}
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Policy Name"
            className="w-full border rounded-lg px-3 py-2"
          />

          {/* Row */}
          <div className="grid grid-cols-3 gap-3">
            <input
              type="number"
              name="sumAssured"
              value={form.sumAssured}
              onChange={handleChange}
              placeholder="Sum Assured"
              className="border rounded-lg px-3 py-2"
            />

            <input
              type="number"
              name="premium"
              value={form.premium}
              onChange={handleChange}
              placeholder="Premium"
              className="border rounded-lg px-3 py-2"
            />

            <input
              type="number"
              name="tenure"
              value={form.tenure}
              onChange={handleChange}
              placeholder="Tenure (Years)"
              className="border rounded-lg px-3 py-2"
            />
          </div>

          {/* Details */}
          <textarea
            name="details"
            value={form.details}
            onChange={handleChange}
            rows="4"
            placeholder="Policy Details"
            className="w-full border rounded-lg px-3 py-2"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Update Policy
          </button>
        </form>
      </div>
    </div>
  );
}
