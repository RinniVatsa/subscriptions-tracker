import React, { useState } from 'react';
import SubscriptionForm from '../components/Subscription/SubscriptionForm';
import SubscriptionList from '../components/Subscription/SubscriptionList';
import ExpenseChart from '../components/ Charts/ExpenseChart';
import { useSubscriptions } from '../ context/SubscriptionContext';

const Dashboard = () => {
    const { subscriptions } = useSubscriptions();
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [frequencyFilter, setFrequencyFilter] = useState('');

    const filteredSubscriptions = subscriptions.filter((sub) => {
        const matchesSearch = sub.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter ? sub.category === categoryFilter : true;
        const matchesFrequency = frequencyFilter ? sub.frequency === frequencyFilter : true;
        return matchesSearch && matchesCategory && matchesFrequency;
    });

    const uniqueCategories = [...new Set(subscriptions.map((s) => s.category).filter(Boolean))];

    return ( <
            div style = { containerStyle } >
            <
            h1 style = { headerStyle } > 📊Subscriptions Tracker < /h1>

            { /* Add Subscription Form */ } <
            SubscriptionForm / >

            { /* Expense Chart */ } {
                subscriptions.length > 0 && ( <
                    div style = { chartSectionStyle } >
                    <
                    ExpenseChart / >
                    <
                    /div>
                )
            }

            { /* Search and Filter */ } <
            div style = { filterContainer } >
            <
            input type = "text"
            placeholder = "Search by name..."
            value = { searchTerm }
            onChange = {
                (e) => setSearchTerm(e.target.value)
            }
            style = { inputStyle }
            />

            <
            select value = { categoryFilter }
            onChange = {
                (e) => setCategoryFilter(e.target.value)
            }
            style = { inputStyle } >
            <
            option value = "" > All Categories < /option> {
            uniqueCategories.map((cat) => ( <
                option key = { cat }
                value = { cat } > { cat } < /option>
            ))
        } <
        /select>

    <
    select value = { frequencyFilter }
    onChange = {
        (e) => setFrequencyFilter(e.target.value)
    }
    style = { inputStyle } >
        <
        option value = "" > All Frequencies < /option> <
    option value = "monthly" > Monthly < /option> <
    option value = "yearly" > Yearly < /option> < /
    select > <
        /div>

    { /* List of Subscriptions */ } {
        filteredSubscriptions.length > 0 ? ( <
            SubscriptionList / >
        ) : ( <
            p style = { noDataStyle } > No subscriptions match your filters. < /p>
        )
    } <
    /div>
);
};

export default Dashboard;





const containerStyle = {
    padding: '20px',
    maxWidth: '1000px',
    margin: '0 auto',
    fontFamily: 'Segoe UI, sans-serif',
};

const headerStyle = {
    background: 'linear-gradient(90deg, #00b894, #55efc4)',
    color: '#fff',
    textAlign: 'center',
    padding: '20px',
    fontSize: '28px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
    marginBottom: '30px',
};

const filterContainer = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginBottom: '20px',
};

const inputStyle = {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    minWidth: '180px',
    fontSize: '14px',
};

const noDataStyle = {
    padding: '20px',
    textAlign: 'center',
    backgroundColor: '#fce4ec',
    borderRadius: '8px',
    color: '#b71c1c',
};

const chartSectionStyle = {
    marginBottom: '30px',
    backgroundColor: '#f5f5f5',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
};