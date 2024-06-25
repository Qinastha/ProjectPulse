import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Register: React.FC=() => {
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const navigate=useNavigate();

    useEffect(() => {
        if(localStorage.getItem('token')) {
            navigate('/');
        }
    }, []);

    const handleRegister=async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response=await axios.post('http://localhost:4000/api/auth/register', {
                email,
                password,
                role: 'user'
            });

            if(response.data.token) {
                localStorage.setItem('token', response.data.token);
                alert('Registration successful');
                navigate('/');
            } else {
                alert('Registration failed');
            }
        } catch(error) {
            console.error('Error during registration:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div>
            <h2>Register a new User</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label>
                        Email:
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <button type="submit">Register</button>
            </form>
            <button onClick={(): void => navigate('/login')}>Go to Login</button>
        </div>
    );
};

export {Register};
