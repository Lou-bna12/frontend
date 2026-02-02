import { Menu, Search, Bell, User } from "lucide-react";
import { useNotifications } from "../context/NotificationContext";

export default function VendorHeader({ onMenu }) {
  const { unreadCount, markAllAsRead } = useNotifications();

  return (
    <header className="bg-white shadow-sm px-4 py-3 flex items-center justify-between">
      
      {/* GAUCHE */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenu}
          className="md:hidden p-2 rounded hover:bg-gray-100"
        >
          <Menu className="w-5 h-5" />
        </button>

        <h1 className="text-lg font-semibold">
          Dashboard fournisseur
        </h1>
      </div>

      {/* DROITE */}
      <div className="flex items-center gap-4">
        
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Rechercher..."
            className="pl-9 pr-3 py-2 border rounded-lg text-sm"
          />
        </div>

        {/* 🔔 NOTIFICATIONS */}
        <div className="relative">
          <button
            onClick={markAllAsRead}
            className="p-2 rounded hover:bg-gray-100"
          >
            <Bell className="w-5 h-5 text-gray-500" />
          </button>

          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>

        <User className="w-5 h-5 text-gray-500" />
      </div>
    </header>
  );
}
