import { useEffect, useState } from "react";
import AdminNavbar from "@/components/AdminNavbar";
import AdminHeader from "@/components/AdminHeader";

export default function PendingPolicy() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/admin/policy-holders/pending`,
        { credentials: "include" }
      );
      const result = await res.json();
      setData(result);
    } catch {
      alert("Failed to fetch pending policies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const approve = async (id) => {
    await fetch(
      `${import.meta.env.VITE_BASE_URL}/admin/policy-holders/approve/${id}`,
      { method: "PUT", credentials: "include" }
    );
    fetchData();
  };

  const disapprove = async (id) => {
    await fetch(
      `${import.meta.env.VITE_BASE_URL}/admin/policy-holders/disapprove/${id}`,
      { method: "PUT", credentials: "include" }
    );
    fetchData();
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminNavbar />

      <div className="flex-1 p-8 space-y-6">
        <AdminHeader title="Pending Policy Applications" />

        <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
          
          {/* Top Bar */}
          <div className="px-6 py-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">
              Applications
            </h2>
            <span className="text-sm text-gray-500">
              Total: {data.length}
            </span>
          </div>

          {loading ? (
            <div className="py-16 text-center text-gray-500">
              Loading...
            </div>
          ) : data.length === 0 ? (
            <div className="py-16 text-center text-gray-500">
              No pending applications found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                
                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <th className="px-6 py-3 text-left">S.No</th>
                    <th className="px-6 py-3 text-left">User</th>
                    <th className="px-6 py-3 text-left">Policy</th>
                    <th className="px-6 py-3 text-right">Sum Assured</th>
                    <th className="px-6 py-3 text-right">Premium</th>
                    <th className="px-6 py-3 text-center">Tenure</th>
                    <th className="px-6 py-3 text-center">Date</th>
                    <th className="px-6 py-3 text-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {data.map((item, index) => (
                    <tr
                      key={item._id}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4">
                        {index + 1}
                      </td>

                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-800">
                          {item.user?.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {item.user?.email}
                        </p>
                      </td>

                      <td className="px-6 py-4 text-gray-700">
                        {item.policy?.name}
                      </td>

                      <td className="px-6 py-4 text-right">
                        ₹ {item.policy?.sumAssured}
                      </td>

                      <td className="px-6 py-4 text-right">
                        ₹ {item.policy?.premium}
                      </td>

                      <td className="px-6 py-4 text-center">
                        {item.policy?.tenure} yrs
                      </td>

                      <td className="px-6 py-4 text-center text-gray-500">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>

                      {/* Improved Action Buttons */}
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center gap-2">
                          
                          <button
                            onClick={() => approve(item._id)}
                            className="px-3 py-1.5 text-xs font-medium rounded-md 
                                       border border-green-500 text-green-600 
                                       hover:bg-green-50 transition"
                          >
                            Approve
                          </button>

                          <button
                            onClick={() => disapprove(item._id)}
                            className="px-3 py-1.5 text-xs font-medium rounded-md 
                                       border border-red-500 text-red-600 
                                       hover:bg-red-50 transition"
                          >
                            Reject
                          </button>

                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}