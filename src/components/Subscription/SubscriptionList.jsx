import React, { useState } from 'react';
import { useSubscriptions } from '../../ context/SubscriptionContext';

const SubscriptionList = () => {
    const { subscriptions, deleteSubscription, updateSubscription } = useSubscriptions();
    const [editMode, setEditMode] = useState(null);
    const [editForm, setEditForm] = useState({
        name: '',
        amount: '',
        frequency: 'monthly',
        nextPaymentDate: '',
        category: ''
    });

    const handleEditClick = (sub) => {
        setEditMode(sub.id);
        setEditForm({
            name: sub.name,
            amount: sub.amount,
            frequency: sub.frequency,
            nextPaymentDate: sub.nextPaymentDate,
            category: sub.category
        });
    };

    const handleEditChange = (e) => {
        setEditForm({...editForm, [e.target.name]: e.target.value });
    };

    const handleEditSubmit = async(e) => {
        e.preventDefault();
        await updateSubscription(editMode, {
            ...editForm,
            amount: parseFloat(editForm.amount)
        });
        setEditMode(null);
    };

    return ( <
        ul style = { listStyle } > {
            subscriptions.map((sub) => ( <
                li key = { sub.id }
                style = { cardStyle } > {
                    editMode === sub.id ? ( <
                        form onSubmit = { handleEditSubmit }
                        style = { formStyle } >
                        <
                        input name = "name"
                        value = { editForm.name }
                        onChange = { handleEditChange }
                        required style = { inputStyle }
                        /> <
                        input name = "amount"
                        type = "number"
                        value = { editForm.amount }
                        onChange = { handleEditChange }
                        required style = { inputStyle }
                        /> <
                        select name = "frequency"
                        value = { editForm.frequency }
                        onChange = { handleEditChange }
                        style = { inputStyle } >
                        <
                        option value = "monthly" > Monthly < /option> <
                        option value = "yearly" > Yearly < /option> < /
                        select > <
                        input name = "nextPaymentDate"
                        type = "date"
                        value = { editForm.nextPaymentDate }
                        onChange = { handleEditChange }
                        required style = { inputStyle }
                        /> <
                        input name = "category"
                        value = { editForm.category }
                        onChange = { handleEditChange }
                        style = { inputStyle }
                        /> <
                        div style = { buttonGroupStyle } >
                        <
                        button type = "submit"
                        style = { saveBtnStyle } > Save < /button> <
                        button type = "button"
                        onClick = {
                            () => setEditMode(null)
                        }
                        style = { cancelBtnStyle } > Cancel < /button> < /
                        div > <
                        /form>
                    ) : ( <
                        >
                        <
                        strong style = { nameStyle } > { sub.name } < /strong> <
                        p style = { textStyle } > 💰$ { sub.amount }({ sub.frequency }) < /p> <
                        p style = { textStyle } > 📅Next Payment: { sub.nextPaymentDate } < /p> <
                        p style = { categoryStyle } > 📂Category: { sub.category || 'N/A' } < /p> <
                        div style = { buttonGroupStyle } >
                        <
                        button onClick = {
                            () => handleEditClick(sub)
                        }
                        style = { editBtnStyle } > Edit < /button> <
                        button onClick = {
                            () => deleteSubscription(sub.id)
                        }
                        style = { deleteBtnStyle } > Delete < /button> < /
                        div > <
                        />
                    )
                } <
                /li>
            ))
        } <
        /ul>
    );
};

export default SubscriptionList;

const listStyle = {
    listStyleType: 'none',
    padding: 0,
    margin: '20px 0',
};

const cardStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    marginBottom: '15px',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
};

const formStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    flexDirection: 'column',
};

const inputStyle = {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '14px',
};

const nameStyle = {
    fontSize: '18px',
    color: '#2c3e50',
};

const textStyle = {
    margin: '5px 0',
    color: '#555',
};

const categoryStyle = {
    fontStyle: 'italic',
    color: '#888',
};

const buttonGroupStyle = {
    marginTop: '10px',
    display: 'flex',
    gap: '10px',
};

const editBtnStyle = {
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    padding: '8px 14px',
    borderRadius: '6px',
    cursor: 'pointer',
};

const deleteBtnStyle = {
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    padding: '8px 14px',
    borderRadius: '6px',
    cursor: 'pointer',
};

const saveBtnStyle = {
    backgroundColor: '#2ecc71',
    color: '#fff',
    border: 'none',
    padding: '8px 14px',
    borderRadius: '6px',
    cursor: 'pointer',
};

const cancelBtnStyle = {
    backgroundColor: '#95a5a6',
    color: '#fff',
    border: 'none',
    padding: '8px 14px',
    borderRadius: '6px',
    cursor: 'pointer',
};