import React, { useState, useEffect, useRef, useContext } from 'react';
import { Bell, ShoppingBag, Package, AlertCircle, Check, X, MessageSquare, Tag } from 'lucide-react';
import { websocketService } from '../../services/websocket';
import { 
  getUserNotifications, 
  markNotificationAsRead, 
  markAllNotificationsAsRead,
  deleteNotification 
} from '../../services/api';
import { AuthContext } from '../../context/AuthContext';
import './NotificationBell.css';

const NotificationBell = () => {
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);

  // Charger les notifications
  const loadNotifications = async () => {
    if (!user?.id) return;
    
    setLoading(true);
    try {
      const response = await getUserNotifications(user.id);
      if (response.success) {
        const sortedNotifications = response.notifications.sort((a, b) => 
          new Date(b.created_at) - new Date(a.created_at)
        );
        setNotifications(sortedNotifications);
        updateUnreadCount(sortedNotifications);
      }
    } catch (error) {
      console.error('❌ Erreur chargement notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  // Mettre à jour le compteur
  const updateUnreadCount = (notifs) => {
    const unread = notifs.filter(n => !n.read).length;
    setUnreadCount(unread);
    
    // Mettre à jour le title de la page
    if (unread > 0) {
      document.title = `(${unread}) Marketplace Alger`;
    } else {
      document.title = 'Marketplace Alger';
    }
  };

  // Marquer comme lu
  const handleMarkAsRead = async (notificationId, e) => {
    if (e) e.stopPropagation();
    
    try {
      await markNotificationAsRead(notificationId);
      
      setNotifications(prev => 
        prev.map(n => 
          n.id === notificationId ? { ...n, read: true } : n
        )
      );
      
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('❌ Erreur marquer comme lu:', error);
    }
  };

  // Marquer toutes comme lues
  const handleMarkAllAsRead = async () => {
    if (unreadCount === 0 || !user?.id) return;
    
    try {
      await markAllNotificationsAsRead(user.id);
      
      setNotifications(prev => 
        prev.map(n => ({ ...n, read: true }))
      );
      
      setUnreadCount(0);
    } catch (error) {
      console.error('❌ Erreur marquer tout comme lu:', error);
    }
  };

  // Supprimer une notification
  const handleDeleteNotification = async (notificationId, e) => {
    if (e) e.stopPropagation();
    
    try {
      await deleteNotification(notificationId);
      
      const deletedNotif = notifications.find(n => n.id === notificationId);
      setNotifications(prev => 
        prev.filter(n => n.id !== notificationId)
      );
      
      // Mettre à jour le compteur si la notification non lue était supprimée
      if (deletedNotif && !deletedNotif.read) {
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    } catch (error) {
      console.error('❌ Erreur suppression notification:', error);
    }
  };

  // Icônes par type
  const getIcon = (type) => {
    const iconClass = "w-4 h-4";
    
    switch(type) {
      case 'order':
        return <ShoppingBag className={`${iconClass} text-blue-500`} />;
      case 'alert':
        return <AlertCircle className={`${iconClass} text-red-500`} />;
      case 'message':
        return <MessageSquare className={`${iconClass} text-green-500`} />;
      case 'promo':
        return <Tag className={`${iconClass} text-yellow-500`} />;
      default:
        return <Bell className={`${iconClass} text-purple-500`} />;
    }
  };

  // Formatage date
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diff = now - date;
      
      if (diff < 60000) return 'À l\'instant';
      if (diff < 3600000) return `${Math.floor(diff / 60000)} min`;
      if (diff < 86400000) return `${Math.floor(diff / 3600000)} h`;
      
      return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Date inconnue';
    }
  };

  // Tronquer le texte (alternative à line-clamp CSS)
  const truncateText = (text, maxLength = 80) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    
    return text.substring(0, maxLength) + '...';
  };

  // Effets
  useEffect(() => {
    if (!user?.id) return;

    // Charger les notifications initiales
    loadNotifications();

    // Connecter WebSocket
    websocketService.connect(user.id.toString());
    websocketService.requestNotificationPermission();

    // Écouter les nouvelles notifications
    const handleNewNotification = (event) => {
      const newNotification = event.detail;
      
      setNotifications(prev => [newNotification, ...prev]);
      setUnreadCount(prev => prev + 1);
      
      // Son de notification (optionnel)
      if (typeof Audio !== 'undefined') {
        const audio = new Audio('/notification.mp3');
        audio.volume = 0.3;
        audio.play().catch(() => {});
      }
    };

    window.addEventListener('new-notification', handleNewNotification);

    // Fermer dropdown en cliquant à l'extérieur
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    // Nettoyage
    return () => {
      window.removeEventListener('new-notification', handleNewNotification);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [user?.id]);

  // Rendu si pas d'utilisateur
  if (!user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bouton de notification */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) {
            loadNotifications();
          }
        }}
        className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} non lu${unreadCount !== 1 ? 's' : ''})` : ''}`}
      >
        <Bell className="w-6 h-6" />
        
        {unreadCount > 0 && (
          <span className="notification-badge absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
          {/* Header */}
          <div className="p-4 border-b flex justify-between items-center bg-gray-50 rounded-t-lg">
            <div>
              <h3 className="font-semibold text-gray-800">Notifications</h3>
              <p className="text-xs text-gray-500">
                {unreadCount} non lu{unreadCount !== 1 ? 's' : ''}
              </p>
            </div>
            
            <div className="flex gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllAsRead}
                  className="text-sm text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                  title="Tout marquer comme lu"
                  aria-label="Marquer toutes les notifications comme lues"
                >
                  <Check className="w-4 h-4" />
                </button>
              )}
              
              <button
                onClick={loadNotifications}
                disabled={loading}
                className="text-sm text-gray-600 hover:text-gray-800 p-1 rounded hover:bg-gray-100 transition-colors disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
                title="Actualiser"
                aria-label="Actualiser les notifications"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                ) : (
                  <span aria-hidden="true">↻</span>
                )}
              </button>
            </div>
          </div>

          {/* Liste */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Bell className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="font-medium">Aucune notification</p>
                <p className="text-sm mt-1">Les nouvelles notifications apparaîtront ici</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b hover:bg-gray-50 cursor-pointer transition-all duration-200 focus:outline-none focus:bg-gray-100 ${
                    !notification.read ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                  }`}
                  onClick={() => handleMarkAsRead(notification.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleMarkAsRead(notification.id);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`Notification: ${notification.title}. ${notification.message}. ${!notification.read ? 'Non lue.' : 'Lue.'}`}
                >
                  <div className="flex gap-3">
                    <div className="mt-0.5">
                      {getIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h4 className={`font-medium truncate ${!notification.read ? 'text-gray-900 font-semibold' : 'text-gray-700'}`}>
                          {notification.title}
                        </h4>
                        
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-gray-500 whitespace-nowrap">
                            {formatDate(notification.created_at)}
                          </span>
                          
                          <button
                            onClick={(e) => handleDeleteNotification(notification.id, e)}
                            className="text-gray-400 hover:text-red-500 p-1 rounded hover:bg-red-50 ml-1 focus:outline-none focus:ring-2 focus:ring-red-500"
                            title="Supprimer"
                            aria-label={`Supprimer la notification: ${notification.title}`}
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mt-1 truncate-2-lines">
                        {truncateText(notification.message, 100)}
                      </p>
                      
                      {notification.link && (
                        <div className="mt-2">
                          <span className="inline-block text-xs text-blue-600 hover:text-blue-800">
                            Voir les détails →
                          </span>
                        </div>
                      )}
                      
                      <div className="flex items-center mt-2">
                        {!notification.read && (
                          <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2" aria-label="Non lue"></span>
                        )}
                        <span className="text-xs text-gray-500 capitalize">
                          {notification.type}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-3 border-t bg-gray-50 rounded-b-lg">
              <button
                onClick={() => {
                  setIsOpen(false);
                  window.location.href = '/notifications';
                }}
                className="w-full text-sm text-center text-blue-600 hover:text-blue-800 font-medium py-2 hover:bg-blue-50 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Voir toutes les notifications"
              >
                Voir toutes les notifications
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;