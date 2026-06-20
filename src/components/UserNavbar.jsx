import { NavLink } from "react-router-dom";
import { LayoutDashboard, Shield, Ticket, ChevronDown } from "lucide-react";
import { useState } from "react";

function UserNavbar({ user }) {
  const [openInsurance, setOpenInsurance] = useState(false);
  const [openTicket, setOpenTicket] = useState(false);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 p-3 rounded-lg transition ${
      isActive
        ? "bg-blue-100 text-blue-600"
        : "text-gray-600 hover:bg-gray-100"
    }`;

  const subLinkClass = ({ isActive }) =>
    `block pl-12 pr-3 py-2 text-sm rounded-md transition ${
      isActive
        ? "text-blue-600 bg-blue-50"
        : "text-gray-500 hover:bg-gray-100"
    }`;

  return (
    <aside className="w-64 bg-white shadow-md min-h-screen flex flex-col">

      {/* LOGO */}
      <div className="p-6 border-b">
        <h1 className="text-xl font-bold text-blue-600">SecureLife</h1>
        <p className="text-xs text-gray-500">Insurance Management System</p>
      </div>

      {/* USER INFO */}
      <div className="p-6 flex items-center gap-3 border-b">
        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold uppercase">
          {user?.name ? user.name.charAt(0) : "U"}
        </div>

        <div>
          <p className="font-semibold text-gray-800">
            {user?.name || "User"}
          </p>
          <p className="text-sm text-gray-500">
            {user?.email || "Customer"}
          </p>
        </div>
      </div>

      {/* MENU */}
      <nav className="p-4 space-y-2 flex-1">

        <NavLink to="/dashboard" className={linkClass}>
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        {/* Insurance */}
        <button
          onClick={() => setOpenInsurance(!openInsurance)}
          className="w-full flex items-center justify-between p-3 rounded-lg text-gray-600 hover:bg-gray-100"
        >
          <span className="flex items-center gap-3">
            <Shield size={18} />
            Insurance
          </span>
          <ChevronDown
            size={16}
            className={`transition ${openInsurance ? "rotate-180" : ""}`}
          />
        </button>

        {openInsurance && (
          <div className="space-y-1">
            <NavLink to="/user/insurance/apply" className={subLinkClass}>
              Apply
            </NavLink>
            <NavLink to="/user/history" className={subLinkClass}>
              History
            </NavLink>
          </div>
        )}

        {/* Ticket */}
        <button
          onClick={() => setOpenTicket(!openTicket)}
          className="w-full flex items-center justify-between p-3 rounded-lg text-gray-600 hover:bg-gray-100"
        >
          <span className="flex items-center gap-3">
            <Ticket size={18} />
            Ticket
          </span>
          <ChevronDown
            size={16}
            className={`transition ${openTicket ? "rotate-180" : ""}`}
          />
        </button>

        {openTicket && (
          <div className="space-y-1">
            <NavLink to="/user/ticket/generate" className={subLinkClass}>
              Generate
            </NavLink>
            <NavLink to="/user/ticket/history" className={subLinkClass}>
              History
            </NavLink>
          </div>
        )}
      </nav>
    </aside>
  );
}

export default UserNavbar;
