import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "@/components/AdminNavbar";
import AdminProfileDropdown from "@/components/AdminProfileDropdown";

export default function AddSubCategory() {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [admin, setAdmin] = useState(null);

  const navigate = useNavigate();

  /* ================= FETCH ADMIN ================= */
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/admin/profile`, {
      credentials: "include",
    })
      .then((r) => r.json())
      .then((data) => setAdmin(data.admin));
  }, []);

  /* ================= FETCH CATEGORIES ================= */
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/admin/categories`, {
      credentials: "include",
    })
      .then((r) => r.json())
      .then((data) => setCategories(data || [])); // adjust if backend returns { categories: [] }
  }, []);

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !categoryId) {
      return alert("All fields required");
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/admin/sub-categories`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ name, categoryId }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        return alert(data.message || "Failed to add");
      }

      navigate("/admin/subcategory/manage");
    } catch (err) {
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminNavbar />

      <div className="flex-1 p-10">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-bold text-blue-600">
            Add Sub Category
          </h1>

          <AdminProfileDropdown admin={admin} />
        </div>

        <div className="flex justify-center items-center">
          <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md border">

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Sub Category Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">
                  Sub Category Name
                </label>

                <input
                  type="text"
                  placeholder="Enter sub category name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Category Dropdown */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">
                  Select Category
                </label>

                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="">-- Select Category --</option>

                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="flex-1 border rounded-lg py-2 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 text-white font-bold rounded-lg py-2 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-60 transition-all"
                >
                  {loading ? "Adding..." : "Add Sub Category"}
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}