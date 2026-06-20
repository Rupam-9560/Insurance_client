import { useEffect, useState } from "react";
import AdminProfileDropdown from "./AdminProfileDropdown";

export default function AdminHeader({ title }) {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/admin/profile`, {
          credentials: "include",
        });

        const data = await res.json();

        if (res.ok) setAdmin(data.admin);
      } catch {
        console.log("Admin fetch failed");
      }
    };

    fetchAdmin();
  }, []);

  return (
    <div className="flex items-center justify-between bg-white px-6 py-4 rounded-2xl shadow-md border">
      <h1 className="text-2xl font-bold text-blue-700">{title}</h1>
      {admin && <AdminProfileDropdown admin={admin} />}
    </div>
  );
}