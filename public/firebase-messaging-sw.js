importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-messaging-compat.js');

const firebaseConfig = {
 apiKey: "AIzaSyAPtftCfGOJfkIlRcoQ4QoJTwP1xXuBlm8",
  authDomain: "empirefirebase.firebaseapp.com",
  databaseURL:
    "https://empirefirebase-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "empirefirebase",
  storageBucket: "empirefirebase.appspot.com",
  messagingSenderId: "120247352484",
  appId: "1:120247352484:web:e267ed43c28f5ca580fa31",
  measurementId: "G-XBJLT0HTXL",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  // console.log('Received background message: ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = { body: payload.notification.body };

  self.registration.showNotification(notificationTitle, notificationOptions);
});