import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Layers,
  FolderTree,
  ShieldCheck,
  Users,
  UserCheck,
  Ticket,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

function AdminNavbar() {
  const navigate = useNavigate();

  const [openCategory, setOpenCategory] = useState(false);
  const [openSubCategory, setOpenSubCategory] = useState(false);
  const [openPolicy, setOpenPolicy] = useState(false);
  const [openUsers, setOpenUsers] = useState(false);
  const [openPolicyHolders, setOpenPolicyHolders] = useState(false);
  const [openTickets, setOpenTickets] = useState(false);

  /* =========================
     STYLES
  ========================= */
  const baseClass =
    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all";

  const activeClass =
    "bg-blue-600 text-white shadow-md";

  const inactiveClass =
    "text-gray-600 hover:bg-blue-50 hover:text-blue-600";

  const subClass = ({ isActive }) =>
    `block pl-12 pr-4 py-2 text-sm rounded-lg transition ${
      isActive
        ? "bg-blue-100 text-blue-600 font-medium"
        : "text-gray-500 hover:bg-gray-100"
    }`;

  /* =========================
     LOGOUT
  ========================= */
  const handleLogout = async () => {
    await fetch("http://localhost:1122/logout", {
      method: "GET",
      credentials: "include",
    });
    navigate("/admin/login");
  };

  return (
    <aside className="w-64 min-h-screen bg-gradient-to-b from-white to-blue-50 border-r shadow-lg flex flex-col">

      {/* ================= LOGO ================= */}
      <div className="px-6 py-6 border-b">
        <h1 className="text-2xl font-bold text-blue-600 tracking-tight">
          SecureLife
        </h1>
        <p className="text-xs text-gray-500">Admin Panel</p>
      </div>

      {/* ================= NAVIGATION ================= */}
      <nav className="p-4 space-y-2 flex-1 overflow-y-auto">

        {/* Dashboard */}
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `${baseClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        {/* Insurance Category */}
        <MenuButton
          icon={<Layers size={18} />}
          label="Insurance Category"
          open={openCategory}
          setOpen={setOpenCategory}
        />
        {openCategory && (
          <div className="space-y-1 mt-1">
            <NavLink to="/admin/categories" className={subClass}>
              Add Category
            </NavLink>
            <NavLink to="/admin/category/manage" className={subClass}>
              Manage Category
            </NavLink>
          </div>
        )}

        {/* Insurance Sub-Category */}
        <MenuButton
          icon={<FolderTree size={18} />}
          label="Insurance Sub-Category"
          open={openSubCategory}
          setOpen={setOpenSubCategory}
        />
        {openSubCategory && (
          <div className="space-y-1 mt-1">
            <NavLink to="/admin/sub-category/add" className={subClass}>
              Add Sub Category
            </NavLink>
            <NavLink to="/admin/sub-category/manage" className={subClass}>
              Manage Sub Category
            </NavLink>
          </div>
        )}

        {/* Policy */}
        <MenuButton
          icon={<ShieldCheck size={18} />}
          label="Insurance Policy"
          open={openPolicy}
          setOpen={setOpenPolicy}
        />
        {openPolicy && (
          <div className="space-y-1 mt-1">
            <NavLink to="/admin/policy/add" className={subClass}>
              Add Policy
            </NavLink>
            <NavLink to="/admin/policy/manage" className={subClass}>
              Manage Policy
            </NavLink>
          </div>
        )}

        {/* Users */}
        <MenuButton
          icon={<Users size={18} />}
          label="Users"
          open={openUsers}
          setOpen={setOpenUsers}
        />
        {openUsers && (
          <div className="space-y-1 mt-1">
            <NavLink to="/admin/users" className={subClass}>
              All Users
            </NavLink>
          </div>
        )}

        {/* Policy Holders */}
        <MenuButton
          icon={<UserCheck size={18} />}
          label="Policy Holders"
          open={openPolicyHolders}
          setOpen={setOpenPolicyHolders}
        />
        {openPolicyHolders && (
          <div className="space-y-1 mt-1">
            <NavLink to="/admin/policy-holders/pending" className={subClass}>
              Pending Policy
            </NavLink>
            <NavLink to="/admin/policy-holders/approved" className={subClass}>
              Approved Policy
            </NavLink>
            <NavLink to="/admin/policy-holders/disapproved" className={subClass}>
              Disapproved Policy
            </NavLink>
            <NavLink to="/admin/policy-holders/all" className={subClass}>
              All Policy
            </NavLink>
          </div>
        )}

        {/* Tickets */}
        <MenuButton
          icon={<Ticket size={18} />}
          label="Tickets"
          open={openTickets}
          setOpen={setOpenTickets}
        />
        {openTickets && (
          <div className="space-y-1 mt-1">
            <NavLink to="/admin/tickets/unresolved" className={subClass}>
              Unresolved Tickets
            </NavLink>
            <NavLink to="/admin/tickets/resolved" className={subClass}>
              Resolved Tickets
            </NavLink>
          </div>
        )}
      </nav>
    </aside>
  );
}

/* 🔹 Reusable Menu Button */
const MenuButton = ({ icon, label, open, setOpen }) => (
  <button
    onClick={() => setOpen(!open)}
    className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-600 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition"
  >
    <span className="flex items-center gap-3">
      {icon}
      {label}
    </span>

    <ChevronDown
      size={16}
      className={`transition-transform ${open ? "rotate-180" : ""}`}
    />
  </button>
);

export default AdminNavbar;
