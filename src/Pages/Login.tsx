import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import "./Login.css";

const Login: React.FC=() => {
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const navigate=useNavigate();

    useEffect(() => {
        if(localStorage.getItem('token')) {
            navigate('/');
        }
    }, []);

    const handleLogin=async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response=await axios.post('http://localhost:4000/api/auth/login', {
                email,
                password
            });

            if(response.data.token) {
                localStorage.setItem('token', response.data.token);
                alert('Login successful');
                navigate('/');
            } else {
                navigate("/*");
            }
        } catch(error) {
            console.error('Error during login:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className='loginContainer'>
            <form onSubmit={handleLogin}>
                <h2>Login</h2>
                <div>
                    <label>
                        Email:
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                </div>
                <div>
                    <label>
                        Password:
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                </div>
                <button type="submit">Login</button>
                <button className='goRegistration' onClick={(): void => navigate('/register')}>Move to registration page</button>
            </form>
        </div>
    );
};

export {Login};
