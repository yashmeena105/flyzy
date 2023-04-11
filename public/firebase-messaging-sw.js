// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyANfwdWKYwSTf63baW5i4rNCfWPaAgeZag",
  authDomain: "bookhere-denv.firebaseapp.com",
  projectId: "bookhere-denv",
  storageBucket: "bookhere-denv.appspot.com",
  messagingSenderId: "520515165513",
  appId: "1:520515165513:web:6bbe85d13c79f0af420e98",
  measurementId: "G-Y978GRWY06"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});