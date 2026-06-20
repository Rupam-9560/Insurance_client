import { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import AdminProfileDropdown from "../components/AdminProfileDropdown";
import { Button } from "@/components/ui/button";


export default function ManageCategory() {
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [admin, setAdmin] = useState(null);

  /* ================= FETCH ADMIN ================= */
  useEffect(() => {
    fetch("http://localhost:1122/admin/profile", {
      credentials: "include",
    })
      .then((r) => r.json())
      .then((data) => setAdmin(data.admin));
  }, []);

  /* ================= FETCH CATEGORIES ================= */
  const fetchCategories = async () => {
    const res = await fetch("http://localhost:1122/admin/categories", {
      credentials: "include",
    });
    const data = await res.json();
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  /* ================= DELETE ================= */
  const deleteCategory = async (id) => {
    await fetch(`http://localhost:1122/admin/categories/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    fetchCategories();
  };

  /* ================= UPDATE ================= */
  const updateCategory = async (id) => {
    await fetch(`http://localhost:1122/admin/categories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ name: editName }),
    });

    setEditingId(null);
    fetchCategories();
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminNavbar />

      {/* Main */}
      <div className="flex-1 p-10">

        {/* ===== Header (same style) ===== */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-bold text-blue-600">
            Manage Insurance Categories
          </h1>

          <AdminProfileDropdown admin={admin} />
        </div>

        {/* ===== Card ===== */}
        <div className="bg-white shadow-md rounded-xl p-6 border">

          <table className="w-full border rounded-lg overflow-hidden text-sm">

            {/* Header */}
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 text-center">S.No</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-center">Created</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {categories.map((cat, index) => (
                <tr
                  key={cat._id}
                  className="border-t hover:bg-gray-50 transition text-gray-700 align-middle"
                >
                  {/* S.No centered */}
                  <td className="p-3 text-center font-medium">
                    {index + 1}
                  </td>

                  {/* Name */}
                  <td className="p-3 capitalize">
                    {editingId === cat._id ? (
                      <input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="border rounded px-3 py-1 w-full"
                      />
                    ) : (
                      cat.name
                    )}
                  </td>

                  {/* Date centered */}
                  <td className="p-3 text-center">
                    {new Date(cat.createdAt).toLocaleDateString()}
                  </td>

                  {/* Actions centered */}
                  <td className="p-3 flex justify-center gap-2">

                    {editingId === cat._id ? (
                      <>
                        <Button onClick={() => updateCategory(cat._id)}>
                          Save
                        </Button>

                        <Button
                          variant="outline"
                          onClick={() => setEditingId(null)}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        {/* ⭐ Blue Edit */}
                        <button
                          onClick={() => {
                            setEditingId(cat._id);
                            setEditName(cat.name);
                          }}
                          className="px-3 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                        >
                          Edit
                        </button>

                        <Button
                          variant="destructive"
                          onClick={() => deleteCategory(cat._id)}
                        >
                          Delete
                        </Button>
                      </>
                    )}

                  </td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>
      </div>
    </div>
  );
}
