import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminProfileDropdown({ admin }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const handleLogout = async () => {
    await fetch(`${import.meta.env.VITE_BASE_URL}/admin/logout`, {
      credentials: "include",
    });

    navigate("/admin/login", { replace: true });
  };

  const firstLetter = admin?.name?.charAt(0)?.toUpperCase();

  return (
    <div className="relative" ref={menuRef}>
      <div
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center cursor-pointer font-semibold shadow hover:scale-105 transition"
      >
        {firstLetter}
      </div>

      {open && (
        <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-lg border z-50">
          <div className="p-4 border-b">
            <p className="font-semibold">{admin?.name}</p>
            <p className="text-sm text-gray-500">Administrator</p>
          </div>

          <button
            onClick={() => navigate("/admin/dashboard")}
            className="w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            My Profile
          </button>

          <button
            onClick={() => navigate("/admin/change-password")}
            className="w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Change Password
          </button>

          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
