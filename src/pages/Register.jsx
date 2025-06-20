import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../ context/services/firebase';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = e => {
        setForm({...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, form.email, form.password);
            navigate('/login');
        } catch (err) {
            setError('Registration failed. Try again with a different email.');
        }
    };

    return ( <
        div >
        <
        h2 > Register < /h2> {
        error && < p style = {
            { color: 'red' }
        } > { error } < /p>} <
        form onSubmit = { handleSubmit } >
        <
        input type = "email"
        name = "email"
        placeholder = "Email"
        value = { form.email }
        onChange = { handleChange }
        required / >
        <
        input type = "password"
        name = "password"
        placeholder = "Password"
        value = { form.password }
        onChange = { handleChange }
        required / >
        <
        button type = "submit" > Register < /button> < /
        form > <
        /div>
    );
};

export default Register;