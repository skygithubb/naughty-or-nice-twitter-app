import React, { useState } from 'react';
import fetchTwitterData from './utils/fetchTwitterData'; // Import the helper function
import UserCard from './user-card';
import './landing-page.css';

const snowflakes = Array.from({ length: 50 });

const LandingPage = () => {
    const [username, setUsername] = useState('');
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const input = e.target.value;
        if (!input.includes('@')) {
            setUsername(input);
        }
    };

    const handleSubmit = async () => {
        if (!username) return;

        try {
            const data = await fetchTwitterData(username); // Use the helper function to fetch data
            if (data) {
                setUserData(data);
                setError('');
            } else {
                setError('Could not fetch user data. Please try again.');
            }
        } catch (error) {
            console.error(error);
            setError('An error occurred while fetching data. Please try again.');
        }
    };

    return (
        <div className="landing-page">
            {snowflakes.map((_, index) => (
                <div
                    key={index}
                    className="snowflake"
                    style={{
                        left: `${Math.random() * 100}vw`,
                        animationDuration: `${Math.random() * 3 + 2}s`,
                        fontSize: `${Math.random() * 10 + 10}px`,
                    }}
                >
                    ❄️
                </div>
            ))}

            <h1 className="heart-text">
                Made with ❤️ by <a href="https://twitter.com/skytwts_" target="_blank" rel="noopener noreferrer">@sky</a>
            </h1>

            <div className="username-input">
                <label htmlFor="twitterUsername">Enter your Twitter username</label>
                <input
                    id="twitterUsername"
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={handleChange}
                    maxLength={15}
                />
                <button onClick={handleSubmit} disabled={!username}>
                    Submit
                </button>
            </div>

            {error && <p className="error-message">{error}</p>}
            {userData && <UserCard userData={userData} />}
        </div>
    );
};

export default LandingPage;
