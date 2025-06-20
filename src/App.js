// App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/Auth/PrivateRoute';

const App = () => {
    return ( <
        Routes >
        <
        Route path = "/login"
        element = { < Login / > }
        /> { /* ✅ Add this route for /dashboard */ } <
        Route path = "/dashboard"
        element = { <
            PrivateRoute >
            <
            Dashboard / >
            <
            /PrivateRoute>
        }
        /> { /* Optionally redirect / to /dashboard */ } <
        Route path = "/"
        element = { <
            PrivateRoute >
            <
            Dashboard / >
            <
            /PrivateRoute>
        }
        /> <
        /Routes>
    );
};

export default App;