#  Subscription Tracker

A responsive and user-friendly **Subscription Tracker App** built with React and Firebase that helps users manage their recurring expenses and subscriptions efficiently.

---

## Features

-  **Firebase Authentication**
  - **Email & Password login**
  -**Repeat GoogleUser SignUp**
  - **Google Sign-In**
  - **Manual User addition on firebase**
  - **Supports admin created user credentials login[Test Credentials - testemailid@gmail.com | testpassword]**
-  **Add / Edit / Delete Subscriptions**
-  **Track Next Payment Dates**
-  **Category Filtering**
- **Search & Filter by Category or Frequency**
-  **Pie Chart Visualization** of expenses by category
-  **Responsive Design** with modern UI

---

## Tech usage

- **Frontend:** React, CSS (Inline styling, Flexbox)
- **Backend:** Firebase Authentication & Firestore
- **Charting:** `recharts` library

---

## 📦 Installation

1. **Clone the repository**

git clone https://github.com/RinniVatsa/subscription-tracker.git
cd subscription-tracker


2. **Install dependencies**

npm install


3. **Firebase Setup**
- Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
- Enable Authentication (Email/Password + Google)
- Enable Firestore
- Add your Firebase config to `src/services/firebase.js`

```js
// src/services/firebase.js
const firebaseConfig = {
   apiKey: "AIzaSyAEa4_WsSKp8mzxyPoOfcv9yzI0kCt99fA",
    authDomain: "subscription-tracker-2c2ec.firebaseapp.com",
        projectId: "subscription-tracker-2c2ec",
    storageBucket: "subscription-tracker-2c2ec.appspot.com",
    messagingSenderId: "829518921964",
    appId: "1:829518921964:web:c15adeee4f0d2fb6ae25c9",
    measurementId: "G-943NYB8MKX"
  
};
```

4. **Start  app**

npm start




##  Folder Structure


src/
├── components/
│   ├── Auth/
│   ├── Subscription/
│   └── Charts/
├── context/
├── pages/
├── services/
└── App.js / index.js






