import { useEffect, useState } from "react";
import AdminNavbar from "@/components/AdminNavbar";
import AdminHeader from "@/components/AdminHeader"; 

export default function ManageSubCategory() {
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");

  /* ================= FETCH ================= */
  const fetchData = async () => {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/admin/sub-categories`, {
      credentials: "include",
    });

    const json = await res.json();
    setData(json);
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ================= DELETE ================= */
  const deleteSub = async (id) => {
    if (!window.confirm("Delete this sub-category permanently?")) return;

    await fetch(`${import.meta.env.VITE_BASE_URL}/admin/sub-categories/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    fetchData();
  };

  /* ================= EDIT ================= */
  const startEdit = (item) => {
    setEditingId(item._id);
    setEditName(item.name);
  };

  const saveEdit = async (id) => {
    await fetch(`${import.meta.env.VITE_BASE_URL}/admin/sub-categories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ name: editName }),
    });

    setEditingId(null);
    fetchData();
  };

  /* ================= UI ================= */
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">

      {/* SIDEBAR */}
      <AdminNavbar />

      {/* MAIN */}
      <div className="flex-1 flex flex-col">

        {/* ✅ HEADER WITH DROPDOWN */}
        <div className="p-6 pb-2">
          <AdminHeader title="Manage Sub Categories" />
        </div>

        {/* CONTENT */}
        <div className="px-10 pb-10">

          {/* CARD */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">

            <div className="overflow-x-auto">

              <table className="w-full text-sm border-separate border-spacing-y-2">

                {/* TABLE HEAD */}
                <thead className="sticky top-0 bg-white z-10">
                  <tr className="text-gray-600 text-xs uppercase tracking-wider text-center">
                    <th className="p-3">S.No</th>
                    <th>Category</th>
                    <th>Sub Category</th>
                    <th>Action</th>
                  </tr>
                </thead>

                {/* TABLE BODY */}
                <tbody>
                  {data.length === 0 ? (
                    <tr>
                      <td
                        colSpan="4"
                        className="text-center py-10 text-gray-400"
                      >
                        No sub-categories found
                      </td>
                    </tr>
                  ) : (
                    data.map((item, i) => (
                      <tr
                        key={item._id}
                        className="bg-gray-50 hover:bg-blue-50 transition shadow-sm"
                      >
                        <td className="p-3 text-center font-medium text-gray-700">
                          {i + 1}
                        </td>

                        <td className="text-center capitalize">
                          {item.category?.name || "-"}
                        </td>

                        {/* EDITABLE */}
                        <td className="text-center">
                          {editingId === item._id ? (
                            <input
                              value={editName}
                              onChange={(e) => setEditName(e.target.value)}
                              className="border rounded-lg px-3 py-1 text-center focus:ring-2 focus:ring-blue-400 outline-none"
                            />
                          ) : (
                            <span className="capitalize font-medium text-gray-800">
                              {item.name}
                            </span>
                          )}
                        </td>

                        {/* ACTIONS */}
                        <td className="py-2 text-center space-x-2">

                          {editingId === item._id ? (
                            <>
                              <button
                                onClick={() => saveEdit(item._id)}
                                className="px-3 py-1.5 bg-green-500 text-white rounded-lg text-xs shadow hover:bg-green-600 transition"
                              >
                                Save
                              </button>

                              <button
                                onClick={() => setEditingId(null)}
                                className="px-3 py-1.5 bg-gray-400 text-white rounded-lg text-xs shadow hover:bg-gray-500 transition"
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => startEdit(item)}
                                className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs shadow hover:bg-blue-700 transition"
                              >
                                Edit
                              </button>

                              <button
                                onClick={() => deleteSub(item._id)}
                                className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-xs shadow hover:bg-red-600 transition"
                              >
                                Delete
                              </button>
                            </>
                          )}

                        </td>
                      </tr>
                    ))
                  )}
                </tbody>

              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
