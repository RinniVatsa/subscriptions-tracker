import React, { useState } from 'react';
import { useAuth } from '../ context/AuthContext';
import { auth, provider } from '../ context/services/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleEmailLogin = async(e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            console.error("Login error:", err);
            setError('Login failed. Please check your credentials.');
        }
    };

    const handleGoogleLogin = async() => {
        try {
            await signInWithPopup(auth, provider);
            navigate('/dashboard');
        } catch (err) {
            console.error("Google Login Failed", err);
            setError('Google login failed. Please try again.');
        }
    };

    return ( < div style = { loginBackgroundStyle } > <
        div style = { containerStyle } >
        <
        h2 style = { titleStyle } > Login < /h2> {
        error && < p style = { errorStyle } > { error } < /p>} <
        form onSubmit = { handleEmailLogin }
        style = { formStyle } >
        <
        input type = "email"
        placeholder = "Email"
        value = { email }
        onChange = {
            (e) => setEmail(e.target.value)
        }
        required style = { inputStyle }
        /> <
        input type = "password"
        placeholder = "Password"
        value = { password }
        onChange = {
            (e) => setPassword(e.target.value)
        }
        required style = { inputStyle }
        /> <
        button type = "submit"
        style = { loginBtnStyle } > Login < /button> < /
        form >

        <
        div style = {
            { textAlign: 'center', marginTop: '20px' }
        } >
        <
        p style = {
            { marginBottom: '10px' }
        } > or < /p><button onClick={handleGoogleLogin} style={googleBtnStyle}> <
        img src = "https://developers.google.com/identity/images/g-logo.png"
        alt = "Google icon"
        style = { googleIconStyle }
        /> <
        span style = {
            { marginLeft: '10px' }
        } > Sign in with Google < /span> < /
        button > <
        /
        div > <
        /div> < /
        div >
    );
};

export default Login;


const containerStyle = {
    width: '400px',
    margin: '80px auto',
    padding: '30px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    fontFamily: "'Segoe UI', sans-serif"

};

const titleStyle = {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#2c3e50',
};

const formStyle = {
    display: 'flex',
    flexDirection: 'column',
};

const inputStyle = {
    padding: '12px',
    marginBottom: '15px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '16px',
};

const loginBtnStyle = {
    padding: '12px',
    backgroundColor: '#2ecc71',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer',
};
const googleBtnStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    color: '#444',
    border: '1px solid #ddd',
    padding: '12px 20px',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer',
    width: '100%',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    transition: 'background-color 0.3s ease',
};

const googleIconStyle = {
    height: '20px',
    width: '20px',
};



googleBtnStyle[':hover'] = {
    backgroundColor: '#f5f5f5',
};

const errorStyle = {
    color: 'red',
    marginBottom: '15px',
    textAlign: 'center',
};

const loginBackgroundStyle = {
    minHeight: '100vh',
    backgroundImage: `url("https://images.unsplash.com/photo-1556745757-8d76bdb6984b")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};