import { db } from 'Config/firebase';
import Helpers from '../Config/helpers';
import paths from './apiConstants'

import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';

async function sendMessage(roomId, uid, name, text) {
  try {
    await addDoc(collection(db, 'chat-rooms', roomId, 'messages'), {
      uid,
      displayName: name,
      text: text.trim(),
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error(error);
  }
}

function getMessages(roomId, callback) {
  return onSnapshot(
    query(
      collection(db, 'chat-rooms', roomId, 'messages'),
      orderBy('timestamp', 'asc')
    ),
    (querySnapshot) => {
      const messages = querySnapshot.docs.map((x) => ({
        id: x.id,
        ...x.data(),
      }));
      callback(messages);
    }
  );
}

async function markRoomAsRead(roomId, timestamp) {
  let response = await Helpers.post({ url: `${paths.chatrooms}/read/${roomId}`, data: { timestamp } })
  return response
}

export { sendMessage, getMessages, markRoomAsRead };