import { useNotifications } from "../context/NotificationContext";

export default function NotificationPanel() {
  const { notifications } = useNotifications();

  if (notifications.length === 0) {
    return (
      <div className="p-4 text-sm text-gray-500">
        Aucune notification
      </div>
    );
  }

  return (
    <div className="p-4 space-y-3 text-sm">
      {notifications.map((n) => (
        <div
          key={n.id}
          className={`p-3 rounded ${
            n.read ? "bg-gray-100" : "bg-emerald-50"
          }`}
        >
          <p>{n.message}</p>
          <span className="text-xs text-gray-400">
            {n.date}
          </span>
        </div>
      ))}
    </div>
  );
}
