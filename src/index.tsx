import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from "firebase/app";

firebase.initializeApp({
  apiKey: "AIzaSyCtdJp2VstoLG_o3d-Mwz4gcB2CLZMCUoU",
  authDomain: "neows-f7f18.firebaseapp.com",
  databaseURL: "https://neows-f7f18.firebaseio.com",
  projectId: "neows-f7f18",
  storageBucket: "neows-f7f18.appspot.com",
  messagingSenderId: "690233365565",
  appId: "1:690233365565:web:3a5b3ccec4d1c24c9b0654"
});
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

