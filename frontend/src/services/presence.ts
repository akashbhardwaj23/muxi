import { db } from './initialize';
import { ref, onValue, set, onDisconnect } from 'firebase/database';

export class PresenceService {
  static initialize(userId : string) {
    const connectedRef = ref(db, '.info/connected');
    const userStatusRef = ref(db, `users/${userId}/status`);
    onValue(connectedRef, (snapshot) => {
      if (snapshot.val() === true) {
        set(userStatusRef, 'online');
        onDisconnect(userStatusRef).set('offline');
      }
    });
  }

  static subscribeToUserStatus(userId : string, callback : (val : "offline" | "online") => void) {
    const statusRef = ref(db, `users/${userId}/status`);
    return onValue(statusRef, (snapshot) => callback(snapshot.val()));
  }
}