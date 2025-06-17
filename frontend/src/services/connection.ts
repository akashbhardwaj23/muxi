import { db } from './initialize';
import { ref, onValue, set, serverTimestamp, onDisconnect } from 'firebase/database';

export class ConnectionManager {
  static initialize(userId : string) {
    // Monitor connection state
    const connectedRef = ref(db, '.info/connected');
    const userStatusRef = ref(db, `users/${userId}/status`);
    const lastOnlineRef = ref(db, `users/${userId}/lastOnline`);

    onValue(connectedRef, (snapshot) => {
      if (snapshot.val() === true) {
        // When we disconnect, update the last online timestamp
        set(userStatusRef, 'online');
        set(lastOnlineRef, serverTimestamp());

        // When user disconnects, update the last online timestamp
        onDisconnect(userStatusRef).set('offline');
        onDisconnect(lastOnlineRef).set(serverTimestamp());
      } else {
        // We're offline
        set(userStatusRef, 'offline');
        set(lastOnlineRef, serverTimestamp());
      }
    });
  }

  static async handleConnectionError(callback : (val : "disconnected" | "connected") => void) {
    const connectedRef = ref(db, '.info/connected');
    onValue(connectedRef, (snap) => {
      if (snap.val() === false) {
        callback('disconnected');
      } else {
        callback('connected');
      }
    });
  }
}