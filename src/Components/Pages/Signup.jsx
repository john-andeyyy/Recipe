import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
        const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;

        console.log(apiKey);
        const payload = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        try {
            const response = await fetch(url + apiKey, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (response.ok) {
                console.log("User signed up successfully!", data);

                navigate('/Login');

            } else {
                setError(data.error.message);
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    };
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:w-[32rem]">
                <h1 className="text-3xl  font-bold">Sign up!</h1>
                <div className="text-center lg:text-left">

                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form className="card-body" onSubmit={handleSubmit}>
                        <div className="form-control">
                            {error && <p className="text-red-500 text-center">{error}</p>}

                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email"
                                placeholder="email"
                                className="input input-bordered"
                                required
                                autoComplete='off'

                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password"
                                placeholder="password"
                                className="input input-bordered"
                                required
                                autoComplete='off'

                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                        </div>
                        <div className="form-control mt-6">
                            <button type='submit' className="btn btn-primary">Sign up</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
