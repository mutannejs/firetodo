// React, React-dom e React-router-dom
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// Contexts
import { LoginProvider } from './context/LoginContext';
// Components
import App from './App';
import NotFound from './routes/NotFound';
import Home from './routes/Home';
import NewTodo from './routes/NewTodo';
import Login from './routes/Login';
import NewAccount from './routes/NewAccount';
import User from './routes/User';
// styles
import './index.css';


// Your web app's Firebase configuration
import { firebaseConfig } from './components/firebase/Config';
// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const db = getFirestore(firebase);


// Rotas
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Home db={db} />
      },
      {
        path: '/newtodo',
        element: <NewTodo db={db} />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/newaccount',
        element: <NewAccount />
      },
      {
        path: '/user',
        element: <User />
      }
    ]
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LoginProvider>
      <RouterProvider router={router} />
    </LoginProvider>
  </React.StrictMode>,
)
