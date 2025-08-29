import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import menuData from "../../assets/data/adminMenu.json";
import * as LucideIcons from "lucide-react";

const AdminHeader = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  return (
    <header className="bg-black border-b border-gray-500/[0.5] sticky top-0 z-50">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
            <LucideIcons.TreePalm className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Batik Dashboard</h1>
            <p className="text-sm text-gray-400">Admin Panel</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-4">
          {menuData.map((item) => {
            const Icon = LucideIcons[item.icon];
            return (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors
                   ${
                     isActive
                       ? "bg-white text-black font-semibold"
                       : "text-white hover:bg-gray-800"
                   }`
                }
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white"
        >
          {mobileOpen ? (
            <LucideIcons.X className="w-6 h-6" />
          ) : (
            <LucideIcons.Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobileMenu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-black border-t border-gray-700 px-6 py-4 space-y-3"
          >
            {menuData.map((item) => {
              const Icon = LucideIcons[item.icon];
              const isActive = location.pathname === item.path;

              return (
                <NavLink
                  key={item.id}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors
                     ${
                       isActive
                         ? "bg-white text-black font-semibold"
                         : "text-white hover:bg-gray-800"
                     }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default AdminHeader;
