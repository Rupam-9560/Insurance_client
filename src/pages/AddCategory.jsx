import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import AdminHeader from "../components/AdminHeader";
import AdminProfileDropdown from "../components/AdminProfileDropdown";


export default function AddCategory() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [admin, setAdmin] = useState(null);

  const navigate = useNavigate();

  /* ================= FETCH ADMIN ================= */
  useEffect(() => {
    fetch("http://localhost:1122/admin/profile", {
      credentials: "include",
    })
      .then((r) => r.json())
      .then((data) => setAdmin(data.admin));
  }, []);

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) return alert("Category name required");

    try {
      setLoading(true);

      await fetch("http://localhost:1122/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name }),
      });

      navigate("/admin/category/manage");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminNavbar />

      {/* Main Content */}
      <div className="flex-1 p-10">

        {/* ===== Header ===== */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-bold text-blue-600">
            Add Category
          </h1>

          <AdminProfileDropdown admin={admin} />
        </div>

        {/* ===== Centered Card ===== */}
        <div className="flex justify-center">
          <div className="w-full max-w-md bg-white p-7 rounded-xl shadow-md border">

            <form onSubmit={handleSubmit} className="space-y-4">

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Category Name
                </label>

                <input
                  type="text"
                  placeholder="Enter category name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
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
                  disabled={loading}
                  className="flex-1 bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 disabled:opacity-60 transition"
                >
                  {loading ? "Adding..." : "Add Category"}
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
