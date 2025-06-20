import React, { useState } from 'react';
import { useSubscriptions } from '../../ context/SubscriptionContext';
import { v4 as uuidv4 } from 'uuid';
const SubscriptionForm = () => {
    const { addSubscription } = useSubscriptions();
    const [isHovered, setIsHovered] = useState(false);

    const [form, setForm] = useState({
        name: '',
        amount: '',
        frequency: 'monthly',
        nextPaymentDate: '',
        category: '',
    });

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newSub = {
            ...form,
            id: uuidv4(), // ✅ give each item a unique ID
            amount: parseFloat(form.amount),
        };
        addSubscription(newSub);
        setForm({ name: '', amount: '', frequency: 'monthly', nextPaymentDate: '', category: '' });
    };

    return ( <
        form onSubmit = { handleSubmit }
        style = { formStyle } >
        <
        div style = { fieldStyle } >
        <
        label style = { labelStyle } > Name < /label> <
        input type = "text"
        name = "name"
        value = { form.name }
        onChange = { handleChange }
        required style = { inputStyle }
        /> < /
        div >

        <
        div style = { fieldStyle } >
        <
        label style = { labelStyle } > Amount < /label> <
        input type = "number"
        name = "amount"
        value = { form.amount }
        onChange = { handleChange }
        required style = { inputStyle }
        /> < /
        div >

        <
        div style = { fieldStyle } >
        <
        label style = { labelStyle } > Category < /label> <
        input type = "text"
        name = "category"
        value = { form.category }
        onChange = { handleChange }
        style = { inputStyle }
        /> < /
        div >

        <
        div style = { fieldStyle } >
        <
        label style = { labelStyle } > Frequency < /label> <
        select name = "frequency"
        value = { form.frequency }
        onChange = { handleChange }
        style = { inputStyle } >
        <
        option value = "monthly" > Monthly < /option> <
        option value = "yearly" > Yearly < /option> < /
        select > <
        /div>

        <
        div style = { fieldStyle } >
        <
        label style = { labelStyle } > Next Payment Date < /label> <
        input type = "date"
        name = "nextPaymentDate"
        value = { form.nextPaymentDate }
        onChange = { handleChange }
        required style = { inputStyle }
        /> < /
        div >

        <
        button type = "submit"
        onMouseEnter = {
            () => setIsHovered(true)
        }
        onMouseLeave = {
            () => setIsHovered(false)
        }
        style = {
            {
                ...submitBtnStyle,
                backgroundColor: isHovered ? '#219150' : '#27ae60',
                    transform: isHovered ? 'scale(1.03)' : 'scale(1)',
            }
        } >
        Add Subscription <
        /button> < /
        form >
    );
};

export default SubscriptionForm;



const formStyle = {
    backgroundColor: '#f9f9f9',
    padding: '25px',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    marginBottom: '30px',
};

const fieldStyle = {
    display: 'flex',
    flexDirection: 'column',
};

const labelStyle = {
    marginBottom: '6px',
    fontWeight: '600',
    color: '#333',
    fontStyle: 'oblique',

};

const inputStyle = {
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '15px',
    backgroundColor: '#fff',

    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)',
};

const submitBtnStyle = {
    backgroundColor: '#ae6027',

    color: '#fff',
    border: 'none',
    padding: '14px',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'background-color 0.3s, transform 0.2s',
    outline: 'none',
};