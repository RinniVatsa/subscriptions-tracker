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

    // Get unique category list
    const uniqueCategories = subscriptions
        .map((sub) => sub.category)
        .filter((cat, index, arr) => cat && arr.indexOf(cat) === index);

    // Filter logic
    const filteredSubscriptions = subscriptions.filter((sub) => {
        const name = (sub.name || '').toLowerCase();
        const category = (sub.category || '').toLowerCase().trim();
        const frequency = (sub.frequency || '').toLowerCase().trim();

        const searchMatch = name.includes(searchTerm.toLowerCase().trim());
        const categoryMatch = categoryFilter ?
            category === categoryFilter.toLowerCase().trim() :
            true;
        const frequencyMatch = frequencyFilter ?
            frequency === frequencyFilter.toLowerCase().trim() :
            true;

        return searchMatch && categoryMatch && frequencyMatch;
    });

    return ( <
            div style = { containerStyle } >
            <
            h1 style = { headerStyle } > 📊Subscriptions Tracker < /h1>

            <
            SubscriptionForm / >

            {
                subscriptions.length > 0 && ( <
                    div style = { chartContainer } >
                    <
                    ExpenseChart / >
                    <
                    /div>
                )
            }

            { /* Filters */ } <
            div style = { filterSection } >
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
            option value = "" > 📂All Categories < /option> {
            uniqueCategories.map((cat) => ( <
                option key = { cat }
                value = { cat } > { cat } <
                /option>
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
        option value = "" > ⏱️All Frequencies < /option> <
    option value = "monthly" > Monthly < /option> <
    option value = "yearly" > Yearly < /option> < /
    select > <
        /div>

    { /* Subscriptions List */ } {
        filteredSubscriptions.length > 0 ? ( <
            SubscriptionList subscriptions = { filteredSubscriptions }
            />
        ) : ( <
            p style = { noDataStyle } > No subscriptions match your filters. < /p>
        )
    } <
    /div>
);
};

export default Dashboard;

// Styles
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

const chartContainer = {
    marginBottom: '30px',
    backgroundColor: '#f5f5f5',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
};

const filterSection = {
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