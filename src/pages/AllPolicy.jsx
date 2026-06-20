import { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import AdminHeader from "../components/AdminHeader";

export default function AllPolicy() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "http://localhost:1122/admin/policy-holders/all",
      { credentials: "include" }
    )
      .then((r) => r.json())
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch(() => {
        alert("Failed to fetch policies");
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminNavbar />

      <div className="flex-1 p-8 space-y-6">

        {/* ✅ Header with dropdown */}
        <AdminHeader title="All Policy Applications" />

        <div className="bg-white p-8 rounded-2xl shadow-lg overflow-x-auto">

          {loading ? (
            <p className="text-gray-500">Loading policies...</p>
          ) : data.length === 0 ? (
            <p className="text-gray-500">No policy applications found.</p>
          ) : (
            <table className="w-full border rounded-xl text-sm">

              {/* ===== TABLE HEAD ===== */}
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="p-3 text-center">S.No</th>
                  <th className="p-3 text-left">User</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Policy</th>
                  <th className="p-3 text-center">Status</th>
                  <th className="p-3 text-center">Date</th>
                </tr>
              </thead>

              {/* ===== TABLE BODY ===== */}
              <tbody>
                {data.map((item, index) => (
                  <tr
                    key={item._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    {/* S.NO */}
                    <td className="p-3 text-center font-medium">
                      {index + 1}
                    </td>

                    {/* USER */}
                    <td className="p-3">
                      {item.user?.name || "-"}
                    </td>

                    {/* EMAIL */}
                    <td className="p-3 text-gray-500">
                      {item.user?.email || "-"}
                    </td>

                    {/* POLICY */}
                    <td className="p-3">
                      {item.policy?.name || "-"}
                    </td>

                    {/* STATUS BADGE */}
                    <td className="p-3 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
                          item.status === "approved"
                            ? "bg-green-600"
                            : item.status === "disapproved"
                            ? "bg-red-600"
                            : "bg-yellow-500"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    {/* DATE */}
                    <td className="p-3 text-center">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          )}
        </div>
      </div>
    </div>
  );
}
