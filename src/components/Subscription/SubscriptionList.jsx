import React, { useState } from 'react';
import { useSubscriptions } from '../../ context/SubscriptionContext';

const SubscriptionList = ({ subscriptions }) => {
    const { deleteSubscription, updateSubscription } = useSubscriptions();
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
        const { name, value } = e.target;
        setEditForm((prevForm) => ({...prevForm, [name]: value }));
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
                        style = { saveBtnStyle } > 💾Save < /button> <
                        button type = "button"
                        onClick = {
                            () => setEditMode(null)
                        }
                        style = { cancelBtnStyle } > ❌Cancel < /button> < /
                        div > <
                        /form>
                    ) : ( <
                        >
                        <
                        h3 style = { nameStyle } > { sub.name } < /h3> <
                        p style = { textStyle } > 💰$ { sub.amount }({ sub.frequency }) < /p> <
                        p style = { textStyle } > 📅{ sub.nextPaymentDate } < /p> <
                        p style = { categoryStyle } > 📂{ sub.category || 'N/A' } < /p> <
                        div style = { buttonGroupStyle } >
                        <
                        button onClick = {
                            () => handleEditClick(sub)
                        }
                        style = { editBtnStyle } > ✏️Edit < /button> <
                        button onClick = {
                            () => deleteSubscription(sub.id)
                        }
                        style = { deleteBtnStyle } > 🗑️Delete < /button> < /
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
    marginTop: '20px',
};

const cardStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    marginBottom: '20px',
    borderRadius: '12px',
    boxShadow: '0 6px 18px rgba(0, 0, 0, 0.08)',
    transition: 'transform 0.2s',
};

const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
};

const inputStyle = {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '15px',
};

const nameStyle = {
    fontSize: '20px',
    color: '#2c3e50',
    fontWeight: '600',
    marginBottom: '5px',
};

const textStyle = {
    margin: '3px 0',
    color: '#333',
};

const categoryStyle = {
    fontStyle: 'italic',
    color: '#777',
    marginBottom: '10px',
};

const buttonGroupStyle = {
    display: 'flex',
    gap: '10px',
    marginTop: '10px',
};

const editBtnStyle = {
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
};

const deleteBtnStyle = {
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
};

const saveBtnStyle = {
    backgroundColor: '#2ecc71',
    color: '#fff',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
};

const cancelBtnStyle = {
    backgroundColor: '#95a5a6',
    color: '#fff',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
};