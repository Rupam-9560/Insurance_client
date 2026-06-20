import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function UserProfileDropdown({ user }) {
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
    try {
      await fetch(`${import.meta.env.VITE_BASE_URL}/user/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.log("Logout failed");
    }

    navigate("/login", { replace: true });
  };

  const firstLetter = user?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="relative" ref={menuRef}>
      {/* Avatar */}
      <div
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-full bg-gray-700 text-white flex items-center justify-center cursor-pointer font-semibold shadow-md hover:scale-105 transition duration-200"
      >
        {firstLetter}
      </div>

      {open && (
        <div className="absolute right-0 mt-3 w-60 bg-white rounded-2xl shadow-xl border z-50">
          {/* User Info */}
          <div className="p-4 border-b">
            <p className="font-semibold text-gray-800">
              {user?.name || "User"}
            </p>
            <p className="text-sm text-gray-500">User</p>
          </div>

          <button
            onClick={() => navigate("/profile")}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
          >
            My Profile
          </button>

          <button
            onClick={() => navigate("/change-password")}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
          >
            Change Password
          </button>

          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600 transition"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}