import { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import AdminHeader from "../components/AdminHeader";
import { Button } from "@/components/ui/button";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editUser, setEditUser] = useState({});
  const [loading, setLoading] = useState(true);

  /* ================= FETCH USERS ================= */
  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:1122/admin/users", {
        credentials: "include",
      });
      const data = await res.json();
      setUsers(data);
    } catch {
      alert("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  /* ================= UPDATE USER ================= */
  const updateUser = async (id) => {
    try {
      await fetch(`http://localhost:1122/admin/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: editUser.name,
          number: editUser.number,
          role: editUser.role, // only user or blocked
        }),
      });

      setEditingId(null);
      fetchUsers();
    } catch {
      alert("Update failed");
    }
  };

  /* ================= DELETE USER ================= */
  const deleteUser = async (id) => {
    await fetch(`http://localhost:1122/admin/users/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    fetchUsers();
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminNavbar />

      <div className="flex-1 flex flex-col">

        {/* HEADER WITH DROPDOWN */}
        <div className="p-6 pb-2">
          <AdminHeader title="Manage Users" />
        </div>

        {/* CONTENT */}
        <div className="px-8 pb-10">
          <div className="bg-white rounded-2xl shadow-lg p-8 overflow-x-auto">

            {loading ? (
              <p className="text-gray-500">Loading users...</p>
            ) : users.length === 0 ? (
              <p className="text-gray-500">No users found</p>
            ) : (
              <table className="w-full border rounded-xl text-sm">

                {/* TABLE HEAD */}
                <thead className="bg-blue-100 text-gray-700">
                  <tr>
                    <th className="p-3 text-center">S.No</th>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-left">Number</th>
                    <th className="p-3 text-left">Role</th>
                    <th className="p-3 text-center">Action</th>
                  </tr>
                </thead>

                {/* TABLE BODY */}
                <tbody>
                  {users.map((user, index) => (
                    <tr
                      key={user._id}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      {/* S.NO */}
                      <td className="p-3 text-center font-medium">
                        {index + 1}
                      </td>

                      {/* NAME */}
                      <td className="p-3">
                        {editingId === user._id ? (
                          <input
                            value={editUser.name}
                            onChange={(e) =>
                              setEditUser({
                                ...editUser,
                                name: e.target.value,
                              })
                            }
                            className="border rounded px-2 py-1 w-full"
                          />
                        ) : (
                          user.name
                        )}
                      </td>

                      {/* EMAIL */}
                      <td className="p-3 text-gray-500">
                        {user.email}
                      </td>

                      {/* NUMBER */}
                      <td className="p-3">
                        {editingId === user._id ? (
                          <input
                            value={editUser.number || ""}
                            onChange={(e) =>
                              setEditUser({
                                ...editUser,
                                number: e.target.value,
                              })
                            }
                            className="border rounded px-2 py-1 w-full"
                          />
                        ) : (
                          user.number || "-"
                        )}
                      </td>

                      {/* ROLE */}
                      <td className="p-3 capitalize">
                        {editingId === user._id ? (
                          <select
                            value={editUser.role}
                            onChange={(e) =>
                              setEditUser({
                                ...editUser,
                                role: e.target.value,
                              })
                            }
                            className="border rounded px-2 py-1 w-full"
                          >
                            <option value="user">User</option>
                            <option value="blocked">Blocked</option>
                          </select>
                        ) : (
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              user.role === "blocked"
                                ? "bg-gray-200 text-gray-600"
                                : "bg-green-100 text-green-600"
                            }`}
                          >
                            {user.role}
                          </span>
                        )}
                      </td>

                      {/* ACTIONS */}
                      <td className="p-3 flex gap-2 justify-center">
                        {editingId === user._id ? (
                          <>
                            <Button onClick={() => updateUser(user._id)}>
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
                            <Button
                              variant="secondary"
                              onClick={() => {
                                setEditingId(user._id);
                                setEditUser(user);
                              }}
                            >
                              Edit
                            </Button>

                            <Button
                              variant="destructive"
                              onClick={() => deleteUser(user._id)}
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
            )}
          </div>
        </div>

      </div>
    </div>
  );
}