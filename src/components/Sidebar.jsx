import {
  LayoutDashboard,
  Building2,
  Users,
  Package,
  IndianRupee,
} from "lucide-react";

import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 h-screen bg-slate-900 text-white fixed left-0 top-0">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold text-cyan-400">
          IronForm ERP
        </h1>
      </div>

      <nav className="flex flex-col p-4 gap-2">

        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition ${
              isActive
                ? "bg-cyan-500 text-white"
                : "hover:bg-slate-800"
            }`
          }
        >
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        <NavLink
          to="/sites"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition"
        >
          <Building2 size={20} />
          Sites
        </NavLink>

        <NavLink
          to="/labour"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition"
        >
          <Users size={20} />
          Labour
        </NavLink>

        <NavLink
          to="/materials"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition"
        >
          <Package size={20} />
          Materials
        </NavLink>

        <NavLink
          to="/finance"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition"
        >
          <IndianRupee size={20} />
          Finance
        </NavLink>

      </nav>
    </div>
  );
}

export default Sidebar;