import { createContext, useContext, useState } from 'react';

const SubscriptionContext = createContext();

export const SubscriptionProvider = ({ children }) => {
    const [subscriptions, setSubscriptions] = useState([]);

    const addSubscription = (newSub) => {
        setSubscriptions([...subscriptions, newSub]);
    };

    const deleteSubscription = (id) => {
        setSubscriptions(subscriptions.filter((sub) => sub.id !== id));
    };

    return ( <
        SubscriptionContext.Provider value = {
            { subscriptions, addSubscription, deleteSubscription } } > { children } <
        /SubscriptionContext.Provider>
    );
};

export const useSubscriptions = () => {
    const context = useContext(SubscriptionContext);
    if (!context) {
        throw new Error("useSubscriptions must be used within a SubscriptionProvider");
    }
    return context;
};