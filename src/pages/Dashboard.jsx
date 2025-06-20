import React, { useState } from 'react';
import SubscriptionForm from '../components/Subscription/SubscriptionForm';
import { useSubscriptions } from '../ context/SubscriptionContext';
import ExpenseChart from '../components/ Charts/ExpenseChart';

const Dashboard = () => {
        const { subscriptions, deleteSubscription } = useSubscriptions();
        const [searchTerm, setSearchTerm] = useState('');
        const [categoryFilter, setCategoryFilter] = useState('');
        const [frequencyFilter, setFrequencyFilter] = useState('');

        const filteredSubscriptions = subscriptions.filter((sub) => {
            const matchSearch = sub.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchCategory = categoryFilter ? sub.category === categoryFilter : true;
            const matchFrequency = frequencyFilter ? sub.frequency === frequencyFilter : true;
            return matchSearch && matchCategory && matchFrequency;
        });

        const uniqueCategories = Array.from(
            new Set(subscriptions.map((sub) => sub.category).filter(Boolean))
        );

        return ( <
                div style = { containerStyle } >
                <
                h1 style = { titleStyle } > 📋Subscriptions Tracker < /h1>

                <
                SubscriptionForm / >

                { /*  Expense Chart */ } <
                div style = { chartContainerStyle } >
                <
                h3 style = { chartTitleStyle } > Expenses by Category < /h3> {
                subscriptions.length > 0 ? ( <
                    ExpenseChart subscriptions = { subscriptions }
                    />
                ) : ( <
                    p style = {
                        { textAlign: 'center', color: '#aaa' }
                    } > No data to display. < /p>
                )
            } <
            /div>

        <
        div style = { filterContainerStyle } >
            <
            input type = "text"
        placeholder = "Search by name..."
        value = { searchTerm }
        onChange = {
            (e) => setSearchTerm(e.target.value)
        }
        style = { inputStyle }
        /> <
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
    /select> <
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

{ /* Subscription List */ } <
ul style = { listStyle } > {
        filteredSubscriptions.length === 0 ? ( <
            li style = { noDataStyle } > No subscriptions match your filters. < /li>
        ) : (
            filteredSubscriptions.map((sub) => ( <
                li key = { sub.id }
                style = { cardStyle } >
                <
                div style = { cardContentStyle } >
                <
                h3 style = { subNameStyle } > { sub.name } < /h3> <
                p style = { subDetailsStyle } > 💰$ { sub.amount }— { sub.frequency.toUpperCase() } < /p> <
                p style = { subDetailsStyle } > 📅Next Payment: { sub.nextPaymentDate } < /p> <
                p style = { subCategoryStyle } > 📂Category: { sub.category || 'N/A' } < /p> < /
                div > <
                div style = { buttonGroupStyle } >
                <
                button style = { editBtnStyle } > Edit < /button> <
                button style = { deleteBtnStyle }
                onClick = {
                    () => deleteSubscription(sub.id)
                } > Delete < /button> < /
                div > <
                /li>
            ))
        )
    } <
    /ul> < /
div >
);
};

export default Dashboard;



const containerStyle = {
    padding: '20px',
    maxWidth: '950px',
    margin: '0 auto',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

const titleStyle = {
    textAlign: 'center',
    padding: '20px',
    fontSize: '28px',
    fontWeight: 'bold',
    background: 'linear-gradient(90deg, #00b894, #55efc4)',
    color: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    marginBottom: '30px',
    letterSpacing: '1px',

};

const chartContainerStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    marginBottom: '30px'
};

const chartTitleStyle = {
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: '15px',
};

const filterContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginBottom: '20px',
    justifyContent: 'center',
};

const inputStyle = {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    minWidth: '160px',
    fontSize: '14px',
};

const listStyle = {
    listStyleType: 'none',
    padding: 0,
    marginTop: '20px',
};

const noDataStyle = {
    textAlign: 'center',
    padding: '20px',
    color: '#888',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
};

const cardStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: '20px',
    marginBottom: '15px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
    flexWrap: 'wrap',
};

const cardContentStyle = {
    flex: '1',
    minWidth: '250px',
};

const subNameStyle = {
    margin: 0,
    fontSize: '20px',
    color: '#333',
};

const subDetailsStyle = {
    margin: '5px 0',
    color: '#555',
};

const subCategoryStyle = {
    fontStyle: 'italic',
    color: '#888',
};

const buttonGroupStyle = {
    display: 'flex',
    gap: '10px',
};

const editBtnStyle = {
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
};

const deleteBtnStyle = {
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
};