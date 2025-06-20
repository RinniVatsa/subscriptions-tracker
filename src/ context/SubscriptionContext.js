import { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const SubscriptionContext = createContext();

export const SubscriptionProvider = ({ children }) => {
    const [subscriptions, setSubscriptions] = useState([]);

    const addSubscription = (newSub) => {
        const subWithId = {...newSub, id: uuidv4() }; // <-- Ensure unique ID
        setSubscriptions((prev) => [...prev, subWithId]);
    };

    const deleteSubscription = (id) => {
        setSubscriptions((prev) => prev.filter((sub) => sub.id !== id));
    };

    const updateSubscription = (id, updatedSub) => {
        setSubscriptions((prev) =>
            prev.map((sub) => (sub.id === id ? {...sub, ...updatedSub } : sub))
        );
    };

    return ( <
        SubscriptionContext.Provider value = {
            { subscriptions, addSubscription, deleteSubscription, updateSubscription }
        } > { children } <
        /SubscriptionContext.Provider>
    );
};

export const useSubscriptions = () => {
    const context = useContext(SubscriptionContext);
    if (!context) {
        throw new Error('useSubscriptions must be used within a SubscriptionProvider');
    }
    return context;
};