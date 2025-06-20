import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './ context/AuthContext';
import { SubscriptionProvider } from './ context/SubscriptionContext';

ReactDOM.createRoot(document.getElementById('root')).render( <
    BrowserRouter >
    <
    AuthProvider >
    <
    SubscriptionProvider >
    <
    App / >
    <
    /SubscriptionProvider> < /
    AuthProvider > <
    /BrowserRouter>
);