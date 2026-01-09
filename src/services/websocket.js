class WebSocketService {
  constructor() {
    this.socket = null;
    this.userId = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.onMessageCallbacks = [];
    this.isConnected = false;
  }

  // Connecter au WebSocket
  connect(userId) {
    if (this.socket?.readyState === WebSocket.OPEN || !userId) {
      return;
    }

    this.userId = userId;
    const wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:8000';
    
    this.socket = new WebSocket(`${wsUrl}/ws/${userId}`);

    this.socket.onopen = () => {
      console.log('🔌 WebSocket connecté pour user:', userId);
      this.isConnected = true;
      this.reconnectAttempts = 0;
      
      this.startPing();
    };

    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.handleMessage(data);
      } catch (error) {
        // Message texte simple (pong)
        if (event.data === 'pong') {
          return;
        }
        console.log('Message texte:', event.data);
      }
    };

    this.socket.onclose = (event) => {
      console.log('🔌 WebSocket déconnecté');
      this.isConnected = false;
      
      // Tentative de reconnexion
      if (this.reconnectAttempts < this.maxReconnectAttempts) {
        const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 10000);
        
        setTimeout(() => {
          this.reconnectAttempts++;
          console.log(`🔄 Reconnexion WebSocket (tentative ${this.reconnectAttempts})...`);
          this.connect(userId);
        }, delay);
      }
    };

    this.socket.onerror = (error) => {
      console.error('❌ Erreur WebSocket:', error);
    };
  }

  // Gérer les messages
  handleMessage(data) {
    // Appeler tous les callbacks enregistrés
    this.onMessageCallbacks.forEach(callback => {
      try {
        callback(data);
      } catch (error) {
        console.error('Erreur dans callback:', error);
      }
    });

    // Traitement spécifique pour les notifications
    if (data.type === 'new_notification') {
      console.log('📨 Nouvelle notification reçue:', data.notification);
      
      // Émettre un événement personnalisé pour React
      window.dispatchEvent(new CustomEvent('new-notification', {
        detail: data.notification
      }));
      
      // Notification navigateur
      this.showBrowserNotification(data.notification);
    }
  }

  // Afficher une notification navigateur
  showBrowserNotification(notification) {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/vite.svg'
      });
    }
  }

  // Demander la permission pour les notifications navigateur
  requestNotificationPermission() {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          console.log('✅ Permission notifications accordée');
        }
      });
    }
  }

  // Enregistrer un callback pour les messages
  onMessage(callback) {
    this.onMessageCallbacks.push(callback);
    
    // Retourner une fonction pour se désinscrire
    return () => {
      const index = this.onMessageCallbacks.indexOf(callback);
      if (index > -1) {
        this.onMessageCallbacks.splice(index, 1);
      }
    };
  }

  // Envoyer un message
  send(data) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(data));
    } else {
      console.warn('⚠️ WebSocket non connecté');
    }
  }

  // Ping pour garder la connexion active
  startPing() {
    if (this.pingInterval) clearInterval(this.pingInterval);
    
    this.pingInterval = setInterval(() => {
      if (this.socket?.readyState === WebSocket.OPEN) {
        this.socket.send('ping');
      }
    }, 25000); // Toutes les 25 secondes
  }

  // Déconnexion
  disconnect() {
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }
    
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
    
    this.onMessageCallbacks = [];
    this.isConnected = false;
    console.log('🔌 WebSocket déconnecté manuellement');
  }
}

// Instance unique
export const websocketService = new WebSocketService();