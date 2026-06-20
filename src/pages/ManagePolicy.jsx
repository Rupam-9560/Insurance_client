import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "@/components/AdminNavbar";
import AdminHeader from "@/components/AdminHeader";

export default function ManagePolicy() {
  const navigate = useNavigate();

  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  /* ================= FETCH POLICIES ================= */
  const fetchPolicies = async () => {
    setLoading(true);

    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/admin/policies`, {
      credentials: "include",
    });

    const data = await res.json();
    setPolicies(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPolicies();
  }, []);

  /* ================= DELETE ================= */
  const deletePolicy = async (id) => {
    if (!window.confirm("Delete this policy permanently?")) return;

    await fetch(`${import.meta.env.VITE_BASE_URL}/admin/policies/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    fetchPolicies();
  };

  /* ================= FILTER ================= */
  const filteredPolicies = policies.filter((p) =>
    p.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">

      {/* ================= SIDEBAR ================= */}
      <AdminNavbar />

      {/* ================= MAIN ================= */}
      <div className="flex-1 flex flex-col">

        {/* HEADER WITH DROPDOWN */}
        <div className="p-6 pb-2">
          <AdminHeader title="Manage Policies" />
        </div>

        {/* CONTENT */}
        <div className="px-10 pb-10 space-y-6">

          <div className="flex flex-wrap gap-4 justify-between items-center">
            <p className="text-gray-500 text-sm">
              View, edit and manage all insurance policies
            </p>

            <button
              onClick={() => navigate("/admin/policy/add")}
              className="bg-blue-600 text-white px-6 py-2 rounded-xl shadow-md hover:bg-blue-700 hover:shadow-lg transition"
            >
              + Add Policy
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">

            <div className="mb-6">
              <input
                placeholder="🔍 Search policy name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border px-4 py-2 rounded-lg w-full max-w-sm focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            {loading ? (
              <div className="py-12 text-center text-gray-500 animate-pulse">
                Loading policies...
              </div>
            ) : filteredPolicies.length === 0 ? (
              <div className="py-12 text-center text-gray-400">
                No policies found
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-separate border-spacing-y-2">
                  <thead className="sticky top-0 bg-white z-10">
                    <tr className="text-gray-600 text-left text-xs uppercase tracking-wider">
                      <th className="p-3">#</th>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Sub</th>
                      <th>Sum Assured</th>
                      <th>Premium</th>
                      <th>Tenure</th>
                      <th>Date</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredPolicies.map((p, i) => {
                      const sumAssured = Number(p.sumAssured || 0);
                      const premium = Number(p.premium || 0);
                      const tenure = Number(p.tenure || 0);

                      return (
                        <tr
                          key={p._id}
                          className="bg-gray-50 hover:bg-blue-50 transition shadow-sm"
                        >
                          <td className="p-3 font-medium text-gray-700">
                            {i + 1}
                          </td>

                          <td className="font-semibold text-gray-800">
                            {p.name}
                          </td>

                          <td>{p.category?.name || "-"}</td>
                          <td>{p.subCategory?.name || "-"}</td>

                          <td className="text-green-600 font-semibold">
                            ₹ {sumAssured.toLocaleString()}
                          </td>

                          <td>₹ {premium.toLocaleString()}</td>

                          <td>{tenure} yrs</td>

                          <td>
                            {p.createdAt
                              ? new Date(p.createdAt).toLocaleDateString()
                              : "-"}
                          </td>

                          <td className="flex gap-2 justify-center py-2">
                            <button
                              onClick={() =>
                                navigate(`/admin/policy/edit/${p._id}`)
                              }
                              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-xs shadow-sm transition"
                            >
                              Edit
                            </button>

                            <button
                              onClick={() => deletePolicy(p._id)}
                              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg text-xs shadow-sm transition"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>

                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}