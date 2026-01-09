import React, { useState, useEffect } from 'react';
import { Bell, ShoppingBag, Package, AlertCircle, MessageSquare, Tag, Check, Trash2 } from 'lucide-react';
import { 
  getUserNotifications, 
  markNotificationAsRead, 
  markAllNotificationsAsRead,
  deleteNotification 
} from '../services/api'; // Import direct des fonctions
import { websocketService } from '../services/websocket';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  // Récupérer l'ID utilisateur
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.id) {
      setUserId(user.id);
    }
  }, []);

  // Charger les notifications
  const loadNotifications = async () => {
    if (!userId) return;
    
    setLoading(true);
    try {
      const response = await getUserNotifications(userId);
      if (response.success) {
        setNotifications(response.notifications || []);
      }
    } catch (error) {
      console.error('Erreur chargement notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  // Marquer comme lu
  const handleMarkAsRead = async (notificationId) => {
    try {
      await markNotificationAsRead(notificationId);
      setNotifications(prev =>
        prev.map(n =>
          n.id === notificationId ? { ...n, read: true } : n
        )
      );
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  // Marquer toutes comme lues
  const handleMarkAllAsRead = async () => {
    if (!userId) return;
    
    try {
      await markAllNotificationsAsRead(userId);
      setNotifications(prev =>
        prev.map(n => ({ ...n, read: true }))
      );
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  // Supprimer une notification
  const handleDeleteNotification = async (notificationId) => {
    try {
      await deleteNotification(notificationId);
      setNotifications(prev =>
        prev.filter(n => n.id !== notificationId)
      );
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  // Supprimer toutes les notifications
  const handleDeleteAllNotifications = async () => {
    if (!window.confirm('Supprimer toutes les notifications ?')) return;
    
    for (const notif of notifications) {
      await handleDeleteNotification(notif.id);
    }
  };

  // Icône par type
  const getIcon = (type) => {
    const iconClass = "w-5 h-5";
    
    switch(type) {
      case 'order': return <ShoppingBag className={`${iconClass} text-blue-500`} />;
      case 'alert': return <AlertCircle className={`${iconClass} text-red-500`} />;
      case 'message': return <MessageSquare className={`${iconClass} text-green-500`} />;
      case 'promo': return <Tag className={`${iconClass} text-yellow-500`} />;
      default: return <Bell className={`${iconClass} text-purple-500`} />;
    }
  };

  // Format date
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Date inconnue';
    }
  };

  // Filtrer les notifications
  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'unread') return !notif.read;
    if (filter === 'read') return notif.read;
    return true;
  });

  // Effets
  useEffect(() => {
    if (userId) {
      loadNotifications();
      websocketService.connect(userId.toString());
    }

    return () => {
      websocketService.disconnect();
    };
  }, [userId]);

  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Bell className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-700">Connectez-vous pour voir vos notifications</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
              <p className="text-gray-600 mt-1">
                Restez informé de toutes vos activités
              </p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={handleMarkAllAsRead}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                Tout marquer comme lu
              </button>
              
              <button
                onClick={handleDeleteAllNotifications}
                className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Tout supprimer
              </button>
            </div>
          </div>
          
          {/* Filtres */}
          <div className="flex gap-2 mt-6">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${filter === 'all' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              Toutes
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-2 rounded-lg transition-colors ${filter === 'unread' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              Non lues
            </button>
            <button
              onClick={() => setFilter('read')}
              className={`px-4 py-2 rounded-lg transition-colors ${filter === 'read' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              Lues
            </button>
          </div>
        </div>

        {/* Liste des notifications */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">Chargement des notifications...</p>
            </div>
          ) : filteredNotifications.length === 0 ? (
            <div className="bg-white rounded-xl shadow p-12 text-center">
              <Bell className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700">Aucune notification</h3>
              <p className="text-gray-500 mt-2">
                {filter === 'all' 
                  ? "Vous n'avez pas encore de notifications" 
                  : `Aucune notification ${filter === 'unread' ? 'non lue' : 'lue'}`}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-xl shadow p-6 transition-all hover:shadow-md ${
                  !notification.read ? 'border-l-4 border-l-blue-500' : ''
                }`}
              >
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    {getIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className={`font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                          {notification.title}
                        </h3>
                        <p className="text-gray-600 mt-1">{notification.message}</p>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500 whitespace-nowrap">
                          {formatDate(notification.created_at)}
                        </span>
                        
                        <div className="flex gap-2">
                          {!notification.read && (
                            <button
                              onClick={() => handleMarkAsRead(notification.id)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Marquer comme lu"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                          )}
                          
                          <button
                            onClick={() => handleDeleteNotification(notification.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          notification.type === 'order' ? 'bg-blue-100 text-blue-600' :
                          notification.type === 'alert' ? 'bg-red-100 text-red-600' :
                          notification.type === 'message' ? 'bg-green-100 text-green-600' :
                          'bg-purple-100 text-purple-600'
                        }`}>
                          {notification.type}
                        </span>
                        
                        {!notification.read && (
                          <span className="text-xs font-medium text-blue-600">
                            ● Non lue
                          </span>
                        )}
                      </div>
                      
                      {notification.link && (
                        <a
                          href={notification.link}
                          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Voir les détails →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;